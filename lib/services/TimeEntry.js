/*
 * Full Documentation:
 * http://developers.freshbooks.com/docs/time-entries/
 *
 */

var utils = require('./utils');

function TimeEntryService(config) {

    if (!(this instanceof TimeEntryService)) {
        return new TimeEntryService(config);
    }

    this.config = config;
}

/* http://developers.freshbooks.com/docs/time-entries/#time_entry.list */
TimeEntryService.prototype.list = function(callback) { //cb(err, timeEntries, metaData)

    var options = {
        method: 'time_entry.list',
        url: this.config.url,
        token: this.config.token
    };

    var filters, cb;
    if (typeof arguments[1] === 'function') {
        cb = arguments[1];
        filters = arguments[0];
    }

    utils.callAPI(filters, options, function(err, result) {

        if (err) {
            cb(err, null);
        }
        else if (!result || !result.time_entries) {
            cb(null, null);
        }
        else {
            var meta;
            if (result.time_entries.$) {
                meta = {
                    page: result.time_entries.$.page,
                    per_page: result.time_entries.$.per_page,
                    pages: result.time_entries.$.pages,
                    total: result.time_entries.$.total
                };
            }
            else {
                meta = {};
            }

            var entries;
            if (result.time_entries.time_entry) {
                if (Array.isArray(result.time_entries.time_entry)) {
                    entries = result.time_entries.time_entry;
                }
                else {
                    entries = [result.time_entries.time_entry];
                }
            }
            else {
                entries = [];
            }

            cb(null, entries, meta);
        }
    });
};

/* http://developers.freshbooks.com/docs/time-entries/#time_entry.create */
TimeEntryService.prototype.create = function(entry, cb) { //cb(err, timeEntry)

    var self = this,
        data = {
            time_entry: entry
        },
        options = {
            method: 'time_entry.create',
            url: this.config.url,
            token: this.config.token
        };

    utils.callAPI(data, options, function(err, result) {

        if (err) {
            cb(err, null);
        }
        else if (!result || !result.time_entry_id) {
            cb(new Error('Server returned no ID for time entry create'), null);
        }
        else {
            self.get(result.time_entry_id, cb);
        }
    });
};

/* http://developers.freshbooks.com/docs/time-entries/#time_entry.update */
TimeEntryService.prototype.update = function(entry, cb) { //cb(err, timeEntry)

    var self = this,
        data = {
            time_entry: entry
        },
        options = {
            method: 'time_entry.update',
            url: this.config.url,
            token: this.config.token
        };

    utils.callAPI(data, options, function(err, result) {

        if (err) {
            cb(err, null);
        }
        else {
            self.get(entry.time_entry_id, cb);
        }
    });
};

/* http://developers.freshbooks.com/docs/time-entries/#time_entry.get */
TimeEntryService.prototype.get = function(id, cb) { //cb(err, timeEntry)

    var data = {
            time_entry_id: id
        },
        options = {
            method: 'time_entry.get',
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
            cb(null, result.time_entry || null);
        }
    });
};

/* http://developers.freshbooks.com/docs/time-entries/#time_entry.delete */
TimeEntryService.prototype.delete = function(id, cb) { //cb(err)

    var data = {
            time_entry_id: id
        },
        options = {
            method: 'time_entry.delete',
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

module.exports = TimeEntryService;
