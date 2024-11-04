const bodyParser = require("body-parser");
const express = require("express");
const app = express();

app.use(bodyParser.json());

app.use((req, res, next)=> {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
});




app.listen(8080, "Server started on port 8080!");