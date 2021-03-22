const express = require("express");
const bodyParser = require("body-parser");
require('dotenv').config()
const routes = require('./routes')
const utils = require('./utils/index.js');


const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

utils.dbInit().catch(console.error);

// ROUTES
app.get("/api/hello", routes.payersRoute );
app.get("/api/data/:payer", routes.pricesRoute)
app.get("/api/search/:payer/:query", routes.searchRoute);
app.get("/api/procedure/:procedure_id", routes.procedureRoute)

app.listen(port, () => console.log(`Listening on port ${port}`));

process.on("SIGTERM", () => {
  server.close(() => {
    console.log("Process terminated");
  });
});
