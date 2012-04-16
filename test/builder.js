var test = require('tap').test;
var chainsaw = require('../');

test('builder', function (t) {
    t.plan(4);
    
    var cx = chainsaw(function (saw) {
        this.x = function () {};
    });
    t.ok(cx.x);
    
    var cy = chainsaw(function (saw) {
        return { y : function () {} };
    });
    t.ok(cy.y);
    
    var cz = chainsaw(function (saw) {
        return { z : function (cb) { saw.nest(cb) } };
    });
    t.ok(cz.z);
    
    cz.z(function () {
        t.ok(this.z);
    });
});
