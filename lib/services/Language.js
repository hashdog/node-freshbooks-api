/*
 * Full Documentation:
 * http://developers.freshbooks.com/docs/languages/
 *
 */

var utils = require('./utils');

function LanguageService(config) {

    if (!(this instanceof LanguageService)) {
        return new LanguageService(config);
    }

    this.config = config;
}

/* http://developers.freshbooks.com/docs/languages/#language.list */
LanguageService.prototype.list = function(cb) { //cb(err, language, metaData)

    var options = {
        method: 'language.list',
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
        else if (!result || !result.languages) {
            cb(null, null);
        }
        else {
            var meta;
            if (result.languages.$) {
                meta = {
                    page: result.languages.$.page,
                    per_page: result.languages.$.per_page,
                    pages: result.languages.$.pages,
                    total: result.languages.$.total
                };
            }
            else {
                meta = {};
            }

            var languages;
            if (result.languages.language) {
                if (Array.isArray(result.languages.language)) {
                    languages = result.languages.language;
                }
                else {
                    languages = [result.languages.language];
                }
            }
            else {
                languages = [];
            }

            cb(null, languages, meta);
        }
    });
};

module.exports = LanguageService;
