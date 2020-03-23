package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"time"

	"github.com/mingchengzack/Triton-Life/server/db"
	"github.com/mingchengzack/Triton-Life/server/router"
)

func main() {
	l := log.New(os.Stdout, "TritonLife ", log.LstdFlags)

	// Connect to database
	mdb := db.NewMongoDB(l, "TritonLife")

	// Connect database
	const cs = "mongodb+srv://admin:11051996Cm!123@cluster0-dgtxy.gcp.mongodb.net/test?retryWrites=true&w=majority"
	mdb.Connect(cs)

	// Create collections
	mdb.CreateCollection("users")
	mdb.CreateCollection("classes")
	mdb.CreateCollection("todolist")

	// Create a new server
	sm := router.NewRouter(l, mdb)
	s := http.Server{
		Addr:         ":8080",           // configure the bind address
		Handler:      sm,                // set the default handler
		ErrorLog:     l,                 // set the logger for the server
		ReadTimeout:  5 * time.Second,   // max time to read request from the client
		WriteTimeout: 10 * time.Second,  // max time to write response to the client
		IdleTimeout:  120 * time.Second, // max time for connections using TCP Keep-Alive
	}

	// Start the server
	go func() {
		l.Println("Starting server on port 8080")

		err := s.ListenAndServe()
		if err != nil {
			l.Printf("Error starting server: %s\n", err)
			os.Exit(1)
		}
	}()

	// Trap sigterm or interupt and gracefully shutdown the server
	ch := make(chan os.Signal, 1)
	signal.Notify(ch, os.Interrupt)
	signal.Notify(ch, os.Kill)

	// Block until a signal is received.
	sig := <-ch
	log.Println("Got signal:", sig)

	// Gracefully shutdown the server, waiting max 30 seconds for current operations to complete
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	cancel()
	s.Shutdown(ctx)
}
