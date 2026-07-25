const dotenv = require('dotenv');
const dns = require('node:dns');
dotenv.config();
const MongoClient = require('mongodb').MongoClient;

// Solucionar resolución DNS para MongoDB Atlas en desarrollo
if (process.env.NODE_ENV !== 'production') {
  dns.setServers(['1.1.1.1', '1.0.0.1']);
}

let _db;

const initDb = (callback) => {
  if (_db) {
    console.log('Db is already initialized!');
    return callback(null, _db);
  }
  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      _db = client;
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error('Db not initialized');
  }
  return _db;
};

module.exports = {
  initDb,
  getDb
};
