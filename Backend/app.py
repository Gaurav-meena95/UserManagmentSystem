from flask import Flask,render_template,request,jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId
from flask_cors import CORS

app = Flask(__name__)

client = MongoClient('mongodb://localhost:27017/')
db = client['userManagmentSystem']
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/users',methods=['GET','POST'])
def data():
    if request.method =="POST":
        body = request.json
        firstName = body['firstName']
        lastName = body['lastName']
        email = body['email']
        print('dkjbsbk',email,firstName)

        exsting = db['users'].find_one({'email':email})

        if (exsting):
            return jsonify({'message':'user already exist with this email'})

        
        db['users'].insert_one({
            "firstName" :firstName,
            "lastName" :lastName,
            "email" :email
        })

        return jsonify({
            "status":'Data is succesfully insert in to mongoDB',
            "firstName" :firstName,
            "lastName" :lastName,
            "email" :email
        })
    
    if request.method == "GET":
        AllUsers = db['users'].find()
        dataJson = []
        for data in AllUsers:
            id = data['_id']
            firstName = data['firstName']
            lastName = data['lastName']
            email = data['email']

            dataDict = {
                "id" :str(id),
                "firstName" :firstName,
                "lastName" :lastName,
                "email" :email
            }
            dataJson.append(dataDict)
        return jsonify(dataJson)

@app.route('/users/<string:id>',methods = ['GET','PUT','DELETE'])
def oneUserData(id):
    if request.method == 'GET':
        data = db['users'].find_one({'_id' : ObjectId(id)})
        if (not data):
            return jsonify({'Message':'Invalid id or user does not Exist'})
        id = data['_id']
        firstName = data['firstName']
        lastName = data['lastName']
        email = data['email']

        dataDict = {
            "id" :str(id),
            "firstName" :firstName,
            "lastName" :lastName,
            "email" :email
            }
        return jsonify(dataDict)
    
    if request.method == 'DELETE':
        exsting = db['users'].find_one({'_id' : ObjectId(id)})
        if (not exsting):
            return jsonify({'message':'User does not exits'})
        db['users'].delete_one({'_id':ObjectId(id)})

        return jsonify({"Messge":f'The user with the {id} is deleted'})
    
    if request.method =="PUT":
        body = request.json
        firstName = body['firstName']
        lastName = body['lastName']
        email = body['email']
        
        db['users'].update_one(
        {"_id": ObjectId(id)},   
        {
            "$set": {
                "firstName": firstName,
                "lastName": lastName,
                "email": email
            }
        }
        )

    return jsonify({
        "status": "Data successfully updated in MongoDB",
        "firstName": firstName,
        "lastName": lastName,
        "email": email
    })


    
    



if __name__ == '__main__':
    app.debug = True
    app.run()