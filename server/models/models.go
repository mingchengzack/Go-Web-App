package models

// User Struct
type User struct {
	Name     string `json:"name,omitempty"`
	SID      string `json:"sid,omitempty"`
	Year     string `json:"year,omitempty"`
	Email    string
	Password string
}

// Class Struct
type Class struct {
	Name      string
	StartTime string
	EndTime   string
	UserEmail string `json:"useremail,omitempty" bson:"useremail,omitempty"`
}

// ToDoList Struct
type ToDoList struct {
	Task      string `json:"task,omitempty"`
	Status    bool   `json:"status,omitempty"`
	UserEmail string `json:"useremail,omitempty" bson:"useremail,omitempty"`
}
