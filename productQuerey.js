/**
 * Created by Kevin on 9/22/2014.
 */
var mongoose = require('mongoose');
require('./app/models/user.server.model.js');
var User = mongoose.model('User');

user = new User({
    firstName: 'Full',
    lastName: 'Name',
    displayName: 'Full Name',
    email: 'test@test.com',
    username: 'username',
    password: 'password',
    provider: 'local'
});

user.save();

User.find({}, function(err, users) {
    console.log(users);
    //users.should.have.length(0);
    //done();
});