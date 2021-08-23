var testFoler = './nodejs/';
var fs = require('fs');

fs.readdir(testFoler, function (err, files) { //type of 'files' is string array
    console.log(files);
}
)
