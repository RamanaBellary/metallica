var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// configure model 
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;// for creating Primary key
var User = mongoose.model('User', new Schema({
    id: ObjectId,
    firstName: { type: String, required: '{PATH} is required.' },
    lastName: { type: String, required: '{PATH} is required.' },
    userName: { type: String, required: '{PATH} is required.', unique: true },
    email: { type: String, required: '{PATH} is required.', unique: true },
    password: { type: String }
}));

var registerUser = (req,res, callback)=>{
    console.log('req.body: '+JSON.stringify(req.body));
    if(req.body){
        if(!req.body.userName){
            callback({status: 500, data: {status: 'NotOk', msg: 'User Name is required.'}});
            return;
        }
        if(!req.body.firstName){
            callback({status: 500, data: {status: 'NotOk', msg: 'First Name is required.'}});
            return;
        }
        if(!req.body.lastName){
            callback({status: 500, data: {status: 'NotOk', msg: 'Last Name is required.'}});
            return;
        }
        if(!req.body.email){
            callback({status: 500, data: {status: 'NotOk', msg: 'Email is required.'}});
            return;
        }
        if(!req.body.password){
            callback({status: 500, data: {status: 'NotOk', msg: 'Password is required.'}});
            return;
        }
    }
    User.findOne({ userName: req.body.userName }, (err, user)=> {
        if (err) {
            console.log("error :" + err);
            //return res.status(500).send('Some error occured');
            callback({status: 500, data: {status: 'NotOk', msg: 'something bad happend...Try again '}});
        }
        else {
            if (user) {
                console.log("Warning: User with same UserName already Exist");
                // return res.status(500).send('User with same UserName Already Exist');
                callback({status: 500, data: {status: 'NotOk', msg: 'User with same UserName Already Exist !!!'}});
            } else {
                console.log('User not found, so good to go..')
                var hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(4));
                var user = new User({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    userName: req.body.userName,
                    email: req.body.email,
                    password: hash
                });
                console.log('Before save');
                user.save(function (err) {
                    if (err) {
                        var error = 'something bad happend...Try again ';
                        console.log(err);
                        if (err.code === 11000) {
                            console.log("error from DB:" + err);
                            error = "userName already exist.. try another";
                        }
                        //return res.status(500).send(error);
                        callback({status: 500, data: {status: 'NotOk', msg: error}});
                    }
                    else {
                        //res.status(200).send('User register successfully');
                        console.log('User registered successfully');
                        callback({status: 200, data: {status: 'Ok', msg: 'User registered successfully'}});
                    }
                });
                console.log('after save');
            }
        }
    });
};

var loginUser = (req, res, callback)=>{
    var username = req.headers['username'];
    var password = req.headers['password'];
    console.log('username: '+username);
    console.log('password: '+password);
    User.findOne({ userName: username }, (err, user)=> {
        if (err) {
            console.log("error :" + err);
            // res.status(401).send("Authentication Failed, Invalid Credentials !!!");
            callback({status: 400, data: {status: 'NotOk', msg:'Authentication Failed, Invalid Credentials !!!'}});
        }
        else {
            if (!user) {
                console.log("User not found");
                // res.status(404).send("Authentication Failed, User not found !!!");
                callback({status: 404, data: {status: 'NotOk', msg:'Authentication Failed, Invalid Credentials !!!'}});
            } else {
                // console.log("user in db :" + user);
                if (bcrypt.compareSync(password, user.password)) {
                    // write user details in session with cookie here
                    //req.session.user = user; // set-cookie:session={email:'...',password:'....'}
                    //next , in dashboard , check if session exists allow else do ....
                    console.log('valid user');
                    res.locals.user = user;
                    // res.status(200).send("Authentication Success !!!");
                    callback({status: 200, data: {status: 'Ok', msg:'Authentication Success !!!'}});
                } else {
                    console.log('invalid password')
                    // res.status(401).send("Authentication Failed, invalid password !!!");
                    callback({status: 401, data: {status: 'NotOk', msg:'Authentication Failed, Invalid Credentials !!!'}});
                }
            }
        }
    });
};

module.exports = {
    registerUser: registerUser,
    loginUser: loginUser
};
