const stateJSON = require('./data/stateData.json');

var express = require("express");
var app = express();

app.get("/fetchData", (req, res) => {
    try {
        res.json(stateJSON);
    } catch (e) {
        console.trace(e);
        res.sendStatus(500);
    }
});

app.listen(3000, () => {
 console.log("Server running on port 3000");
});