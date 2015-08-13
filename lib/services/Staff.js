/*
 * Full Documentation:
 * http://developers.freshbooks.com/docs/staff_members/
 *
 */

var utils = require('./utils');

function StaffService(config) {

    if (!(this instanceof StaffService)) {
        return new StaffService(config);
    }

    this.config = config;
}

/* http://developers.freshbooks.com/docs/staff_members/#staffMember.list */
StaffService.prototype.list = function(cb) { //cb(err, staffMember, metaData)

    var options = {
        method: 'staff.list',
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
        else if (!result || !result.staff_members) {
            cb(null, null);
        }
        else {
            var meta;
            if (result.staff_members.$) {
                meta = {
                    page: result.staff_members.$.page,
                    per_page: result.staff_members.$.per_page,
                    pages: result.staff_members.$.pages,
                    total: result.staff_members.$.total
                };
            }
            else {
                meta = {};
            }

            var staff;
            if (result.staff_members.member) {
                if (Array.isArray(result.staff_members.member)) {
                    staff = result.staff_members.member;
                }
                else {
                    staff = [result.staff_members.member];
                }
            }
            else {
                staff = [];
            }

            cb(null, staff, meta);
        }
    });
};

/* http://developers.freshbooks.com/docs/staff_members/#staff.get */
StaffService.prototype.get = function(id, cb) { //cb(err, staff)

    var data = {
            staff_id: id
        },
        options = {
            method: 'staff.get',
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
            cb(null, result.staff || null);
        }
    });
};

/* http://developers.freshbooks.com/docs/staff_members/#staff.get */
StaffService.prototype.current = function(cb) { //cb(err, staff)

    var options = {
        method: 'staff.current',
        url: this.config.url,
        token: this.config.token
    };

    utils.callAPI(null, options, function(err, result) {

        if (err) {
            cb(err, null);
        }
        else if (!result) {
            cb(null, null);
        }
        else {
            cb(null, result.staff || null);
        }
    });
};

module.exports = StaffService;
