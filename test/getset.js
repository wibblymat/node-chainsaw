var test = require('tap').test;
var chainsaw = require('../');

test('getset', function (t) {
    t.plan(4);
    var ch = chainsaw(function (saw) {
        var num = 0;
        
        this.get = function (cb) {
            cb(num);
            saw.next();
        };
        
        this.set = function (n) {
            num = n;
            saw.next();
        };
        
        saw.on('end', function () {
            t.equal(times, 3);
        });
    });
    
    var times = 0;
    ch
        .get(function (x) {
            t.equal(x, 0);
            times ++;
        })
        .set(10)
        .get(function (x) {
            t.equal(x, 10);
            times ++;
        })
        .set(20)
        .get(function (x) {
            t.equal(x, 20);
            times ++;
        })
    ;
});
