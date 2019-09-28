var { userData } = require('../model/user.js');


exports.userDetailsDelete = function(req, res, next) {
    var findUser = {'email':req.body.email};
    userData.deleteOne(findUser, (err, docs) => {
       if(err) {
           console.log(err)
       } else if(docs.deletedCount!=0 || docs.n!=0) {
           res.status(200).send({
               userName: req.body.email,
               message: "success! 1 record deleted"
           })
       } else {
        res.status(404).send({
            message: "failed! no user found"
        })
       }
    })
}