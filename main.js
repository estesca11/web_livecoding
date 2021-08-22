var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;

  if (pathname === '/') { //checking path
    if (queryData.id === undefined) {
      var title = 'Welcome';
      var description = 'Hello, Node.js';
        var template = `
      <!DOCTYPE html>
  <html>
  
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  
  <body>
    <a href="/">
      <h1>WEB</h1>
    </a>
    <ol>
      <li><a href="/?id=HTML">HTML</a></li>
      <li><a href="/?id=CSS">CSS</a></li>
      <li><a href="/?id=JavaScript">JavaScript</a></li>
    </ol>
    <h2>${title}</h2>
    <p>
     ${description}
    </p>
  </body>
  </html>
      `;
        response.writeHead(200); //success
        response.end(template);
    } else {
      fs.readFile(`data/${queryData.id}`, 'utf8', function (err, description) {
        var title = queryData.id; //semantic variable name
        var template = `
      <!DOCTYPE html>
  <html>
  
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  
  <body>
    <a href="/">
      <h1>WEB</h1>
    </a>
    <ol>
      <li><a href="/?id=HTML">HTML</a></li>
      <li><a href="/?id=CSS">CSS</a></li>
      <li><a href="/?id=JavaScript">JavaScript</a></li>
    </ol>
    <h2>${title}</h2>
    <p>
     ${description}
    </p>
  </body>
  </html>
      `;
        response.writeHead(200); //success
        response.end(template);
      })
    }
  } else {
    response.writeHead(404); //fail
    response.end('Not found');
  }
});
app.listen(3000);
