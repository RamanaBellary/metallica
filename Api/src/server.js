var bodyParser = require('body-parser');
var express = require('express');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var ioc = require('socket.io-client');

var userService = require('./userService');
var tradeService = require('./tradeService');
var eventEmitter = require('./eventsService').eventEmitterService.getInstance();

var app = express();
app.locals.pretty = true;// will display nicely formatted html in view page source of browser

// connect to mongo database using mongoose
mongoose.connect('mongodb://localhost/metallicaDB1');

// configure middleware
app.use(bodyParser.json());//support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // for form post

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'content-type,auth-ticket,userName,password');
    res.setHeader('Access-Control-Allow-credentials', true);
    res.setHeader('Access-Control-Allow-Methods', '*');
    next();
})

app.post('/api/metallica/register', (req, res) => {
    userService.registerUser(req, res, (resp) => {
        res.status(resp.status).send(resp.data);
    });
});

app.post('/api/metallica/login', (req, res) => {
    userService.loginUser(req, res, (resp) => {
        res.status(resp.status).send(resp.data);
    });
});

app.get('/api/metallica/trades', (req, res) => {
    console.log('inside get trades');
    tradeService.retrieveTrades(req, res, (resp) => {
        if (resp.status != 200) {
            res.status(resp.status).send(resp.errMsg);
        } else {
            res.status(resp.status).send(resp.data);
        }
    });
});

app.post('/api/metallica/insertTrades', (req, res) => {
    console.log('inside insert trades');
    tradeService.insertTrades(req, res, (resp) => {
        if (resp.status != 200) {
            res.status(resp.status).send(resp.errMsg);
        } else {
            res.status(resp.status).send(resp.data);
        }
    });
});

app.put('/api/metallica/updateTrades', (req, res) => {
    console.log('inside update trades');
    console.log("req:" + JSON.stringify(req.body));
    tradeService.updateTrades(req, res, (resp) => {
        console.log('resp: ' + JSON.stringify(resp));
        if (resp.status != 200) {
            res.status(resp.status).send(resp.errMsg);
        } else {
            // eventEmitter.emit('tradeUpdated');
            //ioc.connect("http://localhost:3012");
            //ioc.emit("tradeUpdated", 'Trade got updated..');
            // ioc.connect("http://localhost:3012", function () {
            //     ioc.emit("tradeUpdated", 'Trade got updated..', function (message) {
            //         // client.disconnect();
            //         // server.close();
            //     });
            // });
            res.status(resp.status).send(resp.data);
        }
    });
});

app.delete('/api/metallica/trades/:id', (req, res) => {
    console.log('inside delete trades');
    tradeService.deleteTrades(req, res, (resp) => {
        if (resp.status != 200) {
            res.status(resp.status).send(resp.errMsg);
        } else {
            res.status(resp.status).send(resp.data);
        }
    });
});

app.listen(3010);
console.log("server running on localhost:3010");