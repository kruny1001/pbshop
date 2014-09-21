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
Toolbar Test (Polymer) URL: http://kevangular.herokuapp.com/#!/test-polymer

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


#7_21# 
## User Friendly User List(Polymer)##
http://kevangular.herokuapp.com/#!/test-polymer

#7_23#
## User list data binding with angular##
## Dialog Custom element##

#7_24#
Communication between Angular and Polymer
https://github.com/eee-c/angular-bind-polymer

#7_25#
Build Directive by using Polymer elements

Create a editor
option 1
1 column description

option 2
2 column description

option 3
3 column description

option 1.1
Image + Description

option 2.1
Image(Left) + Description

option 2.2
Image(right) + Description

option 3.1 
Image + Description + Image

option 3.2 
Description + Image + Description
 
#7_29#
YouTube Directive implementation
files: 
\public\modules\galleries\directives\youtube\youtube.html
\public\modules\galleries\directives\youtube.client.directive.js

applied to (http://kevangular.herokuapp.com/#!/galleries/gview)

##plan##
directive styling

#7_30#

#7_31#
GSAP Draggable rotation (Image http://kevangular.herokuapp.com/#!/galleries/gview)
 
#8_1#
Apply velocity and snap degree on the Draggable Directive
 
#8_3#
Add SCSS and responsive animated grid gallery

#8_11#
menuList

##RestfulAPI(Backend)##
app.route('/menus')
        .get(menus.list) // working
        .post(menus.create); // working

app.route('/menus/:menusId')
    .get(menus.read)
    .put(users.requiresLogin, menus.hasAuthorization, menus.update)
    .delete(users.requiresLogin, menus.hasAuthorization, menus.delete);

##File Added(Fronend)##
added route and view

    (menuform.client.controller.js)
    (menuform.client.view.js)
    (menus.client.service.js)

[Menu Form](http://kevangular.herokuapp.com/#!/menulist/menuform)

#8_12#
Added Google Map directive
[Menu Form](http://kevangular.herokuapp.com/#!/menulist/menuform)

#8_13#
Image Drag and Drop directive

#8_14#
Request: 
1. Top Nav Bar Shrink if it doesn't use for 30 second
2. Expending a image

#8_15# 
Designing a Background

http://www.java2s.com/Open-Source/Javascript_Free_Code/AngularJS/Download_angularJS_TwitterSearch_Free_Java_Code.htm
http://codepen.io/GreenSock/pen/zDwEk

##BezierPlugin##
http://codepen.io/GreenSock/pen/Krfod

##DirectionalRotationPlugin##
http://codepen.io/GreenSock/pen/jiEyG

##preloader##
http://codepen.io/GreenSock/pen/KCaBn

#8/18#
Front View
http://kevangular.herokuapp.com/

Model: https://testcenter.duolingo.com/

#8/19#
CSS 

#9/5#
create rChart directive 

Example
controller

    grunt
    $scope.example1 = {
                src: 'library(rCharts)\n'+
                    'hair_eye_male <- subset(as.data.frame(HairEyeColor), Sex == "Male")\n' +
                    'nPlot(Freq ~ H' +
                    'air, group = "Eye", data = hair_eye_male, type = "multiBarChart")',
                title:'Multi Bar Chart'
            };
    
 view
            
    <code>
    <r-chart r-source="example1"></r-chart>
    <r-chart r-source="example2"></r-chart>
    </code>

#9/17#
/#!/a-main
responsive column and rendering custom directive and 
http://stackoverflow.com/questions/20297638/call-function-inside-sce-trustashtml-string-in-angular-js

#9/20#
Google Permallinks
http://gdurl.com/