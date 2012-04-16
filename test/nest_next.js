var test = require('tap').test;
var chainsaw = require('../');

test('nest next', function (t) {
    t.plan(2);
    
    var ch = (function () {
        var vars = {};
        return chainsaw(function (saw) {
            this.do = function (cb) {
                saw.nest(false, function () {
                    var args = [].slice.call(arguments);
                    args.push(saw.next);
                    cb.apply(this, args);
                }, vars);
            };
        });
    })();
    
    var order = [];
    
    var times = [];
    
    ch
        .do(function (vars, next_) {
            vars.x = 'y';
            order.push(1);
            
            this
                .do(function (vs, next) {
                    order.push(2);
                    vs.x = 'x';
                    setTimeout(next, 30);
                })
                .do(function (vs, next) {
                    order.push(3);
                    vs.z = 'z';
                    setTimeout(next, 10);
                })
                .do(function () {
                    setTimeout(next_, 20);
                })
            ;
        })
        .do(function (vars, next) {
            vars.y = 'y';
            order.push(4);
            setTimeout(next, 5);
        })
        .do(function (vars) {
            t.same(order, [1,2,3,4]);
            t.same(vars, { x : 'x', y : 'y', z : 'z' });
            
            t.end();
        })
    ;
});
