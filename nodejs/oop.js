var foo = {
    v1: 'v1',
    v2: 'v2',
    f1: function () {
        console.log(this.v1);
    },
    f2: function () {
        console.log(this.v2);
    }
}

foo.f1();