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
    name: 'Testy-Test'
};

freshbooks.category.create(data, function(error, category) {

    if (error) {
        console.log(error);
    }
    else {
        freshbooks.categories.delete(category.category_id, function(error) {

            if (error) {
                console.log(error);
            }
            else {
                console.log('Category ' + category.name + ' deleted.');
            }
        });
    }
});
