const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var { userData } = require('../model/user.js');


exports.userDetailsUpdate = function(req, res, next) {
    var salt = bcrypt.genSaltSync(9);
    var hashedPassword = bcrypt.hashSync(req.body.password, salt); //for Password Encrypt
    var updateData = {
        $set:{
            password: hashedPassword,
            name:req.body.name
        }
    };
    userData.findOneAndUpdate({email: req.body.email}, updateData, {new: true, useFindAndModify: false}, (err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!");
        } else if(doc) {
            var token = jwt.sign({ id: req.body.email }, config.secret, {
                // expiresIn: 86400 // expires in 24 hours
                expiresIn: '900s' //15 minutes
            });
            res.status(200).send({
                auth: true,
                token: token,
                message:"1 docuemnt updated"
            })
        } else {
            res.status(404).send({
                message:"Resource not found, please register first with the email id!!"
            })
        }
        console.log(doc);
    });
};
