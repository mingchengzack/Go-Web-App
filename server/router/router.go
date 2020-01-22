package router

import (
	"github.com/gorilla/mux"
	"github.com/mingchengzack/Go-Web-App/server/middleware"
)

// Router is exported and used in main.go
func Router() *mux.Router {

	router := mux.NewRouter()

	router.HandleFunc("/api/getAllTasks", middleware.GetAllTasks).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/insertTask", middleware.InsertTask).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/updateTask/{id}", middleware.UpdateTask).Methods("PUT", "OPTIONS")
	router.HandleFunc("/api/deleteTask/{id}", middleware.DeleteTask).Methods("DELETE", "OPTIONS")
	router.HandleFunc("/api/deleteAllTask", middleware.DeleteAllTask).Methods("DELETE", "OPTIONS")
	return router
}
