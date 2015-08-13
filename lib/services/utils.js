
var xml2js = require('xml2js'),
    request = require('request'),
    fs = require('fs');

function callAPI(data, options, cb) {

    if (!data) {
        data = {};
    }

    if (!options) {
        options = {};
    }

    data.$ = {
        method: options.method
    };

    var buildOpts = {
        rootName: 'request',
        xmldec: {
            version: '1.0',
            encoding: 'UTF-8'
        }
    };

    var builder = new xml2js.Builder(buildOpts);

    var xmlStr;
    try {
        xmlStr = builder.buildObject(data);
    }
    catch(e) {
        cb(e, null);
        return;
    }
    var reqOpts = {
        url: options.url,
        method: 'POST',
        headers: {
            'Content-Length': xmlStr.length,
            'Authorization': 'Basic ' + new Buffer(options.token + ':X').toString('base64')
        },
        body: xmlStr
    };

    var r = request.post(reqOpts, function(error, res, body) {

        if (error) {
            cb(new Error("FreshBooks Request Error:" + error), null);
        }
        else if (!body) {
            cb(null, null);
        }
        else {
            xml2js.parseString(body, { explicitArray: false }, function(error, result) {

                if (error) {
                    cb(error, null);
                }
                else if (!result || !result.response) {
                    cb(null, null);
                }
                else if (result.response.error) {
                    cb(new Error('FreshBooks Error: ' + result.response.error), null);
                }
                else {
                    cb(null, result.response);
                }
            });
        }
    });
}

exports.callAPI = callAPI;
