PBShop_test

[ ![Codeship Status for kruny1001/pbshop](https://www.codeship.io/projects/f178be40-e8db-0131-6f99-0e1215f8c699/status)](https://www.codeship.io/projects/26110)

[![Build Status](https://travis-ci.org/meanjs/mean.svg?branch=master)](https://travis-ci.org/meanjs/mean)
//[![Dependencies Status](https://david-dm.org/meanjs/mean.svg)](https://david-dm.org/meanjs/mean)

History
module userMgnt
create user list directive

module cart

module gallery
    gallery-grid directive
        https://github.com/passy/angular-masonry

7_10
=========
Fixed gview.client.controller.js
--------
    Create a test driven API call
        users.server.controller.js
        user.server.model.js
        user.server.routes.js

***

#7_13#
Clone to Home PC

***

#7_14#
userlist view added


user information dashboard(not connected with db)
[example](http://kevangular.herokuapp.com/#!/galleries/userlist)

    Files 
    1. userlist.client.controller.js
    2. userlist.client.view.html

##directive##

* userlist dashboard
* product-description directive
  This directive will shows product image and description 
  
  
##services##
* extracting user information
* filtering user information

***

#7_15#

##Build API##
GET: /galleries (DONE)
list all galleries items(json)

GET: /galleries/userlist
list all of user informations

GET: /users/all
list all of user's information

/galleries/productlist
list all of product list

build Authentication version of API

*** 

#(Plan)7_16#

##**Front-End**##
implementing product-description directive(30%)
Design Quiz directive (10%)

###Plan### 
![Alt text](https://doc-0g-4g-docs.googleusercontent.com/docs/securesc/9vr1tvqfvqo09mp26t424ufbuprvemet/gf7c236g2ibp38bnqfjrqr11gal4ubrg/1405533600000/01698277479583512150/01698277479583512150/0B8FisuvAYPTfY0NTaS1Uc2RoUlk?e=view&h=16653014193614665626&nonce=b1f4k1elka2ks&user=01698277479583512150&hash=m5ttg98dfni35qj1u8gsqh5tp1pn1c1d)

* Considering a **Polymer** integration
* Design framework **material design**
http://blog.sethladd.com/2014/02/angular-and-polymer-data-binding.html

***

#(Plan)7_17#

##**Front-End**##
implementing product-description directive(30%)
Design Quiz directive (10%)
Implementation of Quiz directive
Toolbar Test (Polymer) URL: 

##**Back-End**##
Connect Social Network(Facebook, Twitter, and Google+)

***

#(Plan)7_18#
##**Front-End**##
Decorate product-description directive
    Test polymer is working from AngularJS Directive scope
Design Quiz directive
Implementation of Quiz directive

##**Back-End**##
