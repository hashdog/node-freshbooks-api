/*
 * Full Documentation:
 * http://developers.freshbooks.com/docs/clients/
 *
 */

var utils = require('./utils');

function ClientService(config) {

    if (!(this instanceof ClientService)) {
        return new ClientService(config);
    }

    this.config = config;
}

/* http://developers.freshbooks.com/docs/clients/#client.list */
ClientService.prototype.list = function(cb) { //cb(err, clients, metaData)

    var options = {
        method: 'client.list',
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
        else if (!result || !result.clients) {
            cb(null, null);
        }
        else {
            var meta;
            if (result.clients.$) {
                meta = {
                    page: result.clients.$.page,
                    per_page: result.clients.$.per_page,
                    pages: result.clients.$.pages,
                    total: result.clients.$.total
                };
            }
            else {
                meta = {};
            }

            var clients;
            if (result.clients.client) {
                if (Array.isArray(result.clients.client)) {
                    clients = result.clients.client;
                }
                else {
                    clients = [result.clients.client];
                }
            }
            else {
                clients = [];
            }

            cb(null, clients, meta);
        }
    });
};

/* http://developers.freshbooks.com/docs/clients/#client.create */
ClientService.prototype.create = function(client, cb) { //cb(err, client)

    var self = this,
        data = {
            client: client
        },
        options = {
            method: 'client.create',
            url: this.config.url,
            token: this.config.token
        };

    utils.callAPI(data, options, function(err, result) {

        if (err) {
            cb(err, null);
        }
        else if (!result || !result.client_id) {
            cb(new Error('Server returned no ID for client create'), null);
        }
        else {
            self.get(result.client_id, cb);
        }
    });
};

/* http://developers.freshbooks.com/docs/clients/#client.update */
ClientService.prototype.update = function(client, cb) { //cb(err, clients)

    var self = this,
        data = {
            client: client
        },
        options = {
            method: 'client.update',
            url: this.config.url,
            token: this.config.token
        };

    utils.callAPI(data, options, function(err, result) {

        if (err) {
            cb(err, null);
        }
        else {
            self.get(client.client_id, cb);
        }
    });
};

/* http://developers.freshbooks.com/docs/clients/#client.get */
ClientService.prototype.get = function(id, cb) { //cb(err, client)

    var data = {
            client_id: id
        },
        options = {
            method: 'client.get',
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
            cb(null, result.client || null);
        }
    });
};

/* http://developers.freshbooks.com/docs/clients/#client.delete */
ClientService.prototype.delete = function(id, cb) { //cb(err)

    var data = {
            client_id: id
        },
        options = {
            method: 'client.delete',
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

module.exports = ClientService;
