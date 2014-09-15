/**
 * Created by KevinSo on 9/15/2014.
 */

angular.module('andrewkim')
    .factory('Customers', [function() {
        return function Customer(name) {
            this.id      = _.uniqueId();
            this.name    = name;
            this.rentals = [];

            this.charge = function() {
                return this.rentals.sum("charge");
            }

            this.frequentRenterPoints = function() {
                return this.rentals.sum("frequentRenterPoints");
            }

            this.rentals.sum = function(attribute) {
                return _.chain(this)
                    .map(function(rental) { return rental[attribute](); })
                    .inject(function(sum, value) { return sum + value; })
                    .value();
            }

            this.statement = function() {
                var result = "Rental Record For " + this.name + "\n";

                _.each(this.rentals, function(rental) {
                    result += rental.movie.title + " " + rental.charge() + "\n";
                });

                // add footer notes
                result += "Amount owed is " + this.charge() + "\n";
                result += "You earned " + this.frequentRenterPoints() + " frequent renter points."

                return result;
            }
        }
    }]);
