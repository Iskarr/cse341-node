const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const MongoClient = require("mongodb").MongoClient;
const mongodb = require("./db/connect");
// const router = require("./routes");
const contacts = require("./routes/contacts");
app.use("/", require("./routes"));
app.use("/contacts", contacts);

app
  .use(express.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  })
  .use("/", require("./routes"));

mongodb.initDb((err, mongodb) => {
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
