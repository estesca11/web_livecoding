var roles = {
    'name': 'b',
    'age': '10',
    'job': 'student'
};

console.log(roles.name);

//object with loop
//must use 'in' foward to object
/*for (var n in roles) {
    console.log('object => ', n, ' value => ', roles[n])
}*/

var f = function f1() {
    console.log(1)
}

//function as element of array
var a = [f];
a[0]();

var o = {
    func: f //property; element of object
}
o.func();
//array and object both can be used as 
//in object of javascript, function considerd as value