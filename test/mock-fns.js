/*!
 * Define any mock functions or 
 * variables for the global mediamanager
 * object, used by the external
 * api library.
 */

// DEFINE IF NOT EXISTENT
mediamanager = global.mediamanager != null ? mediamanager: {};

/**
* Set the shortname for a client.
*
* @param {string} client Shortname for client.
* @return {undefined}
*/
mediamanager.client = function (client) {
    this.sn = client;
};
