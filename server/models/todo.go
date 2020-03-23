package models

import (
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

// Todo defines	the structure an API todolist
type Todo struct {
	UserEmail string `json:"useremail" bson:"useremail"`
	Task      string `json:"task"`
	Status    bool   `json:"status"`
}

// Todos defines a list of Todo
type Todos []*Todo

// GetTodos gets the todolist for the given user
func GetTodos(ue string, coll *mongo.Collection) (Todos, error) {
	// Try to find the todolist for a user in database
	cur, err := coll.Find(context.Background(), bson.M{"useremail": ue})
	if err != nil {
		return nil, err
	}

	// Iterate cursor and add todo
	var todos Todos
	for cur.Next(context.Background()) {
		var t Todo
		err := cur.Decode(&t)
		if err != nil {
			return nil, err
		}
		todos = append(todos, &t)
	}

	// Check cur stream error
	if err := cur.Err(); err != nil {
		return nil, err
	}

	// Check closing cur stream error
	err = cur.Close(context.Background())
	if err != nil {
		return nil, err
	}

	return todos, nil
}
