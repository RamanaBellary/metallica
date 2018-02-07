/*Approach2: using mongoose schema */
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var express = require('express');
var bcrypt = require('bcryptjs');

var userSerice = require('./userService');

var app = express();
app.locals.pretty = true;// will display nicely formatted html in view page source of browser

// configure middleware
app.use(bodyParser.json());//support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // for form post

// connect to mongo database using mongoose
mongoose.connect('mongodb://localhost/metallicaDB1');

// configure model 
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;// for creating Primary key
var Commodity = mongoose.model('commodities', new Schema({
    id: ObjectId,
    Code: { type: String },
    Description: { type: String },
}));

app.use(function(req,res,next) {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers','content-type,auth-ticket,userName,password');
  res.setHeader('Access-Control-Allow-credentials',true);
  res.setHeader('Access-Control-Allow-Methods','*');
  next();  
})

app.get('/api/metallica/commodities', (req, res) => {
    userSerice.loginUser(req, res, (resp) => {
        console.log("resp from userService: " + resp);
        if (resp.status != 200) {
            console.log("Error from userService: " + resp.err);
            res.status(resp.status).send(resp.err);
        } else {
            console.log("Msg from userService: " + resp.data);
            Commodity.find({}, (err, data) => {
                if (err) {
                    console.log("error :" + err);
                    return res.status(500).send('Some error occured');
                } else {
                    console.log("data :" + data);
                    return res.status(200).send(data);
                }
            });
        }
    });
});

var Location = mongoose.model('locations', new Schema({
    id: ObjectId,
    Code: { type: String },
    Description: { type: String },
}));

app.get('/api/metallica/locations', (req, res) => {
    userSerice.loginUser(req, res, (resp) => {
        console.log("resp from userService: " + resp);
        if (resp.status != 200) {
            console.log("Error from userService: " + resp.err);
            res.status(resp.status).send(resp.err);
        } else {
            console.log("Msg from userService: " + resp.data);
            Location.find({}, (err, data) => {
                if (err) {
                    console.log("error :" + err);
                    return res.status(500).send('Some error occured');
                } else {
                    console.log("data :" + data);
                    return res.status(200).send(data);
                }
            });
        }
    });
});

var CounterParty = mongoose.model('counterparties', new Schema({
    id: ObjectId,
    Code: { type: String },
    Description: { type: String },
}));

app.get('/api/metallica/counterparties', (req, res) => {
    userSerice.loginUser(req, res, (resp) => {
        console.log("resp from userService: " + resp);
        if (resp.status != 200) {
            console.log("Error from userService: " + resp.err);
            res.status(resp.status).send(resp.err);
        } else {
            console.log("Msg from userService: " + resp.data);
            CounterParty.find({}, (err, data) => {
                if (err) {
                    console.log("error :" + err);
                    return res.status(500).send('Some error occured');
                } else {
                    console.log("data :" + data);
                    return res.status(200).send(data);
                }
            });
        }
    });
});

app.listen(3011);
console.log("refData service running on localhost:3011");

/* Approach using MongoClient */
/*
var bodyParser = require('body-parser');
var express = require('express');
var MongoClient = require('mongodb').MongoClient
var bcrypt = require('bcryptjs');

var userSerice = require('./userService');

var app = express();
app.locals.pretty = true;// will display nicely formatted html in view page source of browser

// configure middleware
app.use(bodyParser.json());//support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // for form post

var findDocuments = function (docName, callback) {
    console.log("inside refDataService.findDocuments");
    MongoClient.connect('mongodb://localhost/metallicaDB1', function (err, db) {
        if (err, null) {
            callback(err);
        }
        else {
            // Get the documents collection
            var collection = db.collection(docName);
            // Find some documents
            collection.find({}).toArray(function (err, docs) {
                if (err, null) {
                    callback(err);
                }
                else {
                    console.log("Found the following records");
                    console.log(docs)
                    callback(null, docs);
                }
            });
        }
    });
};

app.get('/commodities', (req, res) => {
    console.log('Inside commodities :' + req.headers['username']);
    userSerice.loginUser(req, res, (resp) => {
        console.log('after calling loginUser');
        console.log(resp);
        if (resp.status != 200) {
            console.log("error from login service: "+resp.err);
            return res.status(resp.status).send(resp.err);
        }
        else {
            console.log('user successfully validated..');
            findDocuments('Commodities', (err, data)=> {
                if (err) {
                    console.log("error from findDocuments: "+ err);
                    return res.status(500).send(err);
                } else {
                    console.log("data from findDocuments: "+ data);
                    return res.status(200).send(data);
                }
            });
        }
    });

    // MongoClient.connect('mongodb://localhost/metallicaDB1', function (err, db) {
    //     findDocuments(db, 'Commodities', function (err, data) {
    //         db.close();
    //         if (err) {
    //             res.status(500).send(err);
    //         } else {
    //             res.status(200).send(data);
    //         }
    //     });
    // });
});

app.get('/counterparties', (req, res) => {
    MongoClient.connect('mongodb://localhost/metallicaDB1', function (err, db) {
        findDocuments(db, 'CounterParties', function (err, data) {
            db.close();
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(data);
            }
        });
    });
});

app.get('/locations', (req, res) => {
    MongoClient.connect('mongodb://localhost/metallicaDB1', function (err, db) {
        findDocuments(db, 'Locations', function (err, data) {
            db.close();
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(data);
            }
        });
    });
});

app.listen(3011);
console.log("refData service running on localhost:3011");
*/