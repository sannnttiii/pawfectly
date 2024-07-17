package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"reflect"
	"strconv"

	"github.com/jackc/pgx/v4"
	"github.com/rs/cors"
)

var conn *pgx.Conn

func handler(w http.ResponseWriter, r *http.Request) {
	rows, err := conn.Query(context.Background(), "SELECT email,password,pet_type FROM users")
	if err != nil {
		http.Error(w, "Unable to fetch users", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var users []map[string]string

	for rows.Next() {
		var email, password, pet_type string
		if err := rows.Scan(&email, &password, &pet_type); err != nil {
			http.Error(w, "Error scanning row", http.StatusInternalServerError)
			return
		}
		user := map[string]string{"email": email, "password": password, "pet_type": pet_type}
		users = append(users, user)
	}

	if rows.Err() != nil {
		http.Error(w, "Error iterating rows", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(users); err != nil {
		http.Error(w, "Error encoding JSON", http.StatusInternalServerError)
	}
}

type User struct {
	ID        int    `json:"id"`
	Email     string `json:"email"`
	Password  string `json:"password"`
	PetType   string `json:"petType"`
	PetImage  string `json:"image"`
	PetBreeds string `json:"petBreeds"`
	Gender    string `json:"gender"`
	Name      string `json:"name"`
	Age       int    `json:"age"`
	City      string `json:"city"`
	Bio       string `json:"bio"`
}

func signupHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var user User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	var userID int
	err = conn.QueryRow(context.Background(), "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id", user.Email, user.Password).Scan(&userID)
	if err != nil {
		log.Printf("Error executing query: %v\n", err)
		http.Error(w, "Failed to create user", http.StatusInternalServerError)
		return
	}

	response := map[string]interface{}{"message": "User created successfully", "user_id": userID}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func setPetTypeHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var user User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	_, err = conn.Exec(context.Background(), "UPDATE users SET pet_type = $1 WHERE id=$2", user.PetType, user.ID)
	if err != nil {
		fmt.Println(err.Error())
		return
	}
	fmt.Println("update success!, ", user.PetType, user.ID)

	if err != nil {
		log.Printf("Error executing query: %v\n", err)
		http.Error(w, "Failed to create user", http.StatusInternalServerError)
		return
	}

	response := map[string]interface{}{"message": "Set PetType successfully", "user_id": user.ID}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func setProfile(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	err := r.ParseMultipartForm(10 << 20) // Limit your max input length to 10 MB
	if err != nil {
		fmt.Println("Error parsing form data:", err)
		http.Error(w, "Invalid form data", http.StatusBadRequest)
		return
	}

	var user User
	user.PetBreeds = r.FormValue("pet_breeds")
	user.Gender = r.FormValue("gender")
	user.Name = r.FormValue("name")
	user.City = r.FormValue("city")
	user.Bio = r.FormValue("bio")

	file, handler, err := r.FormFile("image")
	if err == nil {
		defer file.Close()
		imagePath := filepath.Join("images", "profpic")
		if _, err := os.Stat(imagePath); os.IsNotExist(err) {
			os.MkdirAll(imagePath, os.ModePerm)
		}
		fileName := fmt.Sprintf("%d-%s", user.ID, filepath.Base(handler.Filename))
		filePath := filepath.Join(imagePath, fileName)
		f, err := os.Create(filePath)
		if err != nil {
			fmt.Println("Error creating file:", err)
			http.Error(w, "Failed to save image", http.StatusInternalServerError)
			return
		}
		defer f.Close()
		io.Copy(f, file)
		user.PetImage = fileName
	}

	age, err := strconv.Atoi(r.FormValue("age"))
	if err != nil {
		fmt.Println("Error converting age:", err)
		http.Error(w, "Invalid age value", http.StatusBadRequest)
		return
	}
	user.Age = age
	fmt.Println(reflect.TypeOf(age))

	id, err := strconv.Atoi(r.FormValue("id"))
	if err != nil {
		fmt.Println("Error converting id:", err)
		http.Error(w, "Invalid id value", http.StatusBadRequest)
		return
	}
	user.ID = id

	fmt.Println("USER ", user.PetImage, user.PetBreeds, user.Gender, user.Name, user.Age, user.City, user.Bio, user.ID)

	_, err = conn.Exec(context.Background(), "UPDATE users SET pet_breeds=$1, gender=$2, name=$3, age=$4, city=$5, bio=$6, image_pet=$7 WHERE id=$8",
		user.PetBreeds, user.Gender, user.Name, user.Age, user.City, user.Bio, user.PetImage, user.ID)
	if err != nil {
		fmt.Println("Database update error:", err)
		http.Error(w, "Failed to update profile", http.StatusInternalServerError)
		return
	}

	fmt.Println("Update success! User:", user.PetType, user.ID)

	response := map[string]interface{}{"message": "Profile updated successfully", "user_id": user.ID}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func main() {
	var err error
	conn, err = pgx.Connect(context.Background(), "postgres://postgres:postgres@localhost:5432/pawfectly")
	if err != nil {
		log.Fatalf("Unable to connect to database: %v\n", err)
	}
	defer conn.Close(context.Background())
	http.HandleFunc("/api/signup", signupHandler)
	http.HandleFunc("/api/setPetType", setPetTypeHandler)
	http.HandleFunc("/api/setProfile", setProfile)
	http.HandleFunc("/", handler)
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowedMethods:   []string{"GET", "POST", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type"},
		AllowCredentials: true,
	})

	// Wrap your handlers with the CORS middleware
	handler := c.Handler(http.DefaultServeMux)

	fmt.Println("Server is running on port 8080...")
	if err := http.ListenAndServe(":8080", handler); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
