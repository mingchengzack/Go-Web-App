package models

// Class defines the structure for an API class
type Class struct {
	Name       string
	Location   string
	Instructor string
	StartTime  string
	EndTime    string
	UserEmail  string `json:"useremail,omitempty" bson:"useremail,omitempty"`
}
