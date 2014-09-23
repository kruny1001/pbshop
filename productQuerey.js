/**
 * Created by Kevin on 9/22/2014.
 */
var mongoose = require('mongoose');
var User = require('./app/models/user.server.model.js');
mongoose.model('User');

User.find({}, function(err, users) {
    console.log(users);
    //users.should.have.length(0);
    //done();
});