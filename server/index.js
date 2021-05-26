const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const ObjectID = require('mongodb').ObjectID;
const MongoClient = require('mongodb').MongoClient;
const port = 3001

const app = express()
app.use(bodyParser.json())
app.use(cors())
const uri = `mongodb+srv://admin:admin12345@cluster0.xzc94.mongodb.net/backEnd?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useUnifiedTopology: true}, { useNewUrlParser: true }, { connectTimeoutMS: 30000 }, { keepAlive: 1});

client.connect(err => {
  const usersCollection =client.db("backEnd").collection("users");
  app.post('/api/v1/users', (req, res)=>{
    const name = req.body.name;
    const timeStamp = req.body.timeStamp
    const temp = []
    const newUser ={
      name: name,
      timeStamp: timeStamp,
      temp: temp,
    }
    usersCollection.insertOne(newUser)
    .then(result => {
      if(result.insertedCount > 0){
        res.send(true)
      }
    })
  })
  app.post('/api/v1/temp', (req, res)=>{
    const id = req.body.id;
    const timeStamp = req.body.timeStamp
    const temp = req.body.tempValue
    const newUser ={
      id: id,
      timeStamp: timeStamp,
      temp: temp,
    }
    usersCollection.updateOne(
      {_id : ObjectID(id)},
      {$push: {temp: temp}})
    .then(result => {
      if(result.modifiedCount > 0){
        res.send(true);
      }
    })
  })
  app.get('/api/v1/user', (req, res) => {
    usersCollection.find({})
    .toArray((error, documents) => {
      res.send(documents)
    })
  })
  app.get('/api/v1/users/temp', (req, res) => {
    usersCollection.find({})
    .toArray((error, documents) => {
      res.send(documents)
    })
  })
  
});
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.listen(port)