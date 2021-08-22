var http = require('http');
var fs = require('fs');
var app = http.createServer(function (request, response) {
    var url = request.url;
    if (request.url == '/') {
        url = '/index.html';
    }
    if (request.url == '/favicon.ico') {
        response.writeHead(404);
        response.end();
        return;
    }
    response.writeHead(200);
    console.log(__dirname + url);
    response.end(fs.readFileSync(__dirname + url));

});
app.listen(3000);

var a = 1;
b = 2;

console.log("a:" + a);
console.log("b:" + b);

var c = 3,
    d = 10;
var str1 = "Hello";
var str2 = "World";
var str3 = null;

console.log("c:" + c);
console.log("d:" + d);
console.log(str1);
console.log(str2);
console.log(str3);