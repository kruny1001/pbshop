/**
 * Created by KevinSo on 10/2/2014.
 */

//example of write a file

var mongoose = require('mongoose');
var Grid = require('gridfs-stream');
var fs = require('fs');
var raedStream=''
var buffer="";

var conn = mongoose.createConnection('127.0.0.1', 'test', 27017);
conn.once('open', function(){
    var gfs = Grid(conn.db, mongoose.mongo);

    //write file
    /*
    var source = fs.createReadStream('my_file.txt');
    var target = gfs.createWriteStream({
        filename: 'my_file.txt'
    });
    source.pipe(target);

    //after the write is finished
    target.on("close", function(){
        // read file, buffering data as we go
        raedStream = gfs.createReadStream({filename: "my_file.txt"});

        raedStream.on("data", function(chunk){
            buffer += chunk;
        });

        // dump contents to console when complete
        raedStream.on("end", function(){
            console.log("contents of file:\n\n", buffer);
        });
    });
*/

    //example of read a file
    raedStream = gfs.createReadStream({filename: "my_file.txt"});

    raedStream.on("data", function(chunk){
        buffer += chunk;
    });

    // dump contents to console when complete
    raedStream.on("end", function(){
        console.log("contents of file:\n\n", buffer);
    });


    // Checkk
    gfs.exist({filename:"my_file.txt"}, function (err, found) {
        if (err) return handleError(err);
        found ? console.log('File exists') : console.log('File does not exist');
    });

    // remove file
    /*
    gfs.remove({filename:"my_file.txt"}, function(err){
        if(err) return handleError(err);
        console.log('success');
    })
    */

});