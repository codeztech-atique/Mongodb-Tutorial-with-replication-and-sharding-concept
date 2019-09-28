const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var { userData } = require('../model/user.js');


exports.userRegistration = function(req, res, next) {
    var salt = bcrypt.genSaltSync(9);
    var hashedPassword = bcrypt.hashSync(req.body.password, salt); //for Password Encrypt
    var person = new userData({
        email : req.body.email,
        password : hashedPassword,
        name : req.body.name,
        registration_date: req.body.registration_date
    });
    userData.findOne({'email':req.body.email}, (err, docs) => {
        if(!docs) {
            person.save((err, doc) => {
                var token = jwt.sign({ id: req.body.email }, config.secret, {
                    // expiresIn: 86400 // expires in 24 hours
                    expiresIn: '900s' //15 minutes
                });
                if(!err){
                    res.status(200).send({ auth: true, token: token, doc, message:"1 documents inserted!" });
                }
                else { console.log('Error in user registration' + JSON.stringify(err, undefined, 2)); }
            });
        }
        else { 
            console.log("please login, User already exists:"+req.body.email);
            res.status(400).send({
                message: 'please login, User already exists:'+req.body.email
            }) 
        }
    })
};
