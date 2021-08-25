var fs = require('fs');

//readFileSync -> return 'value'
console.log('A');

//readFile -> no return value, callback
fs.readFile('./nodejs/sample.txt', 'utf8', function (err, result) {
    console.log(result);
});

console.log('C');

function foo(bar) {
    console.log(bar);
}