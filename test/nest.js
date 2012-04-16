var test = require('tap').test;
var chainsaw = require('../');

test('nest', function (t) {
    t.plan(2);
    
    var ch = (function () {
        var vars = {};
        return chainsaw(function (saw) {
            this.do = function (cb) {
                saw.nest(cb, vars);
            };
        });
    })();
    
    var order = [];
    
    ch
        .do(function (vars) {
            vars.x = 'y';
            order.push(1);
            
            this
                .do(function (vs) {
                    order.push(2);
                    vs.x = 'x';
                })
                .do(function (vs) {
                    order.push(3);
                    vs.z = 'z';
                })
            ;
        })
        .do(function (vars) {
            vars.y = 'y';
            order.push(4);
        })
        .do(function (vars) {
            t.same(order, [1,2,3,4]);
            t.same(vars, { x : 'x', y : 'y', z : 'z' });
            t.end()
        })
    ;
});
