#7_23#

user list update URL/#!/test-polymer

create a edit view
option 1-4
option 1

push 2
Attempt to apply polymer custom element data binding inside angular controller but it doesn't 
work properly with post-list and data service by polymer data binding service. 

<div class="container1" layout vertical center>

    <post-card ng-repeat="post in posts">
        <img ng-src="{{post.avatar}}">
        <h2>{{post.username}}</h2>
        <p>{{post.text}}</p>
    </post-card>

    <!--
    polymer data binding
    <post-list show="all"></post-list>
    -->

</div>

