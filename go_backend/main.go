package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/jackc/pgx/v4"
	"github.com/rs/cors"
)

var conn *pgx.Conn

func handler(w http.ResponseWriter, r *http.Request) {
	rows, err := conn.Query(context.Background(), "SELECT email, password FROM users")
	if err != nil {
		http.Error(w, "Unable to fetch users", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var users []map[string]string

	for rows.Next() {
		var email, password string
		if err := rows.Scan(&email, &password); err != nil {
			http.Error(w, "Error scanning row", http.StatusInternalServerError)
			return
		}
		user := map[string]string{"email": email, "password": password}
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
	// ID       int    `json:"id"`
	Email    string `json:"email"`
	Password string `json:"password"`
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

func main() {
	var err error
	conn, err = pgx.Connect(context.Background(), "postgres://postgres:postgres@localhost:5432/pawfectly")
	if err != nil {
		log.Fatalf("Unable to connect to database: %v\n", err)
	}
	defer conn.Close(context.Background())
	http.HandleFunc("/api/signup", signupHandler)
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
