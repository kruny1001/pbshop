/**
 * Created by KevinSo on 10/10/2014.
 */

var paymentApp = angular.module('payment', []);

paymentApp.controller('testPayment', ['$scope', 'googleWallet',
    function($scope, googleWallet){
        googleWallet.validate();
    }
]);

paymentApp.factory('googleWallet', [
    function(){
        return {
            validate: function(){
                console.log('validation');
            }
        }
    }
]);

