/*
 * Full Documentation:
 * http://developers.freshbooks.com/docs/invoices/
 *
 */

var utils = require('./utils');

function InvoiceService(config) {

    if (!(this instanceof InvoiceService)) {
        return new InvoiceService(config);
    }

    this.config = config;
}

/* http://developers.freshbooks.com/docs/invoices/#invoice.list */
InvoiceService.prototype.list = function(filters, cb) { //cb(err, invoice, metaData)

    var options = {
        method: 'invoice.list',
        url: this.config.url,
        token: this.config.token
    };
    utils.callAPI(filters, options, function(err, result) {

        if (err) {
            cb(err, null);
        }
        else if (!result || !result.invoices) {
            cb(null, null);
        }
        else {
            var meta;
            if (result.invoices.$) {
                meta = {
                    page: result.invoices.$.page,
                    per_page: result.invoices.$.per_page,
                    pages: result.invoices.$.pages,
                    total: result.invoices.$.total
                };
            }
            else {
                meta = {};
            }

            var invoices;
            if (result.invoices.invoice) {
                if (Array.isArray(result.invoices.invoice)) {
                    invoices = result.invoices.invoice;
                }
                else {
                    invoices = [result.invoices.invoice];
                }
            }
            else {
                invoices = [];
            }

            cb(null, invoices, meta);
        }
    });
};

/* http://developers.freshbooks.com/docs/invoices/#invoice.create */
InvoiceService.prototype.create = function(invoice, cb) { //cb(err, invoice)

    var self = this,
        data = {
            invoice: invoice
        },
        options = {
            method: 'invoice.create',
            url: this.config.url,
            token: this.config.token
        };

    utils.callAPI(data, options, function(err, result) {

        if (err) {
            cb(err, null);
        }
        else if (!result || !result.invoice_id) {
            cb(new Error('Server returned no ID for invoice create'), null);
        }
        else {
            self.get(result.invoice_id, cb);
        }
    });
};

/* http://developers.freshbooks.com/docs/invoices/#invoice.update */
InvoiceService.prototype.update = function(invoice, cb) { //cb(err, invoice)

    var self = this,
        data = {
            invoice: invoice
        },
        options = {
            method: 'invoice.update',
            url: this.config.url,
            token: this.config.token
        };

    utils.callAPI(data, options, function(err, result) {

        if (err) {
            cb(err, null);
        }
        else {
            self.get(invoice.invoice_id, cb);
        }
    });
};

/* http://developers.freshbooks.com/docs/invoices/#invoice.lines.add */
InvoiceService.prototype.addLines = function(invoice, cb) { //cb(err, invoice)

    var self = this,
        data = {
            invoice_id: invoice.invoice_id,
            lines: invoice.lines
        },
        options = {
            method: 'invoice.lines.add',
            url: this.config.url,
            token: this.config.token
        };

    utils.callAPI(data, options, function(err, result) {

        if (err) {
            cb(err, null);
        }
        else {
            self.get(invoice.invoice_id, cb);
        }
    });
};

InvoiceService.prototype.updateLines = function(invoice, cb) { //cb(err, invoice)

    var self = this,
        data = {
            invoice_id: invoice.invoice_id,
            lines: invoice.lines
        },
        options = {
            method: 'invoice.lines.update',
            url: this.config.url,
            token: this.config.token
        };

    utils.callAPI(data, options, function(err, result) {

        if (err) {
            cb(err, null);
        }
        else {
            self.get(invoice.invoice_id, cb);
        }
    });
};

InvoiceService.prototype.deleteLines = function(invoice, cb) { //cb(err, invoice)

    var self = this,
        data = {
            invoice_id: invoice.invoice_id,
            line_id: invoice.line_id
        },
        options = {
            method: 'invoice.lines.delete',
            url: this.config.url,
            token: this.config.token
        };

    utils.callAPI(data, options, function(err, result) {

        if (err) {
            cb(err, null);
        }
        else {
            self.get(invoice.invoice_id, cb);
        }
    });
};

/* http://developers.freshbooks.com/docs/invoices/#invoice.get */
InvoiceService.prototype.get = function(id, cb) { //cb(err, invoice)

    var data = {
            invoice_id: id
        },
        options = {
            method: 'invoice.get',
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
            cb(null, result.invoice || null);
        }
    });
};

/* http://developers.freshbooks.com/docs/invoices/#invoice.delete */
InvoiceService.prototype.delete = function(id, cb) { //cb(err)

    var data = {
            invoice_id: id
        },
        options = {
            method: 'invoice.delete',
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

module.exports = InvoiceService;
