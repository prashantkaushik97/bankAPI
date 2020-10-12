'use strict';
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var AccountSchema = new Schema({
	CustomerId: [{ type: Schema.Types.ObjectId, ref: "customer" }],
	Balance: Number
})
var LoanSchema = new Schema({
	BankId: { type: Schema.Types.ObjectId, ref: "bank" },
	Type: String,
	AccountId: [{ type: Schema.Types.ObjectId, ref: "account" }],
	CustomerId: [{ type: Schema.Types.ObjectId, ref: "customer" }]
})
var CustomerSchema = new Schema({
	Name: String,
	Address: String,
	PhoneNo: Number,
	Loans: [{ type: Schema.Types.ObjectId, ref: "loan" }],
	BankId: { type: Schema.Types.ObjectId, ref: 'bank' },
	Accounts: [{ type: Schema.Types.ObjectId, ref: "account" }]
});
var TellerSchema = new Schema({
	Name: String,
	BankId: { type: Schema.Types.ObjectId, ref: "bank" },
	Customers: [{ type: Schema.Types.ObjectId, ref: "customer" }]
});
CustomerSchema.method("update", function (updates, callback) {
	Object.assign(this, updates, { updatedAt: new Date() });
	this.parent().save(callback);
});
var BankSchema = new Schema({
	Customers: [{ type: Schema.Types.ObjectId, ref: "customer" }],
	Name: String,
	Location: String,
	Teller: [{ type: Schema.Types.ObjectId, ref: "teller" }]
});
var bank = mongoose.model("bank", BankSchema);
var account = mongoose.model("account", AccountSchema);
var customer = mongoose.model("customer", CustomerSchema);
var teller = mongoose.model("teller", TellerSchema);

var loan = mongoose.model("loan", LoanSchema);
module.exports.bank = bank;
module.exports.account = account;
module.exports.customer = customer;
module.exports.teller = teller;
module.exports.loan = loan;
