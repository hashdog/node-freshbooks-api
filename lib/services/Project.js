/*
 * Full Documentation:
 * http://developers.freshbooks.com/docs/projects/
 *
 */

var utils = require('./utils');

function ProjectService(config) {

    if (!(this instanceof ProjectService)) {
        return new ProjectService(config);
    }

    this.config = config;
}

/* http://developers.freshbooks.com/docs/projects/#project.list */
ProjectService.prototype.list = function(cb) { //cb(err, project, metaData)

    var options = {
        method: 'project.list',
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
        else if (!result || !result.projects) {
            cb(null, null);
        }
        else {
            var meta;
            if (result.projects.$) {
                meta = {
                    page: result.projects.$.page,
                    per_page: result.projects.$.per_page,
                    pages: result.projects.$.pages,
                    total: result.projects.$.total
                };
            }
            else {
                meta = {};
            }

            var projects;
            if (result.projects.project) {
                if (Array.isArray(result.projects.project)) {
                    projects = result.projects.project;
                }
                else {
                    projects = [result.projects.project];
                }
            }
            else {
                projects = [];
            }
            
            cb(null, projects, meta);
        }
    });
};

/* http://developers.freshbooks.com/docs/projects/#project.create */
ProjectService.prototype.create = function(project, cb) { //cb(err, project)

    var self = this,
        data = {
            project: project
        },
        options = {
            method: 'project.create',
            url: this.config.url,
            token: this.config.token
        };

    utils.callAPI(data, options, function(err, result) {

        if (err) {
            cb(err, null);
        }
        else if (!result || !result.project_id) {
            cb(new Error('Server returned no ID for project create'), null);
        }
        else {
            self.get(result.project_id, cb);
        }
    });
};

/* http://developers.freshbooks.com/docs/projects/#project.update */
ProjectService.prototype.update = function(project, cb) { //cb(err, project)

    var self = this,
        data = {
            project: project
        },
        options = {
            method: 'project.update',
            url: this.config.url,
            token: this.config.token
        };

    utils.callAPI(data, options, function(err, result) {

        if (err) {
            cb(err, null);
        }
        else {
            self.get(project.project_id, cb);
        }
    });
};

/* http://developers.freshbooks.com/docs/projects/#project.get */
ProjectService.prototype.get = function(id, cb) { //cb(err, project)

    var data = {
            project_id: id
        },
        options = {
            method: 'project.get',
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
            cb(null, result.project || null);
        }
    });
};

/* http://developers.freshbooks.com/docs/projects/#project.delete */
ProjectService.prototype.delete = function(id, cb) { //cb(err)

    var data = {
            project_id: id
        },
        options = {
            method: 'project.delete',
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

module.exports = ProjectService;
