/**
 * Created by Kevin on 2014-10-23.
 */

var jwt = require('jsonwebtoken');
var product = {
    "iss":"08243362007174700466",
    "aud":"Google",
    "typ":"google/payments/inapp/item/v1",
    "iat":1414278546,
    "exp":1414364946,
    "request":{
        "currencyCode":"USD",
        "price":"3.00",
        "name":"Gold Star",
        "sellerData":"some opaque data",
        "description":"A shining badge of distinction"
    }
}

/*
 eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIwODI0MzM2MjAwNzE3N
 DcwMDQ2NiIsImF1ZCI6Ikdvb2dsZSIsInR5cCI6Imdvb2dsZS9
 wYXltZW50cy9pbmFwcC9pdGVtL3YxIiwiaWF0IjoxNDE0Mjc4N
 zkwLCJleHAiOjE0MTQzNjQ5NDYsInJlcXVlc3QiOnsiY3VycmVuY3lDb2RlIjoiVVNEIiwicHJpY2UiOiIzLjAwIiwibmFtZSI6IkdvbGQgU3RhciIsInNlbGxlckRhdGEiOiJzb21lIG9wYXF1ZSBkYXRhIiwiZGVzY3JpcHRpb24iOiJBIHNoaW5pbmcgYmFkZ2Ugb2YgZGlzdGluY3Rpb24ifX0.N3VRf_B9y0gGN8B5gyIbNQhjUB9qwCelAoSeQvclJOc
* */

var token = jwt.sign(product, '80oij1i2QxEJmI8tA7T-Fg');
console.log(token);

jwt.verify(token, '80oij1i2QxEJmI8tA7T-Fg', function(err, decoded) {
    console.log(decoded) // bar
});

var d = new Date();
console.log(d.getTime());