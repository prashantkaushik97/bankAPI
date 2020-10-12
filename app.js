'use strict';
var express = require("express");
var app = express();
var routes = require("./routes");
var customerRoutes = require("./customerRoutes");
var bankRoutes = require("./bankRoutes");

//var loanRoutes = require("./loanRoutes");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/bank");
var db = mongoose.connection;
db.on("error", function (err) {
	console.error("connection error:", err);
});
db.once("open", function () { })
var jsonParser = require("body-parser").json;
var logger = require("morgan");
app.use(logger("dev"));
app.use(jsonParser());
//app.use("/banks", routes);
app.use('/', bankRoutes);
app.use('/Customer', customerRoutes);
app.use(function (req, res, next) {
	var err = new Error("Not Found");
	err.status = 404;
	next(err);
});
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.json({
		error: {
			message: err.message
		}
	});
});
var port = process.env.PORT || 5000;
app.listen(port, function () {
	console.log("Express server is listening on port", port);
});