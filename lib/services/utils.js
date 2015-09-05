var xml2js = require('xml2js'),
    request = require('request'),
    fs = require('fs');

var fifoQueue = [];
var payloadAway;

function queueCallbackFinished() {
    if (fifoQueue.length) {
        fifoQueue.shift();
    }
    queueProcessNextRequest();
}

function queueProcessNextRequest() {
    if (fifoQueue.length) {
        var next = fifoQueue[0];
        setTimeout(function() {
            payloadAway = false;
            callAPIDirectly(next.data, next.options, next.cb);
            if (!payloadAway) {
                queueCallbackFinished();//something broke, payload not launched
            }
        }, 0);
    }
}

function callAPI(data, options, cb) {
    //make a queue, so that rate limits don't lock us out
    //rate are 15 completed requests per second
    //simultaneous calls to Invoice.create fail with:
    //"Invalid value for field 'number'. Unique value required, value provided was already used."
    //therefore, need to fifoQueue requests
    var queueItem = {
        data: data,
        options: options,
        cb: cb
    };
    fifoQueue.push(queueItem);
    if (fifoQueue.length == 1) {
        queueProcessNextRequest();
    }
}

function callAPIDirectly(data, options, cb) {

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
    catch (e) {
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

    request.post(reqOpts, function(error, res, body) {
        queueCallbackFinished();
        if (error) {
            cb(new Error("FreshBooks Request Error:" + error), null);
        }
        else if (!body) {
            cb(null, null);
        }
        else {
            xml2js.parseString(body, {explicitArray: false}, function(error, result) {

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
    payloadAway = true;
}

exports.callAPI = callAPI;
