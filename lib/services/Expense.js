/*
 * Full Documentation:
 * http://developers.freshbooks.com/docs/expenses/
 *
 */

var utils = require('./utils');

function ExpenseService(config) {

    if (!(this instanceof ExpenseService)) {
        return new ExpenseService(config);
    }

    this.config = config;
}

/* http://developers.freshbooks.com/docs/expenses/#expense.list */
ExpenseService.prototype.list = function(cb) { //cb(err, expense, metaData)

    var options = {
        method: 'expense.list',
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
        else if (!result || !result.expenses) {
            cb(null, null);
        }
        else {
            var meta;
            if (result.expenses.$) {
                meta = {
                    page: result.expenses.$.page,
                    per_page: result.expenses.$.per_page,
                    pages: result.expenses.$.pages,
                    total: result.expenses.$.total
                };
            }
            else {
                meta = {};
            }

            var expenses;
            if (result.expenses.expense) {
                if (Array.isArray(result.expenses.expense)) {
                    expenses = result.expenses.expense;
                }
                else {
                    expenses = [result.expenses.expense];
                }
            }
            else {
                expenses = [];
            }

            cb(null, expenses, meta);
        }
    });
};

/* http://developers.freshbooks.com/docs/expenses/#expense.create */
ExpenseService.prototype.create = function(expense, cb) { //cb(err, expense)

    var self = this,
        data = {
            expense: expense
        },
        options = {
            method: 'expense.create',
            url: this.config.url,
            token: this.config.token
        };

    utils.callAPI(data, options, function(err, result) {

        if (err) {
            cb(err, null);
        }
        else if (!result || !result.expense_id) {
            cb(new Error('Server returned no ID for expense create'), null);
        }
        else {
            self.get(result.expense_id, cb);
        }
    });
};

/* http://developers.freshbooks.com/docs/expenses/#expense.update */
ExpenseService.prototype.update = function(expense, cb) { //cb(err, expense)

    var self = this,
        data = {
            expense: expense
        },
        options = {
            method: 'expense.update',
            url: this.config.url,
            token: this.config.token
        };

    utils.callAPI(data, options, function(err, result) {

        if (err) {
            cb(err, null);
        }
        else {
            self.get(expense.expense_id, cb);
        }
    });
};

/* http://developers.freshbooks.com/docs/expenses/#expense.get */
ExpenseService.prototype.get = function(id, cb) { //cb(err, expense)

    var data = {
            expense_id: id
        },
        options = {
            method: 'expense.get',
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
            cb(null, result.expense || null);
        }
    });
};

/* http://developers.freshbooks.com/docs/expenses/#expense.delete */
ExpenseService.prototype.delete = function(id, cb) { //cb(err)

    var data = {
            expense_id: id
        },
        options = {
            method: 'expense.delete',
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

module.exports = ExpenseService;
