/*
 * Full Documentation:
 * http://developers.freshbooks.com/docs/categories/
 *
 */

var utils = require('./utils');

function CategoryService(config) {

    if (!(this instanceof CategoryService)) {
        return new CategoryService(config);
    }

    this.config = config;
}

/* http://developers.freshbooks.com/docs/categories/#category.list */
CategoryService.prototype.list = function(cb) { //cb(err, categories, metaData)

    var options = {
        method: 'category.list',
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
        else if (!result || !result.categories) {
            cb(null, null);
        }
        else {
            var meta;
            if (result.categories.$) {
                meta = {
                    page: result.categories.$.page,
                    per_page: result.categories.$.per_page,
                    pages: result.categories.$.pages,
                    total: result.categories.$.total
                };
            }
            else {
                meta = {};
            }

            var categories;
            if (result.categories.category) {
                if (Array.isArray(result.categories.category)) {
                    categories = result.categories.category;
                }
                else {
                    categories = [result.categories.category];
                }
            }
            else {
                categories = [];
            }

            cb(null, categories, meta);
        }
    });
};

/* http://developers.freshbooks.com/docs/categories/#category.create */
CategoryService.prototype.create = function(category, cb) { //cb(err, category)

    var self = this,
        data = {
            category: category
        },
        options = {
            method: 'category.create',
            url: this.config.url,
            token: this.config.token
        };

    utils.callAPI(data, options, function(err, result) {

        if (err) {
            cb(err, null);
        }
        else if (!result || !result.category_id) {
            cb(new Error('Server returned no ID for category create'), null);
        }
        else {
            self.get(result.category_id, cb);
        }
    });
};

/* http://developers.freshbooks.com/docs/categories/#category.update */
CategoryService.prototype.update = function(category, cb) { //cb(err, category)

    var self = this,
        data = {
            category: category
        },
        options = {
            method: 'category.update',
            url: this.config.url,
            token: this.config.token
        };

    utils.callAPI(data, options, function(err, result) {

        if (err) {
            cb(err, null);
        }
        else {
            self.get(category.category_id, cb);
        }
    });
};

/* http://developers.freshbooks.com/docs/categories/#category.get */
CategoryService.prototype.get = function(id, cb) { //cb(err, category)

    var data = {
            category_id: id
        },
        options = {
            method: 'category.get',
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
            cb(null, result.category || null);
        }
    });
};

/* http://developers.freshbooks.com/docs/categories/#category.delete */
CategoryService.prototype.delete = function(id, cb) { //cb(err)

    var data = {
            category_id: id
        },
        options = {
            method: 'category.delete',
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

module.exports = CategoryService;
