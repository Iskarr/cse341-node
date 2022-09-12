const routes = require("express").Router();

routes.get("/", (req, res) => {
  res.send("Hello Sarah!!!");
});

module.exports = routes;
