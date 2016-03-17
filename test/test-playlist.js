
var chai = require("chai");
var R = require("ramda");
require("../dist/mediamanager-external-library.js");
require("./mock-fns.js");

var apiTests = [];

apiTests.forEach(function (apiTest) {

    var name = apiTest.name;
    var params = apiTest.params || null;

    describe("#mediamanager.external.playlist." + name, function () {

        it("Should execute onComplete without error", function () {

            var expected = true;
            var result = false;
            var onComplete = apiTest.onComplete || function () {
                result = expected;
            };
            var testFn = mediamanager.external.playlist[ name ];
            var testFnArgs = R.merge({ 
                template: mockVars.template,
                playlist: mockVars.playlist,
                onComplete: onComplete
            }, apiTest);

            inject(testFn, testFnArgs, mediamanager.external.template); // function, args, context

            chai.expect( result ).to.equal( expected );
        });
    });
});
