var assert = require('assert'),
    FreshBooks = require('../'),
    config = require(__dirname + '/config.json');

describe('Recurring', function() {

    var fb = new FreshBooks(config.API_URL, config.API_TOKEN);

    describe('create()', function() {
        this.timeout(30000);
        it('should create a new recurring invoice w/ matching values', function(done) {
            var data = {
                client_id: config.CLIENT_ID,
                frequency: 'monthly',
                lines: {
                    line: {
                        name: 'Test',
                        unit_cost: '5.00',
                        quantity: '5',
                        type: 'Item'
                    }
                }
            };

            fb.recurring.create(data, function(err, recurring) {
                assert.ok(recurring, 'recurring.create should return a recurring obj');
                assert.equal(data.client_id, recurring.client_id, 'recurring.create should return a recurring w/ matching client_id');
                assert.equal(data.frequency, recurring.frequency, 'recurring.create should return a recurring w/ matching frequency');
                assert.equal(data.lines.line.name, recurring.lines.line.name, 'recurring.create should return a recurring w/ matching line name');
                assert.equal(parseInt(data.lines.line.unit_cost,10), parseInt(recurring.lines.line.unit_cost,10), 'recurring.create should return a recurring w/ matching line unit_cost');
                assert.equal(parseInt(data.lines.line.quantity,10), parseInt(recurring.lines.line.quantity,10), 'recurring.create should return a recurring w/ matching line quantity');
                assert.equal(data.lines.line.type, recurring.lines.line.type, 'recurring.create should return a recurring w/ matching line type');
                done(err);
            });
        });
    });

    describe('update()', function() {
        this.timeout(30000);
        it('should update & return a recurring invoice w/ matching values', function(done) {
            var data = {
                recurring_id: config.RECURRING_ID,
                notes: 'hay guyz a note! (' + Date.now() + ')'
            };
            fb.recurring.update(data, function(err, recurring) {
                assert.ok(recurring, 'recurring.update should return a recurring obj');
                assert.equal(data.recurring_id, recurring.recurring_id, 'recurring.update should return a recurring w/ matching id');
                assert.equal(data.notes, recurring.notes, 'recurring.update should return a recurring w/ matching notes');
                done(err);
            });
        });
    });

    describe('get()', function() {
        it('should get a recurring invoice', function(done) {
            fb.recurring.get(config.RECURRING_ID, function(err, recurring) {
                assert.ok(recurring, 'recurring.get should return a recurring obj');
                assert.equal(config.RECURRING_ID, recurring.recurring_id);
                done(err);
            });
        });
    });

    describe('list()', function() {
        it('should list an array of recurring invoices', function(done) {
            fb.recurring.list(function(err, invoices) {
                assert.ok(Array.isArray(invoices) && invoices.length, 'recurring.list should return a non-empty array');
                done(err);
            });
        });
    });

    describe('delete()', function() {
        this.timeout(30000);
        it('should delete a recurring invoice', function(done) {
            var data = {
                client_id: config.CLIENT_ID,
                frequency: 'monthly',
                notes: 'testing!'
            };
            fb.recurring.create(data, function(err, recurring) {
                fb.recurring.delete(recurring.recurring_id, function(err) {
                    done(err);
                });
            });
        });
    });
});
