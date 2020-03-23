package handlers

import (
	"log"

	"go.mongodb.org/mongo-driver/mongo"
)

// TodoList handler for getting and updating todos
type TodoList struct {
	l    *log.Logger
	coll *mongo.Collection
}

// NewTodoList returns a new Todolist handler with the given logger
func NewTodoList(l *log.Logger, coll *mongo.Collection) *TodoList {
	return &TodoList{l, coll}
}
