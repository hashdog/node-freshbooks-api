/*
 * Full Documentation:
 * http://developers.freshbooks.com/docs/items/
 *
 */

var utils = require('./utils');

function ItemService(config) {

    if (!(this instanceof ItemService)) {
        return new ItemService(config);
    }

    this.config = config;
}

/* http://developers.freshbooks.com/docs/items/#item.list */
ItemService.prototype.list = function(cb) { //cb(err, item, metaData)

    var options = {
        method: 'item.list',
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
        else if (!result || !result.items) {
            cb(null, null);
        }
        else {
            var meta;
            if (result.items.$) {
                meta = {
                    page: result.items.$.page,
                    per_page: result.items.$.per_page,
                    pages: result.items.$.pages,
                    total: result.items.$.total
                };
            }
            else {
                meta = {};
            }

            var items;
            if (result.items.item) {
                if (Array.isArray(result.items.item)) {
                    items = result.items.item;
                }
                else {
                    items = [result.items.item];
                }
            }
            else {
                items = [];
            }

            cb(null, items, meta);
        }
    });
};

/* http://developers.freshbooks.com/docs/items/#item.create */
ItemService.prototype.create = function(item, cb) { //cb(err, item)

    var self = this,
        data = {
            item: item
        },
        options = {
            method: 'item.create',
            url: this.config.url,
            token: this.config.token
        };

    utils.callAPI(data, options, function(err, result) {

        if (err) {
            cb(err, null);
        }
        else if (!result || !result.item_id) {
            cb(new Error('Server returned no ID for item create'), null);
        }
        else {
            self.get(result.item_id, cb);
        }
    });
};

/* http://developers.freshbooks.com/docs/items/#item.update */
ItemService.prototype.update = function(item, cb) { //cb(err, item)

    var self = this,
        data = {
            item: item
        },
        options = {
            method: 'item.update',
            url: this.config.url,
            token: this.config.token
        };

    utils.callAPI(data, options, function(err, result) {

        if (err) {
            cb(err, null);
        }
        else {
            self.get(item.item_id, cb);
        }
    });
};

/* http://developers.freshbooks.com/docs/items/#item.get */
ItemService.prototype.get = function(id, cb) { //cb(err, item)

    var data = {
            item_id: id
        },
        options = {
            method: 'item.get',
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
            cb(null, result.item || null);
        }
    });
};

/* http://developers.freshbooks.com/docs/items/#item.delete */
ItemService.prototype.delete = function(id, cb) { //cb(err)

    var data = {
            item_id: id
        },
        options = {
            method: 'item.delete',
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

module.exports = ItemService;
