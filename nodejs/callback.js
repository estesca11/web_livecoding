/*
function a() {
    console.log('A');
}
*/

//in javascript function is considered as value
var a = function () { //anonymous function
    console.log('A');
}

function slowfunc(callback) { //function that operating really slow 
    callback();
}
/*  
    callback
    1. 다른 함수의 인자로써 이용되는 함수. 
    2. 어떤 이벤트에 의해 호출되어지는 함수.
*/

slowfunc(a);