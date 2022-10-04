// const routes = require("express").Router();

// routes.get("/", (req, res) => {
//   res.send("Hello Sarah!!!");
// });

// module.exports = routes;

const express = require("express");
const router = express.Router();

router.use("/contacts", require("./swagger.js"));
router.use("/contacts", require("./contacts"));
// router.use("/contact", require("./contacts"));

module.exports = router;
