/*
 * Full Documentation:
 * http://developers.freshbooks.com/docs/taxes/
 *
 */

var utils = require('./utils');

function TaxService(config) {

    if (!(this instanceof TaxService)) {
        return new TaxService(config);
    }

    this.config = config;
}

/* http://developers.freshbooks.com/docs/taxes/#tax.list */
TaxService.prototype.list = function(cb) { //cb(err, tax, metaData)

    var options = {
        method: 'tax.list',
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
        else if (!result || !result.taxes) {
            cb(null, null);
        }
        else {
            var meta;
            if (result.taxes.$) {
                meta = {
                    page: result.taxes.$.page,
                    per_page: result.taxes.$.per_page,
                    pages: result.taxes.$.pages,
                    total: result.taxes.$.total
                };
            }
            else {
                meta = {};
            }

            var taxes;
            if (result.taxes.tax) {
                if (Array.isArray(result.taxes.tax)) {
                    taxes = result.taxes.tax;
                }
                else {
                    taxes = [result.taxes.tax];
                }
            }
            else {
                taxes = [];
            }

            cb(null, taxes, meta);
        }
    });
};

/* http://developers.freshbooks.com/docs/taxes/#tax.create */
TaxService.prototype.create = function(tax, cb) { //cb(err, tax)

    var self = this,
        data = {
            tax: tax
        },
        options = {
            method: 'tax.create',
            url: this.config.url,
            token: this.config.token
        };

    utils.callAPI(data, options, function(err, result) {

        if (err) {
            cb(err, null);
        }
        else if (!result || !result.tax_id) {
            cb(new Error('Server returned no ID for tax create'), null);
        }
        else {
            self.get(result.tax_id, cb);
        }
    });
};

/* http://developers.freshbooks.com/docs/taxes/#tax.update */
TaxService.prototype.update = function(tax, cb) { //cb(err, tax)

    var self = this,
        data = {
            tax: tax
        },
        options = {
            method: 'tax.update',
            url: this.config.url,
            token: this.config.token
        };

    utils.callAPI(data, options, function(err, result) {

        if (err) {
            cb(err, null);
        }
        else {
            self.get(tax.tax_id, cb);
        }
    });
};

/* http://developers.freshbooks.com/docs/taxes/#tax.get */
TaxService.prototype.get = function(id, cb) { //cb(err, tax)

    var data = {
            tax_id: id
        },
        options = {
            method: 'tax.get',
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
            cb(null, result.tax || null);
        }
    });
};

/* http://developers.freshbooks.com/docs/taxes/#tax.delete */
TaxService.prototype.delete = function(id, cb) { //cb(err)

    var data = {
            tax_id: id
        },
        options = {
            method: 'tax.delete',
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

module.exports = TaxService;
