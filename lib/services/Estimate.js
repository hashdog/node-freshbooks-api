/*
 * Full Documentation:
 * http://developers.freshbooks.com/docs/estimate/
 *
 */

var utils = require('./utils');

function EstimateService(config) {

    if (!(this instanceof EstimateService)) {
        return new EstimateService(config);
    }

    this.config = config;
}

/* http://developers.freshbooks.com/docs/estimates/#estimate.list */
EstimateService.prototype.list = function(cb) { //cb(err, estimate, metaData)

    var options = {
        method: 'estimate.list',
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
        else if (!result || !result.estimates) {
            cb(null, null);
        }
        else {
            var meta;
            if (result.estimates.$) {
                meta = {
                    page: result.estimates.$.page,
                    per_page: result.estimates.$.per_page,
                    pages: result.estimates.$.pages,
                    total: result.estimates.$.total
                };
            }
            else {
                meta = {};
            }

            var estimates;
            if (result.estimates.estimate) {
                if (Array.isArray(result.estimates.estimate)) {
                    estimates = result.estimates.estimate;
                }
                else {
                    estimates = [result.estimates.estimate];
                }
            }
            else {
                estimates = [];
            }

            cb(null, estimates, meta);
        }
    });
};

/* http://developers.freshbooks.com/docs/estimates/#estimate.create */
EstimateService.prototype.create = function(estimate, cb) { //cb(err, estimate)

    var self = this,
        data = {
            estimate: estimate
        },
        options = {
            method: 'estimate.create',
            url: this.config.url,
            token: this.config.token
        };

    utils.callAPI(data, options, function(err, result) {

        if (err) {
            cb(err, null);
        }
        else if (!result || !result.estimate_id) {
            cb(new Error('Server returned no ID for estimate create'), null);
        }
        else {
            self.get(result.estimate_id, cb);
        }
    });
};

/* http://developers.freshbooks.com/docs/estimates/#estimate.update */
EstimateService.prototype.update = function(estimate, cb) { //cb(err, estimate)

    var self = this,
        data = {
            estimate: estimate
        },
        options = {
            method: 'estimate.update',
            url: this.config.url,
            token: this.config.token
        };

    utils.callAPI(data, options, function(err, result) {

        if (err) {
            cb(err, null);
        }
        else {
            self.get(estimate.estimate_id, cb);
        }
    });
};

/* http://developers.freshbooks.com/docs/estimates/#estimate.get */
EstimateService.prototype.get = function(id, cb) { //cb(err, estimate)

    var data = {
            estimate_id: id
        },
        options = {
            method: 'estimate.get',
            url: this.config.url,
            token: this.config.token
        };

    utils.callAPI(data, options, function(err, result) {

        if (err) {
            cb(err, null);
        }
        else if (!result) {
            cb(null, null);
        }
        else {
            cb(null, result.estimate || null);
        }
    });
};

/* http://developers.freshbooks.com/docs/estimates/#estimate.delete */
EstimateService.prototype.delete = function(id, cb) { //cb(err)

    var data = {
            estimate_id: id
        },
        options = {
            method: 'estimate.delete',
            url: this.config.url,
            token: this.config.token
        };

    utils.callAPI(data, options, function(err, result) {

        if (err) {
            cb(err);
        }
        else {
            cb(null);
        }
    });
};

module.exports = EstimateService;
