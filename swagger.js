const swaggerAutogen = require("swagger-autogen");

const doc = {
  info: {
    title: "My API",
    description: "Temple API",
  },
  host: "contact-app-ohio.onrender.com",
  schemes: ["http"],
};

const outputfile = "./swagger.json";
const endpointFiles = ["./routes/index.js"];

// Run to
swaggerAutogen(outputfile, endpointFiles, doc);

// Generates the swagger.json file
// swaggerAutogen(outputfile, endpointFiles, doc).then(async () => {
//   await import("./server.js");
// });
