'use strict';
const { Router } = require("express");
var express = require("express");
var router = express.Router();
var Teller = require("./models").Teller;
router.param("bID", function (req, res, next, id) {
	Teller.findById(id, function (err, doc) {
		if (err) return next(err);
		if (!doc) {
			err = new Error("Not Found");
			err.status = 404;
			return next(err);
		}
        req.teller = doc;
		return next();
	}); 
});
module.exports=router;