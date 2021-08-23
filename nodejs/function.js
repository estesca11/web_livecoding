function readData() {

}

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