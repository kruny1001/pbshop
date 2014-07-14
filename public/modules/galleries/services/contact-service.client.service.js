'use strict';

angular.module('galleries').service('ContactService', [
	function() {
		//to create unique contact id
        var uid = 1;
        var contacts = [{
            id:0,
            'name': 'Kevin',
            'email': 'test@test.com',
            'phone': '123-123-1234'
        }];

        //save method create a new contact if not already exists
        //else update the existing object
        this.save = function(contact){
            if(contact.id ==null) {
                contact.id = uid++;
                contacts.push(contact);
            } else {
                for(var i in contacts) {
                    if(contacts[i].id == contact.id) {
                        contacts[i] = contact;
                    }
                }
            }
        };

        this.get = function(id) {
            for (var i in contacts) {
                if(contacts[i].id == id){
                    return contacts[i];
                }
            }
        };

        this.delete = function(id) {
            for(var i in contacts) {
                if(contacts[i].id == id){
                    contacts.splice(i,1);
                }
            }
        };

        this.list = function() {
            return contacts;
        };
	}
]);

