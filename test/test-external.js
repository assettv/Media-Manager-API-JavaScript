/*!
 * Tests for functions in
 * mediamanager.external object.
 */

var chai = require("chai");
require("./mock-utils.js");
require('./mock-fns.js');
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

describe("#mediamanager.external.addFilter(string, mixed)", function () {

    var filters = {
        perPage: 5,
        primate: "Homo sapien"
    };

    it("Should return a new instance of the external object with the given filters", function () {

        var expected = mediamanager.external.addFilter('perPage', filters.perPage);
        var result = mediamanager.external.addFilter('perPage', filters.perPage);

        chai.expect( result ).to.not.equal( expected );
    });

    /*
     * Tests for each filter!
     */
    it("Should add a given filter to the prototype", function () {

        var firstKey = Object.keys(filters)[0];
        var value = filters[ firstKey ];
        var result = mediamanager.external.addFilter(firstKey, value).globalFilters[ firstKey ];
        var expected = value;

        chai.expect( result ).to.equal( expected );
    });
});
