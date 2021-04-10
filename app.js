const stateJSON = require('./data/stateData.json');

var express = require("express");
var app = express();

app.get("/fetchData", (req, res) => {
    try {
        // removes duplicates
        const reducedStates = stateJSON.reduce(function (acc, obj) {
            let key = obj['id']
            let isExist = acc.find(s => s.id === key);
            if (!isExist) {
                acc.push(obj);
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
        res.json(reducedStates);
    } catch (e) {
        console.trace(e);
        res.sendStatus(500);
    }
});

app.listen(3001, () => {
 console.log("Server running on port 3001");
});