package db

import (
	"context"
	"log"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// MongoDB defines the wrapper for mongodb
type MongoDB struct {
	l           *log.Logger
	name        string
	Collections map[string]*mongo.Collection
	client      *mongo.Client
}

// NewMongoDB returns a new mongodb with given name, logger
func NewMongoDB(l *log.Logger, name string) *MongoDB {
	db := &MongoDB{l, name, nil, nil}
	db.Collections = make(map[string]*mongo.Collection)
	return db
}

// Connect connects the mongodb to the given URL
func (db *MongoDB) Connect(uri string) {
	// Set client options
	// and connect to MongoDB
	co := options.Client().ApplyURI(uri)
	client, err := mongo.Connect(context.TODO(), co)
	if err != nil {
		db.l.Println("[ERROR] cannot connect to MongoDB", err)
		return
	}

	// Check the connection
	err = client.Ping(context.TODO(), nil)
	if err != nil {
		db.l.Println("[ERROR] connection is not stable", err)
		return
	}

	// MongoDB is connected
	db.client = client
	db.l.Println("Connected to MongoDB!")
}

// CreateCollection creates a new collection with the given name
func (db *MongoDB) CreateCollection(c string) *mongo.Collection {
	// Check if MongoDB is connected
	if db.client == nil {
		db.l.Println("[ERROR] MongoDB is not connected yet")
		return nil
	}

	db.Collections[c] = db.client.Database(db.name).Collection(c)
	return db.Collections[c]
}
