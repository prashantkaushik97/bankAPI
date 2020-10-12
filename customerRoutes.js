'use strict';
var express = require("express");
const { customer, account } = require("./models");
var router = express.Router();
var Account = require("./models").account;
var Bank = require("./models").bank
var Customer = require("./models").customer
// async function depositMoney(req, res, next){
//     var doc = await Customer.findById(req.params.cId)
//     if (!doc) {
//         err = new Error("customer not found")
//         err.status = 404
//         return next(err)
//     }
// }
router.get('/:cId/:aId', async function generalEnquiry(req, res, next){
    let doc = await Account.findById(req.params.aId);
    if (!doc) {
        let err = new Error('Not found');
        err.status = 404;
        return next(err);
    }
    res.send(doc);
})

router.post('/:cId', async function (req, res, next) {//create account
    var account = new Account(req.body);
    var doc = await Customer.findById(req.params.cId)
    if (!doc) {
        err = new Error("customer not found")
        err.status = 404
        return next(err)
    }
    account.CustomerId = req.params.cId;
    await account.save();
    doc.Accounts.push(account._id)
    await doc.save();
    res.send(account)
})
router.post('/:bId', async function (req, res, next) {//add customers
    let customer = new Customer(req.body);
    let doc = await bank.findById(req.params.bId);
    customer.BankId = req.params.bId;
    await customer.save();
    doc.Customers.push(customer._id);
    await doc.save();
    res.send(customer);
});

module.exports=router;
