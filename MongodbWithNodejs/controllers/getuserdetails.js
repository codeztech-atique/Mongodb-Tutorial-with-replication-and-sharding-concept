var { userData } = require('../model/user.js');


exports.userDetailsGet = function(req, res, next) {
    var findUser = {'email':req.body.email};
    userData.findOne(findUser, (err, docs) => {
       if(err) {
           console.log(err)
       } else if(docs) {
           var data = {};
           data.email = docs.email;
           data.name = docs.name;
           data.registration_date = docs.registration_date;
           data.createAt = docs.createAt;
           res.status(200).send({
               message: "success",
               user: data
           })
       } else {
        res.status(200).send({
            email: req.body.email,
            message: "No user found with this email id, please register first!"
        })
       }
    })
}