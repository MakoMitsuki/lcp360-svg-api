const stateJSON = require('./data/stateData.json');

var express = require("express");
var app = express();

// removes duplicates and sorts
const reducedStates = stateJSON.reduce(function (acc, obj) {
    let key = obj['id']
    let isExist = acc.findIndex(s => s.id === key);
    if (isExist === -1) {
        acc.push(obj);
    }
    else {
      let newVisits = acc[isExist].visits + obj.visits;
      acc[isExist] = {
          "id": obj.id,
          "name": obj.name,
          "visits": newVisits
      };
    }
    return acc
  }, []).sort(function(a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
});

app.get("/fetchData", (req, res) => {
    try {
        res.json(reducedStates);
    } catch (e) {
        console.trace(e);
        res.sendStatus(500);
    }
});

app.get("/fetchRange/:id", (req, res) => {
  let result = [];
  if(req.params.id === "0") {
     // 0 - 250
     result = reducedStates.filter(usState => usState.visits >= 0 && usState.visits <= 250).map(usState => usState.id);
  }
  if(req.params.id === "1") {
    // 250 - 500
    result = reducedStates.filter(usState => usState.visits >= 250 && usState.visits <= 500).map(usState => usState.id);
  }
  if(req.params.id === "2") {
    // 500 - 1000
    result = reducedStates.filter(usState => usState.visits >= 500 && usState.visits <= 1000).map(usState => usState.id);
  }
  if(req.params.id === "3") {
    // 1000+
    result = reducedStates.filter(usState => usState.visits >= 1000).map(usState => usState.id);
  }
  res.json(result);
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});