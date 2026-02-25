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
    print('fjdsgjdf')
    if request.method =="POST":
        body = request.json
        firstName = body['firstName']
        lastName = body['lastName']
        emailId = body['emailId']

        exsting = db['users'].find_one({'emailId':emailId})

        if (exsting):
            return jsonify({'message':'user already exist with this email'})

        
        db['users'].insert_one({
            "firstName" :firstName,
            "lastName" :lastName,
            "emailId" :emailId
        })

        return jsonify({
            "status":'Data is succesfully insert in to mongoDB',
            "firstName" :firstName,
            "lastName" :lastName,
            "emailId" :emailId
        })
    
    if request.method == "GET":
        AllUsers = db['users'].find()
        dataJson = []
        for data in AllUsers:
            id = data['_id']
            firstName = data['firstName']
            lastName = data['lastName']
            emailId = data['emailId']

            dataDict = {
                "id" :str(id),
                "firstName" :firstName,
                "lastName" :lastName,
                "emailId" :emailId
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
        emailId = data['emailId']

        dataDict = {
            "id" :str(id),
            "firstName" :firstName,
            "lastName" :lastName,
            "emailId" :emailId
            }
        return jsonify(dataDict)
    
    if request.method == 'DELETE':
        db['users'].delete_one({'_id':ObjectId(id)})

        return jsonify({"Messge":f'The user with the {id} is deleted'})


    
    



if __name__ == '__main__':
    app.debug = True
    app.run()