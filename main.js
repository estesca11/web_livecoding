var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

function setTemplate(title, datalist, body, control) {
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
    ${control}
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

  var control_create = `<input type="button" value="Create" onclick="location.href='./create'">`
  function control_update(updateQuery) {
    return ` <input type="button" value="Update" onclick="location.href='./update?id=${updateQuery}'">`;
  }
  function control_delete(title){
    return `<form action="/delete_process" method="post">
    <input type="hidden" name="id" value="${title}">
    <input type="submit" value="Delete">
</form>`
  }

  if (pathname === '/') { //checking path
    if (queryData.id === undefined) {
      fs.readdir('./data/', function (err, filelist) {
        var title = 'Welcome';
        var description = 'Hello, Node.js';
        var list = templateList(filelist);
        response.writeHead(200); //success
        response.end(setTemplate(title, list, description, control_create))
      })

    } else {
      fs.readdir('./data/', function (err, filelist) {
        var list = templateList(filelist);
        fs.readFile(`data/${queryData.id}`, 'utf8', function (err, description) {
          var title = queryData.id; //semantic variable name
          response.writeHead(200); //success
          response.end(setTemplate(title, list, description, control_create + control_update(title) + control_delete(title)));
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
        response.end(setTemplate(title, list, formString, ''));
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
  } else if (pathname === '/update') {
    fs.readdir('./data/', function (err, filelist) {
      var list = templateList(filelist);
      fs.readFile(`data/${queryData.id}`, 'utf8', function (err, description) {
        var title = queryData.id; //semantic variable name
        var updateString=`<form action="/update_process" method="post">
        <input type="hidden" name="id" value=${title}>
        <p><input type="text" name="title" placeholder="title" value="${title}"></p>
        <p>
            <textarea name="description" id="" cols="100" rows="30" placeholder="description">${description}</textarea>
        </p>
        <p>
            <input type="submit">
        </p>
        </form>`;
        response.writeHead(200); //success
        response.end(setTemplate(title, list, updateString, ''));
      })
    })
  } else if (pathname === '/update_process') {
    var body = '';
    request.on('data', function (data) {
      body += data;
    });
    request.on('end', function () {
      var post = qs.parse(body);
      var title = post.title;
      var id = post.id;
      var description = post.description;
      fs.rename(`data/${id}`, `data/${title}`, function (err) {
        fs.writeFile(`data/${title}`, description, 'utf8', function (err) {
          //302 => redirection
          response.writeHead(302, { Location: `/?id=${title}` });
          response.end('success');
        });
      })
    });
  } else if (pathname === '/delete_process') {
    var body = '';
    request.on('data', function (data) {
      body += data;
    });
    request.on('end', function () {
      var post = qs.parse(body);
      var id = post.id;
      fs.unlink(`data/${id}`, function (err) {
        response.writeHead(302, { Location: `/` });
        response.end();
      })
    });
  }
  else {
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
