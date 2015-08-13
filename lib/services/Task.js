/*
 * Full Documentation:
 * http://developers.freshbooks.com/docs/tasks/
 *
 */

var utils = require('./utils');

function TaskService(config) {

    if (!(this instanceof TaskService)) {
        return new TaskService(config);
    }

    this.config = config;
}

/* http://developers.freshbooks.com/docs/tasks/#task.list */
TaskService.prototype.list = function(cb) { //cb(err, task, metaData)

    var options = {
        method: 'task.list',
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
        else if (!result || !result.tasks) {
            cb(null, null);
        }
        else {
            var meta;
            if (result.tasks.$) {
                meta = {
                    page: result.tasks.$.page,
                    per_page: result.tasks.$.per_page,
                    pages: result.tasks.$.pages,
                    total: result.tasks.$.total
                };
            }
            else {
                meta = {};
            }

            var tasks;
            if (result.tasks.task) {
                if (Array.isArray(result.tasks.task)) {
                    tasks = result.tasks.task;
                }
                else {
                    tasks = [result.tasks.task];
                }
            }
            else {
                tasks = [];
            }

            cb(null, tasks, meta);
        }
    });
};

/* http://developers.freshbooks.com/docs/tasks/#task.create */
TaskService.prototype.create = function(task, cb) { //cb(err, task)

    var self = this,
        data = {
            task: task
        },
        options = {
            method: 'task.create',
            url: this.config.url,
            token: this.config.token
        };

    utils.callAPI(data, options, function(err, result) {

        if (err) {
            cb(err, null);
        }
        else if (!result || !result.task_id) {
            cb(new Error('Server returned no ID for task create'), null);
        }
        else {
            self.get(result.task_id, cb);
        }
    });
};

/* http://developers.freshbooks.com/docs/tasks/#task.update */
TaskService.prototype.update = function(task, cb) { //cb(err, task)

    var self = this,
        data = {
            task: task
        },
        options = {
            method: 'task.update',
            url: this.config.url,
            token: this.config.token
        };

    utils.callAPI(data, options, function(err, result) {

        if (err) {
            cb(err, null);
        }
        else {
            self.get(task.task_id, cb);
        }
    });
};

/* http://developers.freshbooks.com/docs/tasks/#task.get */
TaskService.prototype.get = function(id, cb) { //cb(err, task)

    var data = {
            task_id: id
        },
        options = {
            method: 'task.get',
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
            cb(null, result.task || null);
        }
    });
};

/* http://developers.freshbooks.com/docs/tasks/#task.delete */
TaskService.prototype.delete = function(id, cb) { //cb(err)

    var data = {
            task_id: id
        },
        options = {
            method: 'task.delete',
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

module.exports = TaskService;
