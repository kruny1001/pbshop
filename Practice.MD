TIP

When deploy the application you need to run 'grunt build' then push onto your repository. 

https://docs.angularjs.org/api/ngResource/service/$resource

$resource(url, [paramDefaults], [actions], options);
url:
paramDefaults:
actions:
options: 

returns


Building a RESTful web service with AngularJS
http://blog.brunoscopelliti.com/building-a-restful-web-service-with-angularjs-and-php-more-power-with-resource

<code>$rsource</code> is a separate, optional module of AngularJS, built over $http. 
It allows to create a javascript object that represents the data model. 
In this way each operation computed on the object created through <code>$resource</code>, 
is performed also on the server. $resource should be used instead of $http each time the web application has to deal with 
RESTful web service. 

<code>var r=$resource(url, [defaultParameters], [customActions]);</code>

Now it's possible to use $resourse, and start to take advantage of the possibility to create a javascript object that represents the data model. 
The best choice is to wrap the javascript model object into an AngularJS service, in this way we'll get each of the advantages of using services:

    myApp.factory('Books',['$resource', function($resource){
        return $resource('/book/:bookId', 
            {bookId:'@bookId'}, {
                loan:{
                    method:'PUT', 
                    params:{bookId:'@bookId'}, 
                    isArray:false
                }
        });
    }]);
    

At this point it is really simple to send requests to the web service, that we build in the previous post. 
Everywhere it is possible to inject the Books service it is possible to wrtie: 


    postData = { 
      "id": 42, 
      "title": "The Hitchhiker's Guide to the Galaxy", 
      "authors": ["Douglas Adams"] 
    }
    Books.save({}, postData);
    // It sends a POST request to /book. 
    // postData are the additional post data
    
    Books.get({bookId: 42});
    // Get data about the book with id = 42
    
    Books.query();
    // It is still a GET request, but it points to /book, 
    // so it is used to get the data about all the books
    
    Books.loan({bookId: 42});
    // It is a custom action.
    // Update the data of the book with id = 42
    
    Books.delete({bookId: 42});
    // Delete data about the book with id = 42
