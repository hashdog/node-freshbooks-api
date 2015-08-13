/*
 * Full Documentation:
 * http://developers.freshbooks.com/docs/system/
 *
 */

var utils = require('./utils');

function SystemService(config) {

    if (!(this instanceof SystemService)) {
        return new SystemService(config);
    }

    this.config = config;
}

/* http://developers.freshbooks.com/docs/system/#system.current */
SystemService.prototype.current = function(cb) { //cb(err, system)

    var options = {
        method: 'system.current',
        url: this.config.url,
        token: this.config.token
    };

    utils.callAPI(null, options, function(err, result) {

        if (err) {
            cb(err, null);
        }
        else if (!result) {
            cb(null, null);
        }
        else {
            cb(null, result.system || null);
        }
    });
};

module.exports = SystemService;
