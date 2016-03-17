/*!
 * Functions used for testing functions 
 * or writing mock functions.
 */

var R = require("ramda");
require("../mm.external.lib.min.js");

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
