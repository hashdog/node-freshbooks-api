/*
 * Full Documentation:
 * http://developers.freshbooks.com/docs/recurring/
 *
 */

var utils = require('./utils');

function RecurringService(config) {

    if (!(this instanceof RecurringService)) {
        return new RecurringService(config);
    }

    this.config = config;
}

/* http://developers.freshbooks.com/docs/recurring/#recurring.list */
RecurringService.prototype.list = function(cb) { //cb(err, recurring, metaData)

    var options = {
        method: 'recurring.list',
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
        else if (!result || !result.recurrings) {
            cb(null, null);
        }
        else {
            var meta;
            if (result.recurrings.$) {
                meta = {
                    page: result.recurrings.$.page,
                    per_page: result.recurrings.$.per_page,
                    pages: result.recurrings.$.pages,
                    total: result.recurrings.$.total
                };
            }
            else {
                meta = {};
            }

            var recurrings;
            if (result.recurrings.recurring) {
                if (Array.isArray(result.recurrings.recurring)) {
                    recurrings = result.recurrings.recurring;
                }
                else {
                    recurrings = [result.recurrings.recurring];
                }
            }
            else {
                recurrings = [];
            }

            cb(null, recurrings, meta);
        }
    });
};

/* http://developers.freshbooks.com/docs/recurring/#recurring.create */
RecurringService.prototype.create = function(recurring, cb) { //cb(err, recurring)

    var self = this,
        data = {
            recurring: recurring
        },
        options = {
            method: 'recurring.create',
            url: this.config.url,
            token: this.config.token
        };

    utils.callAPI(data, options, function(err, result) {

        if (err) {
            cb(err, null);
        }
        else if (!result || !result.recurring_id) {
            cb(new Error('Server returned no ID for recurring create'), null);
        }
        else {
            self.get(result.recurring_id, cb);
        }
    });
};

/* http://developers.freshbooks.com/docs/recurring/#recurring.update */
RecurringService.prototype.update = function(recurring, cb) { //cb(err, recurring)

    var self = this,
        data = {
            recurring: recurring
        },
        options = {
            method: 'recurring.update',
            url: this.config.url,
            token: this.config.token
        };

    utils.callAPI(data, options, function(err, result) {

        if (err) {
            cb(err, null);
        }
        else {
            self.get(recurring.recurring_id, cb);
        }
    });
};

/* http://developers.freshbooks.com/docs/recurring/#recurring.get */
RecurringService.prototype.get = function(id, cb) { //cb(err, recurring)

    var data = {
            recurring_id: id
        },
        options = {
            method: 'recurring.get',
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
            cb(null, result.recurring || null);
        }
    });
};

/* http://developers.freshbooks.com/docs/recurring/#recurring.delete */
RecurringService.prototype.delete = function(id, cb) { //cb(err)

    var data = {
            recurring_id: id
        },
        options = {
            method: 'recurring.delete',
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

module.exports = RecurringService;
