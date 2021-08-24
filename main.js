var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

function setTemplate(title, datalist, body) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
  <h1><a href="/">WEB</a></h1>
    ${datalist}
    <p><input type="button" onclick="location.href='./create'" value="Create"></p>
    <h2>${title}</h2>
    <p>
     ${body}
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
  }
  else if (pathname === '/create') {
    fs.readdir('./data/', function (err, filelist) {
      var title = 'WEB - Create';
      var list = templateList(filelist);
      var formString;
      fs.readFile('./form.html', 'utf8', function (err, form) {
        formString = form;
        response.writeHead(200); //success
        response.end(setTemplate(title, list, formString));
      })
    })
  }
  else if (pathname === '/create_process') {
    var body = '';
    request.on('data', function (data) {
      body += data;
    });
    request.on('end', function () {
      var post = qs.parse(body);
      var title = post.title;
      var description = post.description;
      fs.writeFile(`data/${title}`, description, 'utf8', function (err) {
        //302 => redirection
        response.writeHead(302, { Location: `/?id=${title}` }); 
        response.end('success');
      });
    });
  } else {
    if (_url == '/picture') {
      fs.readFile('sample.png', function (err, data) {
        response.writeHead(200);
        response.write(data);
        response.end();
      })
    }
    else {
      response.writeHead(404); //fail
      response.end('Not found');
    }
  }
});
app.listen(3000);
