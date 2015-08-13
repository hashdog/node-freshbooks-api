/*
 * Full Documentation:
 * http://developers.freshbooks.com/docs/payments/
 *
 */

var utils = require('./utils');

function PaymentService(config) {

    if (!(this instanceof PaymentService)) {
        return new PaymentService(config);
    }

    this.config = config;
}

/* http://developers.freshbooks.com/docs/payments/#payment.list */
PaymentService.prototype.list = function(cb) { //cb(err, payment, metaData)

    var options = {
        method: 'payment.list',
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
        else if (!result || !result.payments) {
            cb(null, null);
        }
        else {
            var meta;
            if (result.payments.$) {
                meta = {
                    page: result.payments.$.page,
                    per_page: result.payments.$.per_page,
                    pages: result.payments.$.pages,
                    total: result.payments.$.total
                };
            }
            else {
                meta = {};
            }

            var payments;
            if (result.payments.payment) {
                if (Array.isArray(result.payments.payment)) {
                    payments = result.payments.payment;
                }
                else {
                    payments = [result.payments.payment];
                }
            }
            else {
                payments = [];
            }

            cb(null, payments, meta);
        }
    });
};

/* http://developers.freshbooks.com/docs/payments/#payment.create */
PaymentService.prototype.create = function(payment, cb) { //cb(err, payment)

    var self = this,
        data = {
            payment: payment
        },
        options = {
            method: 'payment.create',
            url: this.config.url,
            token: this.config.token
        };

    utils.callAPI(data, options, function(err, result) {

        if (err) {
            cb(err, null);
        }
        else if (!result || !result.payment_id) {
            cb(new Error('Server returned no ID for payment create'), null);
        }
        else {
            self.get(result.payment_id, cb);
        }
    });
};

/* http://developers.freshbooks.com/docs/payments/#payment.update */
PaymentService.prototype.update = function(payment, cb) { //cb(err, payment)

    var self = this,
        data = {
            payment: payment
        },
        options = {
            method: 'payment.update',
            url: this.config.url,
            token: this.config.token
        };

    utils.callAPI(data, options, function(err, result) {

        if (err) {
            cb(err, null);
        }
        else {
            self.get(payment.payment_id, cb);
        }
    });
};

/* http://developers.freshbooks.com/docs/payments/#payment.get */
PaymentService.prototype.get = function(id, cb) { //cb(err, payment)

    var data = {
            payment_id: id
        },
        options = {
            method: 'payment.get',
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
            cb(null, result.payment || null);
        }
    });
};

/* http://developers.freshbooks.com/docs/payments/#payment.delete */
PaymentService.prototype.delete = function(id, cb) { //cb(err)

    var data = {
            payment_id: id
        },
        options = {
            method: 'payment.delete',
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

module.exports = PaymentService;
