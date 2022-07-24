const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const database = process.env.DATA_BASE;
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
var _db;
 
module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      // Verify we got a good "db" object
      if (db)
      {
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