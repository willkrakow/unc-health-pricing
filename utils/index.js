const { MongoClient } = require('mongodb')
require('dotenv').config()
const dataimport = require('../data.js')

function dbConnection() {
  const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_CLUSTER}/sample_airbnb?retryWrites=true&w=majority?authSource=sample_airbnbn&w=1`;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return client;
}

async function dbInit() {

  const client = dbConnection();
  console.log("Connected to MongoDB.");

  try {
  
    // Connect to the MongoDB cluster
    client.connect(async function (err, db) {
        if(err) throw err;
        console.log("Initialized MongoDB client")
      const dbo = db.db("unc_health_prices");

      const payers_collection = dbo.collection("payers");
      const prices_collection = dbo.collection("prices");

      const payers_count = await payers_collection.countDocuments();
      const prices_count = await prices_collection.countDocuments();
      if (payers_count > 0) {
        console.log("Data for payers already there");
      } else {
        payers_collection.insertMany(dataimport.payer_data, function (err, res) {
          if (err) {
            throw err;
          }
          console.log(
            "Number of documents inserted in payers collection: " +
              res.insertedCount
          );
        });
      }
      if (prices_count > 0) {
        console.log("Data for prices already there");
      } else {
        prices_collection.insertMany(dataimport.price_data, function (
          err,
          res
        ) {
          if (err) throw err;
          console.log(
            "Number of documents inserted in prices collection" +
              res.insertedCount
          );
        });
      }
    });
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}
exports.dbInit = dbInit
exports.dbConnection = dbConnection