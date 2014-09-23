'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Product = mongoose.model('Product');

/**
 * Globals
 */
var user, product ;

/**
 * Unit tests
 */
describe('Product Model Unit Tests:', function() {
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
			product = new Product ({
				name: 'Product Name',
                mainimg: '1',
                imgs: '11',
                price: 20,
                description: 'Description Test',
                parentId: '1212',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return product .save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			product .name = '';
            console.log('!!!');
			return product .save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Product .remove().exec();

		User.remove().exec();
		done();
	});
});