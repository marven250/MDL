var express = require("express"),
  app = express(),
  port = process.env.PORT || 3001,
  bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/apps", require("../src/App"));

app.use(function(req, res) {
  res.status(404).send({ url: req.originalUrl + " not found" });
});

app.listen(port);

console.log("MDLive RESTful API server started on: " + port);
