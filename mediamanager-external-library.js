var mediamanager = (typeof mediamanager !== "undefined") ? mediamanager : {};

mediamanager.external = new function () {

    //THE BASE URL
    var baseURL = "http://{shortname}.dev.mediamanager.io/api/v1/external";

    //GLOBAL PARAMS TO BE PASSED TO ALL API CALLS.
    var globalParams = {};

    /**
     * Set the client.
     * @param {type} client
     * @returns {undefined}
     */
    this.client = function (client) {
        mediamanager.client = client;
        //SETUP BASE URL
        baseURL = parseBaseURL();
    };

    /**
     * Add a filter to be passed to API calls.
     * @param {type} filterName
     * @param {type} filterValue
     * @returns {undefined}
     */
    this.addFilter = function (filterName, filterValue) {
        globalParams[filterName] = filterValue;
    };

    /**
     * Embed content via embed script. Requires Media Manager embed.
     * @param {type} element
     * @returns {undefined}
     */
    this.embed = function (externalTemplate, element) {
        if (typeof mediamanager.embed !== "undefined") {
            if (typeof externalTemplate !== "undefined") {
                mediamanager.embed(element);
                ping(externalTemplate, mediamanager.id);
                return;
            }
            console.error("No templateID passed");
            return;
        }
        console.error("Missing Media Manager smart embed!");
    };

    //SEND PING REQUEST TO RECORD ANALYTICS FOR EXTERNAL TEMPLATE.
    ping = function (template, mediaid) {
        var url = this.parseBaseURL().replace("/external", "");
        request(url + "/ajax/embed/video/" + mediaid + "?external_template=" + template);
    };

    /**
     * Serialize an object
     * @param {type} obj
     * @returns {String}
     */
    serialize = function (obj) {
        var str = [];
        for (var p in obj)
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
        return str.join("&");
    };

    /**
     * Parse the base URL to get a url based on shortname.
     * @returns {unresolved}
     */
    parseBaseURL = function () {
        if (typeof mediamanager.sn !== "undefined") {
            return baseURL.replace("{shortname}", mediamanager.sn);
        }
        console.error("Missing client shortname");
    };

    /**
     * Make the Ajax Request.
     * @param {type} url
     * @param {type} onComplete
     * @returns {undefined}]
     */
    request = function (url, onComplete) {

        onComplete = onComplete || function () {
        };

        //CALL API
        nanoajax.ajax({url: url + "?" + serialize(globalParams), method: 'GET'}, function (code, responseText, request) {

            //PARSE JSON TEXT
            var json = JSON.parse(responseText);

            if (typeof json["error"] !== "undefined") {
                console.error(json["error"]["message"]);
                return;
            }

            //CALL ON COMPLETE
            onComplete(json, code, request);
        });
    };

    /**
     * The template object
     * @returns {undefined}
     */
    this.template = new function () {

        /**
         * Get most viewed videos
         * @param {type} template
         * @returns {undefined}
         */
        this.getMostViewedVideos = function (template, onComplete) {

            //IF NO TEMPLATE FOUND.
            if (typeof template === "undefined") {
                console.error("Missing templateID");
                return;
            }

            request(baseURL + "/template/" + template + "/videos/mostviewed", onComplete);
        };

        /**
         * Get most viewed videos
         * @param {type} template
         * @returns {undefined}
         */
        this.getVideos = function (template, onComplete) {

            //IF NO TEMPLATE FOUND.
            if (typeof template === "undefined") {
                console.error("Missing templateID");
                return;
            }

            request(baseURL + "/template/" + template + "/videos/latest", onComplete);
        };

        /**
         * Get most viewed videos
         * @param {type} template
         * @returns {undefined}
         */
        this.searchVideos = function (template, term, onComplete) {

            //IF NO TEMPLATE FOUND.
            if (typeof template === "undefined") {
                console.error("Missing templateID");
                return;
            }
            request(baseURL + "/template/" + template + "/video/search?term=" + term, onComplete);
        };

        /**
         * Get most viewed videos
         * @param {type} template
         * @returns {undefined}
         */
        this.getVideos = function (template, onComplete) {

            //IF NO TEMPLATE FOUND.
            if (typeof template === "undefined") {
                console.error("Missing templateID");
                return;
            }
            request(baseURL + "/template/" + template + "/videos", onComplete);
        };

        /**
         * Get most viewed videos
         * @param {type} template
         * @returns {undefined}
         */
        this.getAudios = function (template, onComplete) {

            //IF NO TEMPLATE FOUND.
            if (typeof template === "undefined") {
                console.error("Missing templateID");
                return;
            }
            request(baseURL + "/template/" + template + "/audios", onComplete);
        };

        /**
         * Get most viewed videos
         * @param {type} template
         * @returns {undefined}
         */
        this.recommendVideo = function (template, videoid, onComplete) {

            //IF NO TEMPLATE FOUND.
            if (typeof template === "undefined") {
                console.error("Missing templateID");
                return;
            }

            //IF NO TEMPLATE FOUND.
            if (typeof videoid === "undefined") {
                console.error("Missing videoid");
                return;
            }

            request(baseURL + "/template/" + template + "/videos/recommend/" + videoid, onComplete);
        };
    };

    /**
     * the playlist object
     * @returns {undefined}
     */
    this.playlist = new function () {

        /**
         * Get most viewed videos
         * @param {type} template
         * @returns {undefined}
         */
        this.getVideos = function (playlist, template, onComplete) {

            //IF NO TEMPLATE FOUND.
            if (typeof template === "undefined") {
                console.error("Missing templateID");
                return;
            }

            //IF NO TEMPLATE FOUND.
            if (typeof playlist === "undefined") {
                console.error("Missing playlistID");
                return;
            }

            //ADD TEMPLATE ID AS FILTER
            mediamanager.external.addFilter("templateID", template);

            //CALL API
            request(baseURL + "/playlist/" + playlist + "/videos", onComplete);
        };

        /**
         * Get most viewed videos
         * @param {type} template
         * @returns {undefined}
         */
        this.getAudios = function (playlist, template, onComplete) {

            //IF NO TEMPLATE FOUND.
            if (typeof template === "undefined") {
                console.error("Missing templateID");
                return;
            }

            //IF NO TEMPLATE FOUND.
            if (typeof playlist === "undefined") {
                console.error("Missing playlistID");
                return;
            }

            //ADD TEMPLATE ID AS FILTER
            mediamanager.external.addFilter("templateID", template);

            //CALL API
            request(baseURL + "/playlist/" + playlist + "/audios", onComplete);
        };

        /**
         * Get most viewed videos
         * @param {type} template
         * @returns {undefined}
         */
        this.getVideos = function (playlist, template, onComplete) {

            //IF NO TEMPLATE FOUND.
            if (typeof template === "undefined") {
                console.error("Missing templateID");
                return;
            }

            //IF NO TEMPLATE FOUND.
            if (typeof playlist === "undefined") {
                console.error("Missing playlistID");
                return;
            }

            //ADD TEMPLATE ID AS FILTER
            mediamanager.external.addFilter("templateID", template);

            //CALL API
            request(baseURL + "/playlist/" + playlist + "/videos", onComplete);
        };

        /**
         * Get most viewed videos
         * @param {type} template
         * @returns {undefined}
         */
        this.getAudio = function (playlist, template, audioid, onComplete) {

            //IF NO TEMPLATE FOUND.
            if (typeof template === "undefined") {
                console.error("Missing templateID");
                return;
            }

            //IF NO TEMPLATE FOUND.
            if (typeof playlist === "undefined") {
                console.error("Missing playlistID");
                return;
            }

            //ADD TEMPLATE ID AS FILTER
            mediamanager.external.addFilter("templateID", template);

            //CALL API
            request(baseURL + "/playlist/" + playlist + "/audio/" + audioid, onComplete);
        };

        /**
         * Get most viewed videos
         * @param {type} template
         * @returns {undefined}
         */
        this.getVideo = function (playlist, template, videoid, onComplete) {

            //IF NO TEMPLATE FOUND.
            if (typeof template === "undefined") {
                console.error("Missing templateID");
                return;
            }

            //IF NO TEMPLATE FOUND.
            if (typeof playlist === "undefined") {
                console.error("Missing playlistID");
                return;
            }

            //ADD TEMPLATE ID AS FILTER
            mediamanager.external.addFilter("templateID", template);

            //CALL API
            request(baseURL + "/playlist/" + playlist + "/video/" + videoid, onComplete);
        };
    };
};




