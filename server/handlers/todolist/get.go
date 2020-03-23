package handlers

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/mingchengzack/Triton-Life/server/models"
)

// GetAll handles GET requests and returns all current todos for given user
func (th *TodoList) GetAll(w http.ResponseWriter, r *http.Request) {
	th.l.Println("[DEBUG] get all todos for a user")

	// Parse the user email from the url
	vars := mux.Vars(r)
	if _, ok := vars["email"]; !ok {
		th.l.Println("[ERROR] get tasks bad request")
		http.Error(
			w,
			fmt.Sprintf("Error with get tasks request"),
			http.StatusBadRequest,
		)
		return
	}
	todos, err := models.GetTodos(vars["email"], th.coll)

	if err != nil {
		th.l.Println("[ERROR] searching todolist with given user", err)
		http.Error(
			w,
			fmt.Sprintf("Error finding todolist: %s", err),
			http.StatusNotFound,
		)
		return
	}

	err = models.ToJSON(todos, w)
	if err != nil {
		th.l.Println("[ERROR] serializing todos", err)
	}
}
