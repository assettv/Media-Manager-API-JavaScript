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

describe("#parseGetParams(string)", function () {

    var normalTestString = "first=daniel&last=stuessy&age=24&interests=apples,monkeys,pears&monkeys=&mane";
    var abnormalTestString= "?" + normalTestString;
    var testObject = {
        first: "daniel",
        last: "stuessy",
        age: "24",
        interests: "apples,monkeys,pears",
        monkeys: "",
        mane: ""
    };

    it("Should parse a string of GET parameters without '?' correctly", function () {

        var result = parseGetParams( normalTestString );
        var expected = testObject;

        chai.expect( result ).to.deep.equal( expected );
    });

    it("Should parse all values as strings", function () {

        var result = parseGetParams( normalTestString );

        Object.keys(result).forEach(function (key, i) {
            chai.expect( typeof result[key] ).to.equal("string");
        });
    });

    it("Should fail with a starting question mark", function () {

        var result = parseGetParams( abnormalTestString );
        var expected = testObject;

        chai.expect( result ).to.not.deep.equal( expected );
    });
});

describe("#addGetParams(string, object)", function () {

    var newParams = {
        awesomeness: "important",
        bees: "vital"
    };
    var oldParams = {
        winter: "coming",
        farts: "smelly"
    };
    var oldParamString = mediamanager.external.util.serialize( oldParams );
    var newParamString = mediamanager.external.util.serialize( newParams );
    var url = "https://example.com/apples/are/cool?" + oldParamString;

    it("Should not replace the old GET Params", function () {

        var result = addGetParams(url, newParams).indexOf( oldParamString ) > -1;
        var expected = true;

        chai.expect( result ).to.equal( expected );
    });

    it("Should add new GET params", function () {

        var result = addGetParams(url, newParams).indexOf( newParamString ) > -1;
        var expected = true;

        chai.expect( result ).to.equal( expected );
    });
});
