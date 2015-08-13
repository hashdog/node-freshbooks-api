var assert = require('assert'),
    FreshBooks = require('../'),
    config = require(__dirname + '/config.json');

describe('TimeEntry', function() {

    var fb = new FreshBooks(config.API_URL, config.API_TOKEN);

    describe('create()', function() {
        this.timeout(30000);
        it('should create a new time entry w/ matching values', function(done) {
            var data = {
                project_id: config.PROJECT_ID,
                task_id: config.TASK_ID,
                staff_id: 1,
                hours: 3.5,
                notes: 'argh...mi notes!',
                date: '2014-04-01'
            };
            fb.time_entry.create(data, function(err, entry) {
                if (err) {
                    done(err);
                }
                else {
                    assert.ok(entry, 'time_entry.create should return a time entry');
                    assert.equal(data.project_id, entry.project_id, 'time_entry.create should return a time entry w/ matching project_id');
                    assert.equal(data.task_id, entry.task_id, 'time_entry.create should return a time entry w/ matching task_id');
                    assert.equal(data.staff_id, entry.staff_id, 'time_entry.create should return a time entry w/ matching staff_id');
                    assert.equal(data.hours, entry.hours, 'time_entry.create should return a time entry w/ matching hours');
                    assert.equal(data.date, entry.date, 'time_entry.create should return a time entry w/ matching date');
                    assert.equal(data.notes, entry.notes, 'time_entry.create should return a time entry w/ matching notes');
                    done(null);
                }
            });
        });
    });

    describe('update()', function() {
        this.timeout(30000);
        it('should update & return a time entry w/ matching values', function(done) {
            var data = {
                time_entry_id: config.TIME_ENTRY_ID,
                notes: 'hay guyz a note! (' + Date.now() + ')'
            };
            fb.time_entry.update(data, function(err, entry) {
                if(err) {
                    done(err);
                }
                else {
                    assert.ok(entry, 'time_entry.update should return a time entry');
                    assert.equal(data.time_entry_id, entry.time_entry_id, 'time_entry.update should return a time entry w/ matching id');
                    assert.equal(data.notes, entry.notes, 'time_entry.update should return a time entry w/ matching notes');
                    done(null);
                }
            });
        });
    });

    describe('get()', function() {
        it('should get a entry', function(done) {
            fb.time_entry.get(config.TIME_ENTRY_ID, function(err, entry) {
                if (err) {
                    done(err);
                }
                else {
                    assert.ok(entry, 'time_entry.get should return a time entry');
                    assert.equal(config.TIME_ENTRY_ID, entry.time_entry_id, 'time_entry.update should return a time entry w/ matching id');
                    done(null);
                }
            });
        });
    });

    describe('list()', function() {
        it('should list an array of entry', function(done) {
            fb.time_entry.list(function(err, entries) {
                if (err) {
                    done(err);
                }
                else {
                    assert.ok(Array.isArray(entries) && entries.length && entries[0].time_entry_id, 'time_entry.list should return a non-empty time entry array');
                    done(null);
                }
            });
        });
    });

    describe('delete()', function() {
        this.timeout(30000);
        it('should delete an entry w/o error', function(done) {
            var data = {
                project_id: config.PROJECT_ID,
                task_id: config.TASK_ID,
                staff_id: 1,
                hours: 4.5
            };
            fb.time_entry.create(data, function(err, entry) {
                if (err) {
                    done(err);
                }
                else {
                    fb.time_entry.delete(entry.time_entry_id, function(err) {
                        done(err);
                    });
                }
            });
        });
    });
});
