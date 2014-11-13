/**
 * Created by Kevin on 2014-10-23.
 */

var jwt = require('jsonwebtoken');
var d = new Date();
var iat = d.getTime();
var exp = new Date(2022, 11, 31).getTime();

var product = {
    "iss":"08243362007174700466",
    "aud":"Google",
    "typ":"google/wallet/online/masked/v2/request",
    "iat":iat,
    "exp":exp,
    "request":{
        "currencyCode":"USD",
        "price":"3.00",
        "name":"Gold Star",
        "sellerData":"some opaque data",
        "description":"A shining badge of distinction",
        "origin":"http://localhost:3000/"
    }
}

var maskedWallet = {
    "iss":"08243362007174700466",
    "aud":"Google",
    "typ":"google/wallet/online/masked/v2/request",
    "iat":iat,
    "exp":exp,
    "request":{
        "clientId":"574563539488-n0vrevgjp3606l20hfk4rqfk1dc8j3qb.apps.googleusercontent.com",
        "merchantName":"pbShop",
        "origin":"http://localhost:3000/",
        "phoneNumberRequired": true,
        "pay": {
            "estimatedTotalPrice": "15.01",
            "currencyCode": "USD"
        },
        "ship": {

        }

    }
}

var productV2 = {
    "iss": "Google",
    "aud": "133713371337",
    "iat": 12340000,
    "exp": 12340900,
    "typ": "google/wallet/online/masked/v2/response",
    "response": {
        "googleTransactionId": "13235343.9023423c",
        "merchantTransactionId": "order12343",
        "email": "user@example.com",
        "pay": {
            "objectId": "10492fed8c",
            "description": [
                "VISA xxx-1234"],
            "billingAddress": {
                "name": "Albert Taylor",
                "address1": "123 Any Street",
                "address2": "Fourth Floor",
                "address3": "Suite 4321",
                "countryCode": "US",
                "city": "New York",
                "state": "NY",
                "postalCode": "10011",
                "phoneNumber": "800-123-4567",
                "postBox": false,
                "companyName": "Buyer Company"
            }
        },
        "ship": {
            "objectId": "1d8fiej3fc",
            "shippingAddress": {
                "name": "John Joseph",
                "address1": "123 Any Street",
                "address2": "Fourth Floor",
                "address3": "Suite 4321",
                "countryCode": "US",
                "city": "New York",
                "state": "NY",
                "postalCode": "10011",
                "phoneNumber": "800-123-4567",
                "postBox": false,
                "companyName": "Buyer Company"
            }
        }
    }
}
/*
 eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIwODI0MzM2MjAwNzE3N
 DcwMDQ2NiIsImF1ZCI6Ikdvb2dsZSIsInR5cCI6Imdvb2dsZS9
 wYXltZW50cy9pbmFwcC9pdGVtL3YxIiwiaWF0IjoxNDE0Mjc4N
 zkwLCJleHAiOjE0MTQzNjQ5NDYsInJlcXVlc3QiOnsiY3VycmVuY3lDb2RlIjoiVVNEIiwicHJpY2UiOiIzLjAwIiwibmFtZSI6IkdvbGQgU3RhciIsInNlbGxlckRhdGEiOiJzb21lIG9wYXF1ZSBkYXRhIiwiZGVzY3JpcHRpb24iOiJBIHNoaW5pbmcgYmFkZ2Ugb2YgZGlzdGluY3Rpb24ifX0.N3VRf_B9y0gGN8B5gyIbNQhjUB9qwCelAoSeQvclJOc
* */

var token = jwt.sign(maskedWallet, '80oij1i2QxEJmI8tA7T-Fg');
console.log(token);

jwt.verify(token, '80oij1i2QxEJmI8tA7T-Fg', function(err, decoded) {
    console.log(decoded) // bar
});

var token = jwt.sign(productV2, '80oij1i2QxEJmI8tA7T-Fg');
console.log(token);


/*
var d = new Date();
console.log(d.getTime());
*/