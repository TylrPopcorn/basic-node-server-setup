const express = require("express");

const hatsRouter = require("./hats/hats-router");
/*
    Dependencies:

    npm install express
    npm i -D nodemon
    npm i dotenv
*/
const server = express();

//GLOBAL MIDDLEWARE
server.use(express.json()); //Allow the use of json request body fields

server.use("/api/hats", hatsRouter); //Used for hats related endpoints.

//ENDPOINTS
server.get("/", (req, res) => {
  //base endpoint
  res.send(`
        <h1> Welcome to Node! <h1>
    `);
});

//Catch any endpoints that cannot be found:
server.use("*", (req, res) => {
  //catch all 404 errors middleware:
  res.status(404).json({
    message: `${req.method} ${req.baseUrl} not found`,
  });
});

//Exports
module.exports = server;
