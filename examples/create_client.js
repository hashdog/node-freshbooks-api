/*
 *
 * This requires your "API URL" and "Authentication Token".
 * To get these variables, open FreshBooks and go to
 * My Account > FreshBooks API.
 *
 */

var FreshBooks = require('../'),
    apiUrl = "YOUR_URL",
    apiToken = "YOUR_TOKEN";

var freshbooks = new FreshBooks(apiUrl, apiToken);

var data = {
    email: 'test@testaddy.com',
    contacts: {
        contact: [
            {
                email: 'another.test@testaddy.com'
            }
        ]
    }
};

freshbooks.client.create(data, function(error, client) {
    if (error) console.log(error);
    if (client) console.log(client);
});
