
var chai = require("chai");
require("./mock-fns.js");
require("../mediamanager-external-library.js");
require("./test-util.js");

describe("#mediamanager.client(string)", function () {

    it("should just be true", function () {

        var client = "demo";
        mediamanager.external.client( client );

        chai.expect(mediamanager.sn).to.equal( client );
    });
});

