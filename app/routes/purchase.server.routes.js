/**
 * Created by Kevin on 2014-10-23.

 10-23 Google Wallet
 */

module.exports = function(app) {
    var users = require('../../app/controllers/users');
    var banners = require('../../app/controllers/banners');
    var gwCtrl = require('../../app/controllers/gwPurchase');

    app.route('/purchase/gw')
        .get(gwCtrl.read);
}