package models

import (
	"encoding/json"
	"io"
)

// ToJSON serializes the given interface to JSON string
// and writes to a io.Writer
func ToJSON(i interface{}, w io.Writer) error {
	en := json.NewEncoder(w)
	return en.Encode(i)
}

// FromJSON reads a JSON string from an io.Reader
// and deserialize to the given interface
func FromJSON(i interface{}, r io.Reader) error {
	de := json.NewDecoder(r)
	return de.Decode(i)
}
