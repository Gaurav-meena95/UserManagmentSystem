from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId
from bson.errors import InvalidId
from flask_cors import CORS

app = Flask(__name__)

client = MongoClient("mongodb://localhost:27017/")
db = client["userManagmentSystem"]

CORS(app)


@app.route("/")
def index():
    return render_template("index.html")



@app.route("/users", methods=["GET", "POST"])
def data():


    if request.method == "POST":
        body = request.json

        firstName = body.get("firstName")
        lastName = body.get("lastName")
        email = body.get("email")

        existing = db["users"].find_one({"email": email})

        if existing:
            return jsonify({
                "message": "User already exists with this email"
            }), 400

        db["users"].insert_one({
            "firstName": firstName,
            "lastName": lastName,
            "email": email
        })

        return jsonify({
            "message": "User created successfully",
            "firstName": firstName,
            "lastName": lastName,
            "email": email
        }), 201

    if request.method == "GET":
        allUsers = db["users"].find()
        dataJson = []

        for data in allUsers:
            dataJson.append({
                "id": str(data["_id"]),
                "firstName": data["firstName"],
                "lastName": data["lastName"],
                "email": data["email"]
            })

        return jsonify(dataJson), 200



@app.route("/users/<string:id>", methods=["GET", "PUT", "DELETE"])
def oneUserData(id):

    try:
        obj_id = ObjectId(id)
    except InvalidId:
        return jsonify({"message": "Invalid user id"}), 400



    if request.method == "GET":
        data = db["users"].find_one({"_id": obj_id})

        if not data:
            return jsonify({
                "message": "User does not exist"
            }), 404

        return jsonify({
            "id": str(data["_id"]),
            "firstName": data["firstName"],
            "lastName": data["lastName"],
            "email": data["email"]
        }), 200

    if request.method == "DELETE":
        existing = db["users"].find_one({"_id": obj_id})

        if not existing:
            return jsonify({
                "message": "User does not exist"
            }), 404

        db["users"].delete_one({"_id": obj_id})

        return jsonify({
            "message": f"User {id} deleted successfully"
        }), 200

    if request.method == "PUT":
        body = request.json

        firstName = body.get("firstName")
        lastName = body.get("lastName")
        email = body.get("email")

        result = db["users"].update_one(
            {"_id": obj_id},
            {
                "$set": {
                    "firstName": firstName,
                    "lastName": lastName,
                    "email": email
                }
            }
        )

        if result.matched_count == 0:
            return jsonify({
                "message": "User not found"
            }), 404

        return jsonify({
            "message": "User updated successfully",
            "firstName": firstName,
            "lastName": lastName,
            "email": email
        }), 200


if __name__ == "__main__":
    app.debug = True
    app.run()