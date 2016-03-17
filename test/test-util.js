
var chai = require("chai");
require("../dist/mediamanager-external-library.js");

describe("#mediamanager.external.util.serialize(object)", function () {

    /**
     * Test serialize.
     * Ensure the params are property URI encoded.
     */
    it("Should serialize given object", function () {

        var obj = {
            "perPage": 12,
            "templateID": "sljflkdjflwkjelfkj",
            "fruit": "apple",
            "searchTerm": ";@=monkeys"
        };
        var expected = "perPage=12&templateID=sljflkdjflwkjelfkj&fruit=apple&searchTerm=%3B%40%3Dmonkeys";
        var result = mediamanager.external.util.serialize(obj);

        chai.expect( result ).to.equal( expected );
    });
});

describe("#mediamanager.external.util.templateReplace(string, object)", function () {

    it("Should replace patterns in given string with values of matching keys in given value object.", function () {

        var string = "My first name is {first}. My family name is {family}.";
        var values = {
            first: "Daniel",
            family: "Stuessy"
        };
        var expected = "My first name is "+ values.first +". My family name is "+ values.family +".";
        var result = mediamanager.external.util.templateReplace(string, values);

        chai.expect( result ).to.equal( expected );
    });
});

describe("#mediamanager.external.util.clone(object)", function () {

    var parent = {
        /**
         * Create an instance 
         * with this as its prototype.
         *
         * @param {object} spec Specification object.
         * @return {object} New object inheriting from this parent.
         */
        create: function (spec) {
            return Object.keys(spec).reduce(function (instance, key) {
                instance[key] = spec[key];
                return instance;
            }, Object.create(this));
        },
        responsibilities: [
            "Bills",
            "Mortgage",
            "Taxes",
            "Children"
        ]
    };
    var original = {
        name: "Mr. Apple",
        interests: [
            "Games",
            "Money",
            "Baking"
        ]
    };
    var child = parent.create({
        name: "Mr. Junior",
        interests: [
            "Puzzles",
            "Hide and Seek",
            "Food"
        ]
    });

    it("Should clone a plain object", function () {

        var clone = mediamanager.external.util.clone( original );

        chai.expect( clone ).to.not.equal( original );
        chai.expect( clone ).to.deep.equal( original );
    });

    it("Should clone an inheriting object", function () {

        var clone = mediamanager.external.util.clone( child );
        var parentClone = Object.getPrototypeOf( clone );

        chai.expect( clone ).to.not.equal( child );
        chai.expect( clone ).to.deep.equal( child );
        chai.expect( parentClone ).to.equal( parent );
        chai.expect( parentClone ).to.deep.equal( parent );
    });
});

describe("#mediamanager.external.util.extend(object, object)", function () {

    it("Should extend one object with another one", function () {

        var objA = {
            cool: false,
            interesting: true,
            rich: null,
            age: 5
        },
        objB = {
            cool: true,
            rich: "very",
            pets: null
        }, 
        expected = {
            cool: true,
            interesting: true,
            rich: "very",
            pets: null,
            age: 5
        },
        result = mediamanager.external.util.extend(objA, objB);

        chai.expect( result ).to.not.equal( objA ); // make sure extended object is a new one.
        chai.expect( result ).to.not.equal( expected );
        chai.expect( result ).to.deep.equal( expected );
    });
});
