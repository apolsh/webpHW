var express = require('express');
var router = express.Router();
var path = require('path');
const bodyParser = require("body-parser");
const db = require("../mongoUtil")
const app = require('../app')
const objectId = require("mongodb").ObjectID;

const urlencodedParser = bodyParser.urlencoded({extended: false});
//const collection = db.getDb().collection("users");

/* GET users listing. */
router.get('/', function(req, res, next) {
  const collection = db.getDb().collection("users");
  collection.find({}).toArray()
      .then(result=>res.send(result))
      .catch(e=>console.log(e))

});

router.get('/:id', (req, res)=>{
  const id = new objectId(req.params.id);
  const collection = db.getDb().collection("users");
  collection.findOne({_id:id})
      .then(result=>res.send(result))
      .catch(e=>console.log(e))
})

router.get('/delete/:id', (req, res) => {
  const id = new objectId(req.params.id);
  const collection = db.getDb().collection("users")
  collection.findOneAndDelete({_id:id})
      .then(result=>res.send(result.value))
      .catch(e=>console.log(e));
})

router.post('/', urlencodedParser, (req, res)=>{
  const collection = db.getDb().collection("users")

  const name = req.body.name;
  const username = req.body.username;
  const email = req.body.email;
  const user = {name, username, email}

  collection.insertOne(user)
      .then(result=>res.sendFile( path.join(__dirname, '../public', 'admin.html')))
      .catch(e=>console.log(e))
})

module.exports = router;
