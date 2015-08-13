var FreshBooks = require('../');

/* FreshBooks() initiates your connection to the FreshBooks API.

This requires your "API URL" and "Authentication Token". To get these variables 
open FreshBooks and goto My Account > FreshBooks API. */

var api_url = "https://freshbooksjs.freshbooks.com/api/2.1/xml-in"
  , api_token = "59dbd7310470641ff2332bd016ac2e4e";
  
var freshbooks = new FreshBooks(api_url, api_token)
  , invoice = new freshbooks.Invoice();

/* To list invoices, use the list() method.

The first argument takens an array of any API options you want to pass on and 
the second is a callback to be executed when the method has completed. 
*/
 
invoice.list({client_id: 2},function(err, invoices, options) {
  if(err) { //returns if an error has occured, ie invoice_id doesn't exist.
    console.log(err);
  } else {
    console.log(options);
    invoices.forEach(function(invoice) {
      console.log("Invoice Number:" + invoice.number);
    });
  }
});