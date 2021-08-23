var http = require('http');
var fs = require('fs');
var url = require('url');

function setTemplate(title, datalist, description) {
  return `
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
    ${datalist}
    <h2>${title}</h2>
    <p>
     ${description}
    </p>
  </body>
  </html>
  `;
}

function templateList(files) {
  var datalist = '<ul>';
  var i = 0;
  while (i < files.length) {
    datalist = datalist + `<li><a href="/?id=${files[i]}">${files[i]}</a></li>`;
    i++;
  }
  datalist = datalist + '</ul>';
  return datalist;
}

var app = http.createServer(function (request, response) {

  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;

  if (pathname === '/') { //checking path
    if (queryData.id === undefined) {
      fs.readdir('./data/', function (err, filelist) {
        var title = 'Welcome';
        var description = 'Hello, Node.js';
        var list = templateList(filelist);
        response.writeHead(200); //success
        response.end(setTemplate(title, list, description));
      })

    } else {
      fs.readdir('./data/', function (err, filelist) {
        var list = templateList(filelist);
        fs.readFile(`data/${queryData.id}`, 'utf8', function (err, description) {
          var title = queryData.id; //semantic variable name
          response.writeHead(200); //success
          response.end(setTemplate(title, list, description));
        })
      })
    }
  } else {
    if (_url == '/picture') {
      fs.readFile('sample.png', function (err, data) {
        response.writeHead(200);
        response.write(data);
        response.end();
      })
    } else {
      response.writeHead(404); //fail
      response.end('Not found');
    }
  }
});
app.listen(3000);
