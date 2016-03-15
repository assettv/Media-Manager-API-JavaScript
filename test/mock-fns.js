/*!
 * Define any mock functions or 
 * variables for the global mediamanager
 * object, used by the external
 * api library.
 */

var R = require("ramda");
require("../mediamanager-external-library.js");

// DEFINE IF NOT EXISTENT
mediamanager = global.mediamanager != null ? mediamanager: {};

/**
 * Variables used for mock 
 * functions. 
 * Good for testing purposes. 
 * Works like a test config.
 *
 * @type {object}
 */
mockVars = {
    template: "55cdea6f140ba095488b4581",
    video: "55e5c930150ba085738b456b"
};

/**
* Set the shortname for a client.
*
* @param {string} client Shortname for client.
* @return {undefined}
*/
mediamanager.client = function (client) {
    this.sn = client;
};

/**
 * Mock the request
 * function for testing purposes.
 * Immitates a GET request.
 *
 * Just passes response data
 * to the onComplete function.
 *
 * @param {string} url URL for get request.
 * @param {function} onComplete Callback function to execute when request succeeds.
 * @param {object} params GET Parameters to pass to the given URL.
 * @return {undefined} Returns nothing
 */
mediamanager.external.util.request = function (url, onComplete, params) {

    var baseURL = mediamanager.external.util.templateReplace(mediamanager.external.baseURL, {
        shortname: mediamanager.external.client()
    });
    var template = mockVars.template;
    var video = mockVars.video;
    params = params || {};
    var requestUrl = addGetParams(url, params);
    var apis = [];

    // most viewed videos 
    apis.push({
        url: baseURL + "/template/" + template + "/videos/mostviewed",
        response: {}
    });
    // latest videos
    apis.push({
        url: baseURL + "/template/" + template + "/videos/latest",
        response: {}
    });
    // search videos
    apis.push({
        url: baseURL + "/template/" + template + "/video/search?" + mediamanager.external.util.serialize(params),
        response: {}
    });
    // single video 
    apis.push({
        url: baseURL + "/template/" + template + "/video/" + video,
        response: {}
    });
    // videos in template
    apis.push({
        url: baseURL + "/template/" + template + "/videos",
         response: {}
    });
    // audio in templatparams);
    apis.push({
        url: baseURL + "/template/" + template + "/audios",
        response: {}
    });
    // recommended video
    apis.push({
        url: baseURL + "/template/" + template + "/videos/recommend/" + video,
        response: {}
    });

    // find api matching url
    var api = apis.reduce(function (foundApi, api) {
        if (requestUrl === api.url) 
            return api;
        return foundApi;
    }, null);

    if (api !== null)
        onComplete( api.response );
    else
        throw new ReferenceError("mock-fns: request: api not found for " + requestUrl);
};

/******************************************
 * Utility functions for mock-fns, only.
 *****************************************/
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

    var oldParamString = url.split("?")[1] || "";
    var oldParams = parseGetParams( oldParamString );

    var params = R.merge(oldParams, newParams);
    var paramsString = "?" + mediamanager.external.util.serialize( params );

    return url.replace(/\?.*$/, paramsString);
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

    var fnContext = context || null;
    var fnString = fn.toString();
    var fnDepsRegex = /function\s*\(([^\)]+)\)\s*{/;
    var fnDepNames = R.last(fnString.match( fnDepsRegex ) || "").split(/,\s?/);

    var fnDeps = R.map(function (depName) {
        //console.log("NAME: ", "|", depName, "|", depVals[ depName ]);
        return depVals[ depName ];
    }, fnDepNames);

    fn.apply(fnContext, fnDeps);
};
