
var chai = require("chai");
require("../dist/mediamanager-external-library.js");

describe("#mediamanager.external.create( object )", function () {

    it("Should create an instance with prototype of mediamanager.external", function () {

        var spec = {
            name: "Daniel",
            age: 24,
            interests: [
                "Turtles",
                "Zombies",
                "Bird-watching"
            ]
        };
        var result = mediamanager.external.create( spec );
        var resultProto = Object.getPrototypeOf( result );
        var expected = Object.create(mediamanager.external);
        expected.name = "Daniel";
        expected.age = 24;
        expected.interests = [
            "Turtles",
            "Zombies",
            "Bird-watching"
        ];

        chai.expect( result ).to.not.equal( expected ); // check for different reference
        chai.expect( result ).to.deep.equal( expected ); // check for same values
        chai.expect( resultProto ).to.equal( mediamanager.external ); // check for same reference
        chai.expect( resultProto ).to.deep.equal( mediamanager.external ); // check for same values
    });
});
