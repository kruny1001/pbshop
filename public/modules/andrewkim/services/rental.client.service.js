/**
 * Created by KevinSo on 9/15/2014.
 */

angular.module('andrewkim')
    .factory('Rental', [function() {
        return function Rental(customer, movie, daysRented) {
            this.id         = _.uniqueId();
            this.customer   = customer;
            this.movie      = movie;
            this.daysRented = daysRented;

            this.customer.rentals.push(this);

            this.frequentRenterPoints = function() {
                if (this.movie.type == "new release" && this.daysRented > 1) {
                    return 2;
                }

                return 1;
            }

            this.charge = function() {
                return this.movie.charge(this.daysRented);
            }
        }
    }]);
