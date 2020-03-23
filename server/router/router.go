package router

import (
	"log"

	"github.com/mingchengzack/Triton-Life/server/db"
	handlers "github.com/mingchengzack/Triton-Life/server/handlers/todolist"

	"github.com/gorilla/mux"
)

// NewRouter is exported and used in main.go
func NewRouter(l *log.Logger, mdb *db.MongoDB) *mux.Router {
	// Create the main router to handle http request
	router := mux.NewRouter()

	// Create the handlers
	th := handlers.NewTodoList(l, mdb.Collections["todolist"])

	/* Methods to handle User data
	 */

	/* Methods to handle Class data
	 */

	/* Methods to handle Todo data
	 */
	todoRouter := router.PathPrefix("/todo").Subrouter()
	todoRouter.HandleFunc("/{email}", th.GetAll)

	return router
}
