const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());

app.use(cors());


const registrationApi = require('../controllers/registration');
const updateApi = require('../controllers/userdetailsupdate');
const getuserdetailsApi = require('../controllers/getuserdetails');
const deleteUserDetails = require('../controllers/deleteuserdetails');

//Testing 
app.get('/',  (req, res) => {
   res.send({
      status:200,
      message:'App is working fine!'
   })
})

// User Registration API
app.post('/user/registration', (req, res) => {
   registrationApi.userRegistration(req, res);
});

// Update single user details API
app.put('/user/details/update', (req, res) => {
   updateApi.userDetailsUpdate(req, res);
});

// Get Single user details API
app.get('/user/details/get', (req, res) => {
   getuserdetailsApi.userDetailsGet(req, res);
});


// User delete details API
app.delete('/user/details/delete', (req, res) => {
   deleteUserDetails.userDetailsDelete(req, res);
});


module.exports = app;