var express = require('express');
var router = express.Router();
var path = require('path');
const bodyParser = require("body-parser");
const db = require("../mongoUtil");
const app = require('../app');
const objectId = require("mongodb").ObjectID;

const urlencodedParser = bodyParser.urlencoded({extended: false});
//const collection = db.getDb().collection("users");

/* GET posts listing. */
router.get('/', function(req, res, next) {
  const collection = db.getDb().collection("posts");
  collection.find({}).toArray()
      .then(result=>res.send(result))
      .catch(e=>console.log(e))

});

/*POST post*/
router.post('/', urlencodedParser, (req, res)=>{
  const collection = db.getDb().collection("posts")

  const userId = req.body.userId;
  const title = req.body.postTitle;
  const body = req.body.postText;
  const post = {userId, title, body}
  console.log(post)

  collection.insertOne(post)
      .then(result=>res.sendFile( path.join(__dirname, '../public', 'admin.html')))
      .catch(e=>console.log(e))
})

router.delete('/:id', (req, res) => {
  const id = new objectId(req.params.id);
  const collection = db.getDb().collection("posts")
  collection.findOneAndDelete({_id:id})
      .then(result=>res.send(result.value))
      .catch(e=>console.log(e));


})

router.get('/drop', (req, res)=>{
  const collection = db.getDb().collection("posts")
  collection.drop()
      .then(result=>console.log('dropped'))
      .catch(e=>console.log(e))
})

module.exports = router;
