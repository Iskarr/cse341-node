const express = require("express");
const mongodb = require("./db/connect");
const cors = require("cors");
// const MongoClient = require("mongodb").MongoClient;
// const router = require("./routes");
// const contacts = require("./routes/contacts");
// app.use("/", require("./routes"));
// app.use("/contacts", contacts);

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const PORT = process.env.PORT || 3000;
const app = express();

app
  .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use(cors())
  .use(express.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  })
  .use("/", require("./routes"));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(PORT);
    console.log(
      "\x1b[34m%s\x1b[0m",
      `Connected to DB and listening on ${PORT}`
    );
  }
});

// app.listen(PORT, () => {
//   console.log(`Example app listening on port: ${PORT}`);
// });
