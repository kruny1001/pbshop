/**
 * Created by Kevin on 2014-10-23.
 */

var jwt = require('jsonwebtoken');
var product = {
    "iss":"08243362007174700466",
    "aud":"Google",
    "typ":"google/payments/inapp/item/v1",
    "iat":1414051189,
    "exp":1414137589,
    "request":{
        "currencyCode":"USD",
        "price":"3.00",
        "name":"Gold Star",
        "sellerData":"some opaque data",
        "description":"A shining badge of distinction"
    }
}

var token = jwt.sign(product, 'shhhh');
console.log(token);

jwt.verify(token, 'shhhh', function(err, decoded) {
    console.log(decoded) // bar
});

var d = new Date();
console.log(d.getTime());