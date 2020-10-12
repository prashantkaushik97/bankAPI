'use strict';
var express = require("express");
var router = express.Router();
var Bank = require("./models").bank;
router.param("bID", function (req, res, next, id) {
	Bank.findById(id, function (err, doc) {
		if (err) return next(err);
		if (!doc) {
			err = new Error("Not Found");
			err.status = 404;
			return next(err);
		}
		req.bank = doc;
		return next();
	});
});
router.param("cId", function (req, res, next, id) {
	req.customer = req.bank.customers.id(id)
	if (!req.customer) {
		err = new Error("customer not found")
		err.status = 404
		return next(err)
	}
	next();
})
router.param("tId", function (req, res, next, id) {
	req.teller = req.bank.tellers.id(id)
	if (!req.teller) {
		err = new Error("teller not found")
		err.status = 404
		return next(err)
	}
	next();
})
router.get("/", function (req, res, next) {
	Bank.find({})
		.exec(function (err, banks) {
			if (err) { return next(err) }
			res.json(banks)
		});
})
router.post("/", function (req, res, next) {
	var bank = new Bank(req.body);
	bank.save(function (err, bank) {
		if (err) { return next(err) }
		res.status(201)
		res.json(bank);
	})
});
router.get("/:bID", function (req, res, next) {
	res.json(req.bank);
});
router.get("/:bID/customers", function (req, res, next) {
	res.json(req.bank.customers);
});
router.get("/:bID/tellers", function (req, res, next) {
	res.json(req.bank.teller);
});
router.post("/:bID/customers", function (req, res, next) {
	req.bank.customers.push(req.body)
	req.bank.save(function (err, customer) {
		if (err) { return next(err) }
		res.status(201)
		res.json(customer);
	})
});
router.post("/:bID/teller", function (req, res, next) {
	req.bank.Teller.push(req.body)
	req.bank.save(function (err, teller) {
		if (err) { return next(err) }
		res.status(201)
		res.json(teller);
	})
});
router.get("/:bID/customers/:cId", function (req, res, next) {
	
})
router.put("/:bID/customers/:aID", function (req, res) {
	req.customer.update(req.body, function (err, result) {
		if (err) { return next(err) }
		res.json(result)
	});
});
router.delete("/:bID/customers/:cId", function (req, res) {
	req.customers.remove(function (err) {
		req.bank.save(function (err, customer) {
			if (err) return next(err)
			res.json(customer);
		})
	})
});
module.exports = router;