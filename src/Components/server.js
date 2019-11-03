var express = require('express'),
    app = express(),
    port = process.env.PORT || 3001,
    // mongoose = require("mongoose"),
    // Apps = require("./api/models/apiModels"),
    bodyParser = require("body-parser");

// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/Appdb', { useNewUrlParser: true, useUnifiedTopology: true })


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/apps", require("./ApiDisplay"))


app.use(function (req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' })
});




app.listen(port);

console.log('MDLive RESTful API server started on: ' + port);
