
#Draggable#
ref: http://api.greensock.com/js/

Touch enabled: works great on tablets phones, and desktop browsers. 
Even works in IE8
Incredibly smooth
Momentum-based animation with deceleration
Impose bounds
Sense overlaps with hitTest()
Define a trigger element 
Drag position, rotation, or scroll
Limit movement to horizontal or vertical
Rotation honors transform orign
Rich callback system and event dispatching
Sense clicks when the element moves less than 3 pixels


##usage##
In its simplest form, you can make an element draggable like this:

    Draggable.create("#yourID");

This will simply find the element with the ID "yourID" and make it draggable 
with no bounds or any kinetic motion after release. 
You don't need to use selector text either - you can pass the element itself or a jQuery object.

Use the vars parameter to define various other configuration options. For example, to make the object scroll 
only vertically using the "y" transform and stay within the bounds of a DOM element with an ID of "container", 
and call a function when clicked and another when the drag ends and make it have momentum-based motion 
(assuming you loaded ThrowPropsPlugin), do this:


    Draggable.create("#yourID", {
            type:"y",
            bounds: document.getElementById("container"),
            throwProps:true,
            onClick:function() {
                console.log("clicked");
            },
            onDragEnd:function() {
                console.log("drag ended");
            }
        });

Or to make something spinnable (dragging rotates the element), you could simply do:

    Draggable.create("#yourID", {
            type:"rotation",
            throwProps:true
        });

And to add the ability to snap to 90-degree increments after the mouse/touch is released 
(like flick-spinning that always lands on 90-degree increments), use the snap option:

    Draggable.create("#yourID", {
            type:"rotation",
            throwProps:true,
            snap:function(endValue) { 
                //this function gets called by ThrowPropsPlugin when the mouse/finger is released and it plots where rotation should normally end and we can alter that value and return a new one instead. This gives us an easy way to apply custom snapping behavior with any logic we want. In this case, we'll just make sure the end value snaps to 90-degree increments but only when the "snap" checkbox is selected. 
                return Math.round(endValue / 90) * 90;
            }
        });

Or to make the element flick-scrollable, so that dragging it actually scrolls the content, make sure you've set the element's height (and/or width), and then do this:

    Draggable.create("#yourID", {
            type:"scroll",
            throwProps:true
        });
