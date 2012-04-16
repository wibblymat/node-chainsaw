var test = require('tap').test;
var chainsaw = require('../');

test('attr', function (t) {
    t.plan(4);
    
    var xy = [];
    var ch = chainsaw(function (saw) {
        this.h = {
            x : function () { 
                xy.push('x');
                saw.next();
            },
            y : function () {
                xy.push('y');
                saw.next();
                t.same(xy, ['x','y']);
            }
        };
    });
    t.ok(ch.h);
    t.ok(ch.h.x);
    t.ok(ch.h.y);
    
    ch.h.x().h.y();
});
