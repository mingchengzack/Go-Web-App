package models

// User defines	the structure for an API user
type User struct {
	Name     string `json:"name,omitempty"`
	SID      string `json:"sid,omitempty"`
	Year     string `json:"year,omitempty"`
	Email    string
	Password string
}
