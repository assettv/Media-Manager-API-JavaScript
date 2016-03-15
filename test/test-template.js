
var chai = require("chai");
var R = require("ramda");
require("../mediamanager-external-library.js");
require("./mock-fns.js");

var apiTests = [];

apiTests.push({
    name: "getMostViewedVideos",
    //params: null, -- these are here for examples
    //onComplete: null -- example 
});
apiTests.push({
    name: "getLatestVideos"
});
apiTests.push({
    name: "getVideo",
    video: mockVars.video
});

apiTests.forEach(function (apiTest) {

    var name = apiTest.name;
    var params = apiTest.params || null;

    describe("#mediamanager.external.template." + name, function () {

        it("Should execute onComplete without error", function () {

            var expected = true;
            var result = false;
            var onComplete = apiTest.onComplete || function () {
                result = expected;
            };
            var testFn = mediamanager.external.template[ name ];
            var testFnArgs = R.merge({ 
                template: mockVars.template,
                onComplete: onComplete
            }, apiTest);

            inject(testFn, testFnArgs, mediamanager.external.template);

            chai.expect( result ).to.equal( expected );
        });
    });
});

