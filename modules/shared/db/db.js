// 
// simple MongoClient wrapper that makes find and upsert a little easier, while
// also exposing the connection object itself through a promise for direct
// MongoClient operations
//

const MongoClient = require('mongodb').MongoClient
const config = require('../config');

// there are two db configs depending on node env, 'production' or 'development'
const node_env = process.env.NODE_ENV || 'development';
const dbConfig = config.db[node_env];
const { user, password, host, port, database } = dbConfig;
var url;
if (user && password) {
  url = `mongodb://${user}:${password}@${host}:${port}/admin`;
} else {
  url = `mongodb://${host}:${port}/${database}`
}

// utility function that connects to the DB as a promise, returning
// the db object from the conn object which connect() returns. 
// rejects on error
const connect = () => (
  new Promise((resolve, reject) => {
    MongoClient.connect(url, { useNewUrlParser: true })
      .then(resolve)
      .catch(err => {
        console.error(err);
      });
  })
);

const find = (collection, query) => (
  new Promise((resolve, reject) => {
    connect().then(conn => {
      col = conn.db(database).collection(collection);
      col.find(query || {}).toArray((err, results) => {
        if (err) {
          console.error(err);
        } else {
          conn.close();
          resolve(results);
        }
      });
    });
  })
);

const upsertOne = (collection, query, doc) => (
  new Promise((resolve, reject) => {
    connect().then(conn => {
      col = conn.db(database).collection(collection);
      col.findOneAndUpdate(query, {$set: doc}, {upsert: true})
        .then(() => conn.close())
        .then(resolve)
        .catch(err => {
          console.error(err);
        });
    });
  })
);

// export the connect function
module.exports = {
  connect,
  find,
  upsertOne,
  config: dbConfig,
}
