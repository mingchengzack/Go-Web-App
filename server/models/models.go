package models

// ToDoList Struct
type ToDoList struct {
	Task   string `json:"task,omitempty"`
	Status bool   `json:"status,omitempty"`
}
