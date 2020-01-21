package middleware

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/mingchengzack/Go-Web-App/server/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// DB connection string
// for localhost mongoDB
// const connectionString = "mongodb://localhost:27017"
const connectionString = "mongodb+srv://admin:11051996Cm!123@cluster0-dgtxy.gcp.mongodb.net/test?retryWrites=true&w=majority"

// Database Name
const dbName = "test"

// Collection name
const collName = "todolist"

// Collection object
var collection *mongo.Collection

// Create connection with mongo db
func init() {
	// Set client options
	clientOptions := options.Client().ApplyURI(connectionString)

	// Connect to MongoDB
	client, err := mongo.Connect(context.TODO(), clientOptions)

	if err != nil {
		log.Fatal(err)
	}

	// Check the connection
	err = client.Ping(context.TODO(), nil)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Connected to MongoDB!")

	collection = client.Database(dbName).Collection(collName)

	fmt.Println("Collection instance created!")
}

// Handle CORS
func setCORS(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
}

// GetAllTasks get all the task route
func GetAllTasks(w http.ResponseWriter, r *http.Request) {
	setCORS(w, r)
	payload := getAllTasks()
	json.NewEncoder(w).Encode(payload)
}

// CreateTask create task route
func CreateTask(w http.ResponseWriter, r *http.Request) {
	setCORS(w, r)
	var task models.ToDoList
	_ = json.NewDecoder(r.Body).Decode(&task)
	insertOneTask(task)
	json.NewEncoder(w).Encode(task)
}

// UpdateTask update task route
func UpdateTask(w http.ResponseWriter, r *http.Request) {
	setCORS(w, r)
	params := mux.Vars(r)
	var task models.ToDoList
	_ = json.NewDecoder(r.Body).Decode(&task)
	updateTask(params["id"], task.Status)
	json.NewEncoder(w).Encode(params["id"])
}

// DeleteTask delete one task route
func DeleteTask(w http.ResponseWriter, r *http.Request) {
	setCORS(w, r)
	params := mux.Vars(r)
	deleteOneTask(params["id"])
	json.NewEncoder(w).Encode(params["id"])
}

// DeleteAllTask delete all tasks route
func DeleteAllTask(w http.ResponseWriter, r *http.Request) {
	setCORS(w, r)
	count := deleteAllTask()
	json.NewEncoder(w).Encode(count)
}

// Get all task from the DB and return it
func getAllTasks() []primitive.M {
	cur, err := collection.Find(context.Background(), bson.D{{}})

	if err != nil {
		log.Fatal(err)
	}

	var results []primitive.M
	for cur.Next(context.Background()) {
		var result bson.M
		err := cur.Decode(&result)
		if err != nil {
			log.Fatal(err)
		}
		// fmt.Println("cur..>", cur, "result", reflect.TypeOf(result), reflect.TypeOf(result["_id"]))
		results = append(results, result)

	}

	if err := cur.Err(); err != nil {
		log.Fatal(err)
	}

	cur.Close(context.Background())
	return results
}

// Insert one task in the DB
func insertOneTask(task models.ToDoList) {
	_, err := collection.InsertOne(context.Background(), task)

	if err != nil {
		log.Fatal(err)
	}
}

// Update task's status
func updateTask(task string, status bool) {
	id, _ := primitive.ObjectIDFromHex(task)
	filter := bson.M{"_id": id}
	update := bson.M{"$set": bson.M{"status": status}}
	_, err := collection.UpdateOne(context.Background(), filter, update)

	if err != nil {
		log.Fatal(err)
	}
}

// Delete one task from the DB, delete by ID
func deleteOneTask(task string) {
	fmt.Println(task)
	id, _ := primitive.ObjectIDFromHex(task)
	filter := bson.M{"_id": id}
	_, err := collection.DeleteOne(context.Background(), filter)

	if err != nil {
		log.Fatal(err)
	}
}

// Delete all the tasks from the DB
func deleteAllTask() int64 {
	d, err := collection.DeleteMany(context.Background(), bson.D{{}}, nil)

	if err != nil {
		log.Fatal(err)
	}

	return d.DeletedCount
}
