/*
 * Full Documentation:
 * http://developers.freshbooks.com/docs/gateway/
 *
 */

var utils = require('./utils');

function GatewayService(config) {

    if (!(this instanceof GatewayService)) {
        return new GatewayService(config);
    }

    this.config = config;
}

/* http://developers.freshbooks.com/docs/gateway/#gateway.list */
GatewayService.prototype.list = function(cb) { //cb(err, gateway, metaData)

    var options = {
        method: 'gateway.list',
        url: this.config.url,
        token: this.config.token
    };

    var filters;
    if (typeof arguments[1] === 'function') {
        cb = arguments[1];
        filters = arguments[0];
    }

    utils.callAPI(null, options, function(err, result) {

        if (err) {
            cb(err, null);
        }
        else if (!result || !result.gateways) {
            cb(null, null);
        }
        else {
            var meta;
            if (result.gateways.$) {
                meta = {
                    page: result.gateways.$.page,
                    per_page: result.gateways.$.per_page,
                    pages: result.gateways.$.pages,
                    total: result.gateways.$.total
                };
            }
            else {
                meta = {};
            }

            var gateways;
            if (result.gateways.gateway) {
                if (Array.isArray(result.gateways.gateway)) {
                    gateways = result.gateways.gateway;
                }
                else {
                    gateways = [result.gateways.gateway];
                }
            }
            else {
                gateways = [];
            }

            cb(null, gateways, meta);
        }
    });
};

module.exports = GatewayService;
