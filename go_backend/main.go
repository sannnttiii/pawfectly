package main

import (
	"context"
	"fmt"
	"log"
	"net/http"

	"github.com/jackc/pgx/v4"
)

var conn *pgx.Conn

func handler(w http.ResponseWriter, r *http.Request) {
	var greeting string
	err := conn.QueryRow(context.Background(), "SELECT 'Hello from PostgreSQL!'").Scan(&greeting)
	if err != nil {
		http.Error(w, "Unable to fetch greeting", http.StatusInternalServerError)
		return
	}
	fmt.Fprint(w, greeting)
}

func main() {
	var err error
	conn, err = pgx.Connect(context.Background(), "postgres://postgres:postgres@localhost:5432/pawfectly")
	if err != nil {
		log.Fatalf("Unable to connect to database: %v\n", err)
	}
	defer conn.Close(context.Background())

	http.HandleFunc("/", handler)
	fmt.Println("Server is running on port 8080...")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
