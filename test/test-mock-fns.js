/*!
 * Tests for mock functions
 * used by other tests.
 */

var chai = require("chai");
require("../mediamanager-external-library.js");
require("./mock-fns.js");

describe("#mediamanager.client(string)", function () {

    it("Should set the short name of the mediamanager object", function () {

        var shortname = "apples";
        mediamanager.client( shortname );

        chai.expect( mediamanager.sn ).to.equal( shortname );
    });
});

describe("#mediamanager.external.util.request(string, function[, object])", function () {

    it("Should throw an error if no api url found", function () {

        var expected = "mock-fns: request: api not found";
        var result = function () {

            var url = "this is a fake url that would never ever exist!";
            var onComplete = function () {};

            mediamanager.external.util.request(url, onComplete);
        };

        chai.expect( result ).to.throw( expected );
    });

    it("Should execute the onComplete function", function () {

        var baseUrl = mediamanager.external.util.templateReplace(mediamanager.external.baseURL, {
            shortname: mediamanager.external.client()
        });
        var url = baseUrl + "/template/" + mockVars.template + "/video/" + mockVars.video;
        var result = false;
        var expected = true;
        var onComplete = function () {
            result = expected; // don't normally mess around with state like in other scopes like this!
        };

        mediamanager.external.util.request(url, onComplete);

        chai.expect( result ).to.equal( expected );
    });
});

