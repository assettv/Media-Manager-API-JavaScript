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

    it("Should create two instances with the same prototype", function () {

        var spec = {};
        var oneInstancePrototype = Object.getPrototypeOf( mediamanager.external.create( spec ) );
        var twoInstancePrototype = Object.getPrototypeOf( mediamanager.external.create( spec ) );

        chai.expect( oneInstancePrototype ).to.equal( twoInstancePrototype );
    });
});

describe("#mediamanager.external.addFilter(string, mixed)", function () {

    var filters = {
        perPage: 5,
        primate: "Homo sapien"
    };
    var firstKey = Object.keys(filters)[0];
    var value = filters[ firstKey ];

    it("Should return a new instance of the external object with the given filters", function () {

        var expected = mediamanager.external.addFilter('perPage', filters.perPage);
        var result = mediamanager.external.addFilter('perPage', filters.perPage);

        chai.expect( result ).to.not.equal( expected );
    });

    it("Should add a given filter to the prototype", function () {

        var newExternal = mediamanager.external.addFilter(firstKey, value);
        var result = Object.getPrototypeOf( newExternal ).globalFilters[ firstKey ];
        var expected = value;

        chai.expect( result ).to.equal( expected );
    });

    it("Should have the same prototype as the external.template and playlist objects", function () {

        var newExternal = mediamanager.external.addFilter(firstKey, value);
        var result = Object.getPrototypeOf( newExternal );
        var templateProto = Object.getPrototypeOf( newExternal.template );
        var playlistProto = Object.getPrototypeOf( newExternal.playlist );

        chai.expect( result ).to.equal( templateProto );
        chai.expect( result ).to.equal( playlistProto );
    });
});
