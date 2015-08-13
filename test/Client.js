var assert = require('assert'),
    FreshBooks = require('../'),
    config = require(__dirname + '/config.json');

describe('Client', function() {

    var fb = new FreshBooks(config.API_URL, config.API_TOKEN);

    describe('create()', function() {
        this.timeout(30000);
        it('should create a new client w/ matching values', function(done) {
            var data = {
                email: 'email@fakeyfake.com',
                language: 'en',
                contacts: {
                    contact: {
                        email: 'butanother@fakeyfake.com',
                        username: 'user_' + Date.now(),
                        first_name: 'firsty',
                        last_name: 'lasty',
                        phone1: '9876543210'
                    }
                }
            };
            fb.client.create(data, function(err, client) {
                if (err) {
                    done(err);
                }
                else {
                    assert.ok(client, 'client.create should return a client');
                    assert.equal(data.email, client.email, 'client.create should return a client w/ matching email');
                    assert.equal(data.language, client.language, 'client.create should return a client w/ matching language');
                    assert.equal(data.contacts.contact.email, client.contacts.contact.email, 'client.create should return a client w/ matching contact email');
                    assert.equal(data.contacts.contact.username, client.contacts.contact.username, 'client.create should return a client w/ matching contact username');
                    assert.equal(data.contacts.contact.first_name, client.contacts.contact.first_name, 'client.create should return a client w/ matching contact first_name');
                    assert.equal(data.contacts.contact.last_name, client.contacts.contact.last_name, 'client.create should return a client w/ matching contact last_name');
                    assert.equal(data.contacts.contact.phone1, client.contacts.contact.phone1, 'client.create should return a client w/ matching contact phone1');
                    done(null);
                }
            });
        });
    });

    describe('update()', function() {
        this.timeout(30000);
        it('should update & return a client w/ matching values', function(done) {
            var data = {
                client_id: config.CLIENT_ID,
                notes: 'hay guyz a note! (' + Date.now() + ')'
            };
            fb.client.update(data, function(err, client) {
                if(err) {
                    done(err);
                }
                else {
                    assert.ok(client, 'client.update should return a client');
                    assert.equal(data.client_id, client.client_id, 'client.update should return a client w/ matching id');
                    assert.equal(data.notes, client.notes, 'client.update should return a client w/ matching notes');
                    done(null);
                }
            });
        });
    });

    describe('get()', function() {
        it('should get a client', function(done) {
            fb.client.get(config.CLIENT_ID, function(err, client) {
                if (err) {
                    done(err);
                }
                else {
                    assert.ok(client, 'client.get should return a client obj');
                    assert.equal(config.CLIENT_ID, client.client_id, 'client.update should return a client w/ matching id');
                    done(null);
                }
            });
        });
    });

    describe('list()', function() {
        it('should list an array of client', function(done) {
            fb.client.list(function(err, clients) {
                if (err) {
                    done(err);
                }
                else {
                    assert.ok(Array.isArray(clients) && clients.length && clients[0].client_id, 'client.list should return a non-empty client array');
                    done(null);
                }
            });
        });
    });

    describe('delete()', function() {
        this.timeout(30000);
        it('should delete a client w/o error', function(done) {
            var data = {
                email: 'another_email@fakeyfake.com'
            };
            fb.client.create(data, function(err, client) {
                if (err) {
                    done(err);
                }
                else {
                    fb.client.delete(client.client_id, function(err) {
                        done(err);
                    });
                }
            });
        });
    });
});
