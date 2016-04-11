
;(function () {

    mediamanager = (typeof mediamanager !== "undefined") ? mediamanager : {};

    /**
     * Set of utility functions
     * used by mediamanager.external.
     *
     * @type {object}
     */
    var util = {
        /**
         * Serialize an object.
         * Encodes for URI.
         *
         * @param {type} obj
         * @returns {String}
         */
        serialize: function (obj) {
            return Object.keys(obj).reduce(function (result, key) {
                var p = obj[key];
                var encodedParam = encodeURIComponent(key) + "=" + encodeURIComponent(p);
                result.push( encodedParam );
                return result;
            }, []).join("&");
        },
        /**
         * Replace {key} patterns in 
         * given string with matching
         * values in given "values" object.
         *
         * @param {string} template Template string.
         * @param {object} values Object of values to insert in template. Values should coerce with strings.
         * @return {string} New string with patterns replaced by values.
         */
        templateReplace: function (string, values) {
            return Object.keys(values).reduce(function (result, key) {
                var value = values[key];
                var regexp = RegExp("{\\s*"+key+"\\s*}", "g");
                return result.replace(regexp, value);
            }, string);
        },
        /**
         * Make an Ajax Request.
         * Uses nanoajax library.
         *
         * @param {type} url
         * @param {type} onComplete
         * @returns {undefined}
         */
        request: function (url, onComplete, params) {

            onComplete = onComplete || function () {
            };
            params = params || {};

            //CALL API
            nanoajax.ajax({
                url: url + "?" + util.serialize(params), 
                method: 'GET'
            }, function onSuccess (code, responseText, request) {

                //PARSE JSON TEXT
                var json = JSON.parse(responseText);

                if (typeof json["error"] !== "undefined") {
                    console.error(json["error"]["message"]);
                    return;
                }

                //CALL ON COMPLETE
                onComplete(json, code, request);
            });
        },
        /**
         * Clone given object.
         * 
         * @param {object} obj Object to clone.
         * @return {object} Cloned version of obj.
         */
        clone: function (obj) {

            var objProto = Object.getPrototypeOf(obj);
            var clone = Object.create(objProto);

            return Object.keys(obj).reduce(function (clone, key) {
                clone[key] = obj[key];
                return clone;
            }, clone);
        },
        /**
         * Extend one object with another.
         * Merges objB into objA. This means
         * any keys shared by objA with objB 
         * will be substituted by those in 
         * objB.
         *
         * @param {object} objA Any object to extend.
         * @param {object} objB Any object to extend with.
         * @return {object} Extended version of objA/
         */
        extend: function (objA, objB) {
            return Object.keys(objB).reduce(function (objA, key) {
                objA[key] = objB[key];
                return objA;
            }, util.clone(objA));
        }
    };

    /**
     * Object for both
     * external template
     * and playlist objects.
     *
     * @type {object}
     */
    var external = {
        /**
         * Template for
         * Base Url used for external 
         * api calls to mediamanager.
         *
         * @type {string}
         */
        baseURL: "https://{shortname}.getmediamanager.com/api/v1/external",
        /**
         * Filters applied globally to each api
         * function. Should be used SPARINGLY
         * and with GREAT CARE!
         *
         * @type {object}
         */
        globalFilters: {},
        /**
         * Return a mediamanager.external object
         * with a new filter added to its
         * globalFilters property.
         *
         * @param {string} key Key of the filter to add.
         * @param {string} value Value of the filter to add.
         * @return {object} A new instance of the mediamanager.external object with different globalFilters.
         */
        addFilter: function (key, value) {

            var filters = util.clone(this.globalFilters);
            filters[ key ] = value;

            var spec = util.clone(this);
            
            var proto = util.clone(Object.getPrototypeOf(this));
            proto.globalFilters = filters;

            return proto.create({
                template: proto.create(templateSpec),
                playlist: proto.create(playlistSpec),
                util: util
            });
        },
        /**
         * Immutable wrapper for
         * Object.create.
         *
         * @param {object} spec An Object to use as specification.
         * @param {object} proto Optional prototype for the instance;
         * @return {object} An immutable object with values of spec and prototype of proto.
         */
        create: function (spec, proto) {
            var created = Object.create(proto || this);
            created = Object.keys(spec).reduce(function (created, key) {
                var value = spec[key];
                created[key] = value;
                return created;
            }, created);
            return Object.freeze(created);
        },
        /**
         * Sets or gets the client
         * shortname.
         * Depends on global mediamanager object.
         *
         * @param {string} sn String to set shortname as.
         * @return {string} Currently set shortname in mediamanager.object.
         */
        client: function (sn) {
            if (sn)
                mediamanager.sn = sn;
            return mediamanager.sn;
        },
        /** 
         * EMBED CONTENT VIA EMBED SCRIPT
         *
         * @deprecated
         * @param {string} externalTemplate External template.
         * @param {element} element Element to embed into.
         * @return {undefined}
         */
        embed: function (externalTemplate, element) {
            if (typeof mediamanager.embed !== "undefined") {
                if (typeof externalTemplate !== "undefined") {
                    mediamanager.embed(element);
                    return;
                }
                console.error("No templateID passed");
                return;
            }
            console.error("Missing Media Manager smart embed!");
        }
    };

    /**
     * The template object
     *
     * @type {object}
     */
    var templateSpec = {
        /**
         * Get most viewed videos
         * @param {type} template
         * @returns {undefined}
         */
        getMostViewedVideos: function (template, onComplete, filters) {

            //IF NO TEMPLATE FOUND.
            if (typeof template === "undefined") {
                console.error("Missing templateID");
                return;
            }

            var baseUrl = util.templateReplace(this.baseURL, {
                shortname: this.client()
            });
            filters = util.extend(this.globalFilters, filters);

            util.request(baseUrl + "/template/" + template + "/videos/mostviewed", onComplete, filters);
        },
        /**
         * Get most viewed videos
         * @param {type} template
         * @returns {undefined}
         */
        getLatestVideos: function (template, onComplete, filters) {

            //IF NO TEMPLATE FOUND.
            if (typeof template === "undefined") {
                console.error("Missing templateID");
                return;
            }

            var url = util.templateReplace(this.baseURL, {
                shortname: this.client()
            });
            filters = util.extend(this.globalFilters, filters);

            util.request(url + "/template/" + template + "/videos/latest", onComplete, filters);
        },
        /**
         * Get a single video.
         * @param string video Video ID of single video to get.
         * @param string template Template ID of template in which video is.
         * @param function onComplete Callback function for when video was retrieved.
         * @return undefined
         */
        getVideo: function (video, template, onComplete, filters) {

            if (typeof template === "undefined") {
                console.error("Missing templateID");
                return;
            }

            if (typeof video === "undefined") {
                console.error("Missing videoID");
                return;
            }

            var baseUrl = util.templateReplace(this.baseURL, {
                shortname: this.client()
            });
            filters = util.extend(this.globalFilters, filters);

            util.request(baseUrl + "/template/" + template + "/video/" + video, onComplete, filters);
        },
        /**
         * Get most viewed videos
         * @param {type} template
         * @returns {undefined}
         */
        searchVideos: function (template, term, onComplete, filters) {

            //IF NO TEMPLATE FOUND.
            if (typeof template === "undefined") {
                console.error("Missing templateID");
                return;
            }

            var baseUrl = util.templateReplace(this.baseURL, {
                shortname: this.client()
            });
            filters = util.extend(this.globalFilters, filters);
            filters = util.extend(filters, {
                term: term
            });

            util.request(baseUrl + "/template/" + template + "/video/search", onComplete, filters);
        },
        /**
         * Get most viewed videos
         * @param {type} template
         * @returns {undefined}
         */
        getVideos: function (template, onComplete, filters) {

            //IF NO TEMPLATE FOUND.
            if (typeof template === "undefined") {
                console.error("Missing templateID");
                return;
            }

            var baseUrl = util.templateReplace(this.baseURL, {
                shortname: this.client()
            });
            filters = util.extend(this.globalFilters, filters);

            util.request(baseUrl + "/template/" + template + "/videos", onComplete, filters);
        },
        /**
         * Get most viewed videos
         * @param {type} template
         * @returns {undefined}
         */
        getAudios: function (template, onComplete, filters) {

            //IF NO TEMPLATE FOUND.
            if (typeof template === "undefined") {
                console.error("Missing templateID");
                return;
            }

            var baseUrl = util.templateReplace(this.baseURL, {
                shortname: this.client()
            });
            filters = util.extend(this.globalFilters, filters);

            util.request(baseUrl + "/template/" + template + "/audios", onComplete, filters);
        },
        /**
         * Get most viewed videos
         * @param {type} template
         * @returns {undefined}
         */
        recommendVideo: function (template, videoid, onComplete, filters) {

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

            var baseUrl = util.templateReplace(this.baseURL, {
                shortname: this.client()
            });
            filters = util.extend(this.globalFilters, filters);

            util.request(baseUrl + "/template/" + template + "/videos/recommend/" + videoid, onComplete, filters);
        }
    };

    /**
     * the playlist object
     * @returns {undefined}
     */
    var playlistSpec = {
        /**
         * Get videos from a playlist.
         *
         * @param {type} template
         * @returns {undefined}
         */
        getVideos: function (playlist, template, onComplete) {

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

            var baseUrl = util.templateReplace(this.baseURL, {
                shortname: this.client()
            });
            var filters = {
                templateID: template
            };

            //CALL API
            util.request(baseUrl + "/playlist/" + playlist + "/videos", onComplete, filters);
        },
        /**
         * Get most viewed videos
         *
         * @param {type} template
         * @returns {undefined}
         */
        getAudios: function (playlist, template, onComplete) {

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

            var baseUrl = util.templateReplace(this.baseURL, {
                shortname: this.client()
            });
            var filters = {
                templateID: template
            };

            //CALL API
            util.request(baseUrl + "/playlist/" + playlist + "/audios", onComplete, filters);
        },
        /**
         * Get most viewed videos
         *
         * @param {type} template
         * @returns {undefined}
         */
        getAudio: function (playlist, template, audioid, onComplete) {

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

            var baseUrl = util.templateReplace(this.baseURL, {
                shortname: this.client()
            });
            var filters = {
                templateID: template
            };

            //CALL API
            util.request(baseUrl + "/playlist/" + playlist + "/audio/" + audioid, onComplete, filters);
        },
        /**
         * Get most viewed videos
         *
         * @param {type} template
         * @returns {undefined}
         */
        getVideo: function (playlist, template, videoid, onComplete) {

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

            var baseUrl = util.templateReplace(this.baseURL, {
                shortname: this.client()
            });
            var filters = {
                templateID: template
            };

            //CALL API
            util.request(baseUrl + "/playlist/" + playlist + "/video/" + videoid, onComplete, filters);
        }
    };

    /**
     * Export object of Media Manager
     * API wrapper objects.
     *
     * @type {object}
     */
    mediamanager.external = external.create({
        template: external.create(templateSpec),
        playlist: external.create(playlistSpec),
        util: util
    });

})();


