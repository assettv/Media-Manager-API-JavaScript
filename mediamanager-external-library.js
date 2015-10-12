var mediamanager = (typeof mediamanager !== "undefined") ? mediamanager : {};

mediamanager.external = new function () {

    //THE BASE URL
    var baseURL = "http://{shortname}.dev.mediamanager.io/api/v1/external";

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
     * Parse the base URL to get a url based on shortname.
     * @returns {unresolved}
     */
    parseBaseURL = function () {
        if (typeof mediamanager.client !== "undefined") {
            return baseURL.replace("{shortname}", mediamanager.client);
        }
        console.error("Missing client shortname");
    };

    request = function (url, onComplete) {

        onComplete = onComplete || function () {
        };

        //CALL API
        nanoajax.ajax({url: url, method: 'GET'}, function (code, responseText, request) {

            //PARSE JSON TEXT
            var json = JSON.parse(responseText);

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
        this.getTemplateMostViewedVideos = function (template, onComplete) {

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
        this.getTemplateLatestVideos = function (template, onComplete) {

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
        this.recommendTemplateVideo = function (template, videoid, onComplete) {

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
};




