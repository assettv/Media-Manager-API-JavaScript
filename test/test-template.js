/*!
 * Tests for Template API functions.
 */

var chai = require("chai");
var R = require("ramda");
require("../dist/mediamanager-external-library.js");
require("./mock-utils.js");
require("./mock-fns.js");

var apiTests = [];

apiTests.push({
    name: "getMostViewedVideos",
    //params: null, -- these are here for examples
    //onComplete: null -- example 
});
apiTests.push({
    name: "getLatestVideos"
});
apiTests.push({
    name: "getVideo",
    video: mockVars.video
});
apiTests.push({
    name: "searchVideos",
    term: "search-term"
});
apiTests.push({
    name: "getVideos"
});
apiTests.push({
    name: "getAudios"
});
apiTests.push({
    name: "recommendVideo",
    videoid: mockVars.video
});

setupApiTests(mediamanager.external.template, apiTests, { 
    template: mockVars.template,
    filters: mockVars.filters
});
