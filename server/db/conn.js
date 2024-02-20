const { MongoClient } = require("mongodb");
const DbInstance = process.env.ATLAS_URI;
const database = process.env.DATA_BASE;
const client = new MongoClient(DbInstance, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
var _db;
 
module.exports = {
  connectToServer: function (callback) { 
    console.log(`Connecting ...`); 
    client.connect(function (err, db) {
      // console.log(`Connected to ${DbInstance}`);
      // Verify we got a good "db" object
      if (db) {
        _db = db.db(database);//_db = db.db("intercom");
        console.log(`Successfully connected to MongoDB, targeting ${database}`); 
      }
      return callback(err);
    });
  },
 
  getDb: function () {
    return _db;
  },
};