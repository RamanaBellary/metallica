var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var express = require('express');
var bcrypt = require('bcryptjs');
var querystring = require('querystring');

var userSerice = require('./userService');

// connect to mongo database using mongoose
mongoose.connect('mongodb://localhost/metallicaDB1');

// configure model 

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;// for creating Primary key
var Trade = mongoose.model('trades', new Schema({
    id: ObjectId,
    TradeDate: { type: Date, required: '{PATH} is required.' },
    Commodity: { type: String, required: '{PATH} is required.' },
    Side: { type: String, required: '{PATH} is required.' },
    Qty: { type: Number, required: '{PATH} is required.' },
    Price: { type: Number, required: '{PATH} is required.' },
    CounterParty: { type: String, required: '{PATH} is required.' },
    Location: { type: String, required: '{PATH} is required.' },
    Status: { type: String, required: '{PATH} is required.' }
}));

var retrieveTrades = (req, res, callback) => {
    userSerice.loginUser(req, res, (resp) => {
        console.log("resp from userService: " + resp);
        if (resp.status != 200) {
            console.log("Error from userService: " + resp.err);
            callback({ status: resp.status, err: resp.err });
        } else {
            console.log('query:' + JSON.stringify(req.query));
            //Construct QueryObject from queryString
            var qs = JSON.parse(JSON.stringify(req.query));
            console.log('qs: ' + JSON.stringify(qs));
            var query = {};
            if (qs.fromDate && !qs.toDate)
                query = { TradeDate: { $gte: new Date(qs.fromDate) } };
            else if (!qs.fromDate && qs.toDate)
                query = { TradeDate: { $lte: new Date(qs.toDate) } };
            else if (qs.fromDate && qs.toDate)
                query = { TradeDate: { "$gte": new Date(qs.fromDate), "$lte": new Date(qs.toDate) } };
            if (qs.id)
                query._id = qs.id;
            if (qs.commodity)
                query.Commodity = qs.commodity;
            if (qs.side)
                query.Side = qs.side;
            if (qs.qty)
                query.Qty = qs.qty;
            if (qs.price)
                query.Price = qs.price;
            if (qs.counterParty)
                query.CounterParty = qs.counterParty;
            if (qs.location)
                query.Location = qs.location;
            if (qs.status)
                query.Status = qs.status;
            Trade.find(query,
                (err, docs) => {
                    if (err) {
                        console.log("error :" + err);
                        callback({ status: 500, errMsg: 'Some error occured' });
                    } else {
                        //console.log("trades :" + docs);
                        callback({ status: 200, data: { trades: docs } });
                    }
                });
        }
    });
};

var insertTrades = (req, res, callback) => {
    userSerice.loginUser(req, res, (resp) => {
        console.log("resp from userService: " + resp);
        if (resp.status != 200) {
            console.log("Error from userService: " + resp.err);
            callback({ status: resp.status, errMsg: resp.err });
        } else {
            console.log("Msg from userService: " + resp.data);
            //TODO: 1.multiple trade insert; 2. Validate RefData
            var t = req.body;
            var tr = new Trade({
                TradeDate: new Date(),
                Commodity: t.commodity,
                Side: t.side,
                Qty: t.qty,
                Price: t.price,
                CounterParty: t.counterParty,
                Location: t.location,
                Status: 'Open'
            });
            tr.save(err => {
                if (err) {
                    console.log("error while saving trade: " + err);
                    callback({ status: 500, errMsg: 'Some error occured' });
                } else {
                    // console.log("trades :" + docs);
                    // callback({ statusCode: 200, trades: docs });
                    console.log("Trade saved successfully..");
                    //callback({ statusCode: 200, msg: 'Trade saved successfully..' });
                    callback({ status: 200, data: { status: 'Ok', msg: 'Trade created successfully..' } });
                }
            });
        }
    });
};

var updateTrades = (req, res, callback) => {
    userSerice.loginUser(req, res, (resp) => {
        console.log("resp from userService: " + resp);
        if (resp.status != 200) {
            console.log("Error from userService: " + resp.err);
            callback({ status: resp.status, errMsg: resp.err });
        } else {
            console.log("Msg from userService: " + resp.data);
            //TODO: 1.multiple trade update; 2. Validate RefData
            var t = req.body;
            Trade.findOne({ _id: t.id }, (err, tr) => {
                if (err) {
                    console.log("error :" + err);
                    callback({ status: 500, errMsg: 'Some error occured' });
                } else {
                    if (tr) {
                        console.log("trades :" + tr);
                        tr.TradeDate=new Date(t.tradeDate);
                        tr.Commodity = t.commodity;
                        tr.Side = t.side;
                        tr.Qty = t.qty;
                        tr.Price = t.price;
                        tr.CounterParty = t.counterParty;
                        tr.Location = t.location;
                        tr.Status = t.status;

                        tr.save(err => {
                            if (err) {
                                console.log("error while updating trade: " + err);
                                callback({ status: 500, errMsg: 'Some error occured while updating the trade.' });
                            } else {
                                console.log("Trade updated successfully..");
                                callback({ status: 200, data: { status: 'Ok', msg: 'Trade updated successfully..' } });
                            }
                        });
                    } else {
                        console.log('Trade not found!!');
                        callback({ status: 404, errMsg: 'Trade not found !!!' });
                    }
                }
            });
        }
    });
};

var deleteTrades = (req, res, callback) => {
    userSerice.loginUser(req, res, (resp) => {
        console.log("resp from userService: " + resp);
        if (resp.status != 200) {
            console.log("Error from userService: " + resp.err);
            callback({ status: resp.status, errMsg: resp.err });
        } else {
            console.log("Msg from userService: " + resp.data);
            //TODO: 1.multiple trade update; 2. Validate RefData
            console.log('id:' + req.params.id);
            Trade.findOne({ _id: req.params.id }, (err, tr) => {
                if (err) {
                    console.log("error :" + err);
                    callback({ status: 500, errMsg: 'Some error occured' });
                } else {
                    if (tr) {
                        console.log("trades :" + tr);
                        tr.remove(err => {
                            if (err) {
                                console.log("error while deleting trade: " + err);
                                callback({ status: 500, errMsg: 'Some error occured while deleting the trade.' });
                            } else {
                                console.log("Trade deleting successfully..");
                                //callback({ status: 200, msg: 'Trade deleting successfully..' });
                                callback({ status: 200, data: { status: 'Ok', msg: 'Trade deleted successfully..' } });
                            }
                        });
                    } else {
                        console.log('Trade not found!!');
                        callback({ status: 404, errMsg: 'Trade not found !!!' });
                    }
                }
            });
        }
    });
};

module.exports = {
    retrieveTrades: retrieveTrades,
    insertTrades: insertTrades,
    updateTrades: updateTrades,
    deleteTrades: deleteTrades
};