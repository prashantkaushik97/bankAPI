'use strict';
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var LoanSchema = new Schema({
	BankId: { type: Schema.Types.ObjectId, ref: "bank" },
	Type: String,
	AccountId: [{ type: Schema.Types.ObjectId, ref: "account" }],
	CustomerId: [{ type: Schema.Types.ObjectId, ref: "customer" }]
})
var AccountSchema = new Schema({
	BankId: { type: Schema.Types.ObjectId, ref: "bank" },
	CustomerId: [{ type: Schema.Types.ObjectId, ref: "customer" }]
})
var CustomerSchema = new Schema({
	Name: String,
	Address: String,
	PhoneNo: Number,
	Account: [{ type: Schema.Types.ObjectId, ref: "account" }],
});
var TellerSchema = new Schema({
	Name: String,
	BankId: [{ type: Schema.Types.ObjectId, ref: "bank" }],
	Customers: [{ type: Schema.Types.ObjectId, ref: "customer" }]
});
CustomerSchema.method("update", function (updates, callback) {
	Object.assign(this, updates, { updatedAt: new Date() });
	this.parent().save(callback);
});
var BankSchema = new Schema({
	customers: [CustomerSchema],
	Name: String,
	Location: String,
	Teller: [TellerSchema]
});
var Bank = mongoose.model("bank", BankSchema);
module.exports.Bank = Bank;