package models

import "go.mongodb.org/mongo-driver/bson/primitive"

// User Struct
type User struct {
	Name     string
	SID      string
	year     string
	Email    string
	Password string
}

// Class Struct
type Class struct {
	Name      string
	StartTime string
	EndTime   string
	UserID    primitive.ObjectID `json:"userid,omitempty" bson:"userid,omitempty"`
}

// ToDoList Struct
type ToDoList struct {
	Task   string             `json:"task,omitempty"`
	Status bool               `json:"status,omitempty"`
	UserID primitive.ObjectID `json:"userid,omitempty" bson:"userid,omitempty"`
}
