const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

let _db;

module.exports = {

    connectToServer: new Promise((resolve, reject)=>{
        MongoClient.connect(url, {useUnifiedTopology: true})
            .then(client=>{
                _db = client.db('testdb')
                resolve(_db)
            })
            .catch(e=>reject(e));
    }),

    getDb: ()=>{
        return _db;
    }
}