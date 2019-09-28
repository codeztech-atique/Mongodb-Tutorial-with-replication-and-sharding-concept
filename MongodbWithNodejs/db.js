const mongoose = require('mongoose')
const config = require('config');

mongoose.connect(config.mongodb.url+''+config.mongodb.local_server_ip+':'+config.mongodb.port+'/'+config.mongodb.databaseName,{ useNewUrlParser:true, useUnifiedTopology: true },(err) => {
    if(!err){
        console.log('MongoDB connected...')
    } else
    {
        console.log('Error in DB connection: ' + JSON.stringify(err, undefined, 2) );
    }
})

module.exports = mongoose