freshbooks-api
==============

[![Dependency Status](http://img.shields.io/david/hashdog/node-freshbooks-api.svg?style=flat-square)](https://david-dm.org/hashdog/node-freshbooks-api)

A node.js wrapper for the FreshBooks API.

The author of https://github.com/prattsj/freshbooksjs has not maintain module for a long time (since Apr 2014). Some important fixes has been sent and we need that.


### Installation

    npm install freshbooks-api


### tl;dr

##### Standard resource CRUD methods:

* list(cb)
* get(id, cb)
* create(data, cb)
* update(data, cb)
* delete(id, cb)



##### Examples:

Get all invoices for the user:
```javascript
var FreshBooks = require('freshbooks-api');
var freshbooks = new FreshBooks('USER_URL', 'USER_TOKEN');

freshbooks.estimate.list(function(error, estimates) {

    /* do things */
});

```

Get a *specific* invoice:
```javascript
freshbooks.estimate.get(1, function(error, estimate) {

    /* moar things */
});

```

Update an estimate:
```javascript
freshbooks.estimate.update(data, function(error, estimate) {

    /* aw snap */
});

```

Create a new invoice:
```javascript
freshbooks.estimate.create(data, function(error, estimate) {

    /* here we go */
});

```

Delete an estimate:
```javascript
freshbooks.estimate.delete(1, function(error) {

    /* that's what's up */
});

```


### Authentication
http://developers.freshbooks.com/authentication-2/

Authenticating is easy. Pass in strings with the user's API URL and token when creating a client:
```javascript
var FreshBooks = require('freshbooks-api');
var freshbooks = new FreshBooks('USER_URL', 'USER_TOKEN');
```

Change the token at any time. Note that this will affect & auto-update the token for any "sub-services" (for clients, time entries, etc.) accessed via this client instance:
```javascript
var FreshBooks = require('freshbooks-api');
var freshbooks = new FreshBooks();

/* stuff happens... */

freshbooks.config.token = 'NEW_TOKEN';
freshbooks.config.url = 'NEW_URL';
```


### Running Tests
```
$ mocha

or

$ make test
```


### Complete FreshBooks API Documentation

http://developers.freshbooks.com/



### Roadmap
#### Support planned in future versions for:
* [Receipt Upload/Download](http://developers.freshbooks.com/docs/receipts/)



### License (MIT)

Copyright (c) 2014 Sabra Pratt &lt;pratt.sabra@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
