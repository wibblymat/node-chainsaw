var test = require('tap').test;
var chainsaw = require('../');

test('nest wait', function (t) {
    t.plan(4);
    
    var ch = (function () {
        var vars = {};
        return chainsaw(function (saw) {
            this.do = function (cb) {
                saw.nest(cb, vars);
            };
            
            this.wait = function (n) {
                setTimeout(function () {
                    saw.next();
                }, n);
            };
        });
    })();
    
    var order = [];
    
    var times = {};
    
    ch
        .do(function (vars) {
            vars.x = 'y';
            order.push(1);
            
            this
                .do(function (vs) {
                    order.push(2);
                    vs.x = 'x';
                    times.x = Date.now();
                })
                .wait(50)
                .do(function (vs) {
                    order.push(3);
                    vs.z = 'z';
                    
                    times.z = Date.now();
                    var dt = times.z - times.x;
                    t.ok(dt >= 50 && dt < 75);
                })
            ;
        })
        .do(function (vars) {
            vars.y = 'y';
            order.push(4);
            
            times.y = Date.now();
        })
        .wait(100)
        .do(function (vars) {
            t.same(order, [1,2,3,4]);
            t.same(vars, { x : 'x', y : 'y', z : 'z' });
            
            times.end = Date.now();
            var dt = times.end - times.y;
            t.ok(dt >= 100 && dt < 125)
            
            t.end();
        })
    ;
});
