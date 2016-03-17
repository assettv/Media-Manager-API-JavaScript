/*!
 * Functions used for testing functions 
 * or writing mock functions.
 */

var R = require("ramda");
var chai = require("chai");
require("../dist/mediamanager-external-library.js");


/**
 * Parse a string of GET parameters 
 * (without a starting "?"), into 
 * an object with name:value pairs
 * of the params.
 *
 * @param {string} paramString String of GET parameters to parse into an object.
 * @return {object} Object of parsed GET params.
 */
parseGetParams = function (paramString) {
    return paramString.split("&").reduce(function (paramObject, pairString) {

        var pair = pairString.split("=");
        var key = pair[0];
        var value = pair[1] || "";

        paramObject[key] = value;

        return paramObject;
    }, {});
};

/**
 * Add given object
 * of get parameters
 * to the given string url
 * without overwriting any 
 * GET parameters in said url.
 *
 * @param {string} url URL to modify -- not mutate!
 * @param {object} newParams Object of new params to add to the URL.
 * @return {string} String of URL with modified GET parameters. Old ones not removed, but maybe overwritten by conflicting new ones.
 */
addGetParams = function (url, newParams) {

    url = url.trim();
    var oldParamString = url.split("?")[1] || "";
    var oldParams = parseGetParams( oldParamString );

    var params = R.reject(R.isEmpty, R.merge(oldParams, newParams));
    var paramsString = Object.keys(params).length == 0 ? "" : "?" + mediamanager.external.util.serialize( params );

    var hasQuestionMark = url.indexOf("?") >= url.length-1;

    url = hasQuestionMark ? url.replace(/\?.*$/, paramsString) : url + paramsString;

    return url;
};

/**
 * Get the parameters of a function.
 *
 * @param {function} fn Function from which to get params.
 * @return {array} Ordered names (by appearance) of the parameters for the given function.
 */
getFnParams = function (fn) {

    var fnString = fn.toString();
    var fnParamRegex = /function[^\(]*\(([^\)]+)\)\s*{/;
    var fnParamNames = R.last(fnString.match( fnParamRegex ) || "").split(/,\s?/);

    return fnParamNames;
};
/**
 * Primitive/basic dependency
 * injection to a given function.
 * Injects the given dependencies
 * into the given function.
 * 
 * @param {function} fn Function to inject into.
 * @param {object} depVals Values to inject with.
 * @param {object} context Optional object for context/scope of the function.
 * @return {undefined}
 */
inject = function (fn, depVals, context) {

    var fnDepNames = getFnParams(fn);
    var fnContext = context || null;
    var fnDeps = R.map(function (depName) {
        return depVals[ depName ];
    }, fnDepNames);

    return fn.apply(fnContext, fnDeps);
};

/**
 * Setup tests for each given api function.
 *
 * @param {object} mmObject The media manager object holding the api functions to test.
 * @param {array} apiTests List of apis to test.
 * @return {undefined}
 */
setupApiTests = function (mmObject, apiTests, defaultTestArgs) {
    apiTests.forEach(function (apiTest) {

        var name = apiTest.name;
        var params = apiTest.params || null;

        describe("#mediamanager.external.template." + name, function () {

            it("Should execute onComplete without error", function () {

                var expected = true;
                var result = false;
                defaultTestArgs.onComplete = function () {
                    result = expected;
                };
                var testFn = mmObject[ name ];
                var testFnArgs = R.merge(defaultTestArgs, apiTest);

                inject(testFn, testFnArgs, mediamanager.external.template); // function, args, context

                chai.expect( result ).to.equal( expected );
            });
        });
    });
};
