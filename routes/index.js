const utils = require("../utils");
const PropTypes = require('prop-types')
const ObjectId = require('mongodb').ObjectId

function payersRoute(req, res) {
  const client = utils.dbConnection();
  client.connect(async (err, db) => {
    if (err) throw err;
    const dbo = db.db("unc_health_prices");
    const docs = await dbo
      .collection("payers")
      .find()
      .toArray();
    res.send({ docs: docs });
    await client.close();
  });
}

async function pricesRoute(req, res) {
  const name = `${req.params.payer}_price`;
  const client = utils.dbConnection();
  const projection = {}
  projection[name] = 1
  projection.procedure_name = 1
  projection.price = 1
  client.connect(async (err, db) => {
    if (err) throw err;
    const dbo = db.db("unc_health_prices");
    dbo
      .collection("prices")
      .find()
      .project(projection)
      .toArray(async function (err, response) {
        if (err) throw err;
        res.send({ express: "Here is thou data", data: response });
        await client.close();
      });
  });
};

async function searchRoute(req, res) {
    const query = decodeURI(req.params.query);
    const client = utils.dbConnection();

    client.connect(async (err, db) => {
      if (err) throw err;
      const dbo = db.db("unc_health_prices");
      dbo
        .collection("prices")
        .aggregate([
          { $regexFindAll: { input: "$procedure_name", regex: query, options: "i" } }
        ])
        .toArray(async function (err, response) {
          if (err) throw err;
          res.send({ data: response });
          await client.close();
        });
    });
}


async function procedureRoute(req, res) {
    const procedure_id = req.params.procedure_id;
    const client = utils.dbConnection()
    console.log(procedure_id)
    client.connect(async (err, db) => {
        if(err) throw err;
        const dbo = db.db("unc_health_prices")
        dbo.collection('prices').find({ "_id" : ObjectId(procedure_id.toString()) }).toArray(async function(err, response) {
          if (err) throw err;
          console.log(response)
          res.send({ data: response })
          await client.close()
        })
    })

}

exports.pricesRoute = pricesRoute; 
exports.payersRoute = payersRoute;
exports.searchRoute = searchRoute;
exports.procedureRoute = procedureRoute;

payersRoute.propTypes = {
    req: PropTypes.object,
    res: PropTypes.object,
}