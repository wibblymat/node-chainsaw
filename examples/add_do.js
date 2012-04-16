var chainsaw = require('chainsaw');

function AddDo (sum) {
    return chainsaw(function (saw) {
        this.add = function (n) {
            sum += n;
            saw.next();
        };
        
        this.do = function (cb) {
            saw.nest(cb, sum);
        };
    });
}

AddDo(0)
    .add(5)
    .add(10)
    .do(function (sum) {
        if (sum > 12) this.add(-10);
    })
    .do(function (sum) {
        console.log('Sum: ' + sum);
    })
;
