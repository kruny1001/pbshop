'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Gdriveapp = mongoose.model('Gdriveapp');

/**
 * Globals
 */
var user, gdriveapp;

/**
 * Unit tests
 */
describe('Gdriveapp Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			gdriveapp = new Gdriveapp({
				name: 'Gdriveapp Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return gdriveapp.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			gdriveapp.name = '';

			return gdriveapp.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Gdriveapp.remove().exec();
		User.remove().exec();

		done();
	});
});