module.exports = {
    list: function (files) {
        var datalist = '<ul>';
        var i = 0;
        while (i < files.length) {
            datalist = datalist + `<li><a href="/?id=${files[i]}">${files[i]}</a></li>`;
            i++;
        }
        datalist = datalist + '</ul>';
        return datalist;
    },
    html: function (title, datalist, body, control) {
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
}
