/*!
 * Tests for Playlist API functions.
 */

var chai = require("chai");
var R = require("ramda");
require("../dist/mediamanager-external-library.js");
require("./mock-utils.js");
require("./mock-fns.js");

var apiTests = [];

apiTests.push({
    name: "getVideos",
    playlist: mockVars.playlist
});
apiTests.push({
    name: "getAudios",
    playlist: mockVars.playlist
});
apiTests.push({
    name: "getAudio",
    playlist: mockVars.playlist,
    audioid: mockVars.audio
});
apiTests.push({
    name: "getVideo",
    playlist: mockVars.playlist,
    videoid: mockVars.video
});


setupApiTests(mediamanager.external.playlist, apiTests, { 
    template: mockVars.template,
    filters: mockVars.filters,
    playlist: mockVars.playlist
});
