var FreshBooks = require('../');

/* FreshBooks() initiates your connection to the FreshBooks API.

This requires your "API URL" and "Authentication Token". To get these variables 
open FreshBooks and goto My Account > FreshBooks API. */

var api_url = "https://freshbooksjs.freshbooks.com/api/2.1/xml-in"
  , api_token = "59dbd7310470641ff2332bd016ac2e4e";
  
var freshbooks = new FreshBooks(api_url, api_token)
  , invoice = new freshbooks.Invoice();

/* To get an invoice, use the get() method.

The first argument is the invoice_id (not to be confused with the number) and 
the second is a callback to be executed when the method has completed. 
*/
 
invoice.get(4368, function(err, invoice) {
  if(err) { //returns if an error has occured, ie invoice_id doesn't exist.
    console.log(err);
  } else {
    console.log("Invoice Number:" + invoice.number);
  }
});

/* The first argument is also optional on most methods meaning you can do this:
*/

invoice.invoice_id = 4368;
invoice.get(function(err, invoice) {
  console.log("Invoice Number:" + invoice.number);
});

/* ...Or even this: */

invoice.get(4368, function(err, invoice) {
  invoice.notes = "This is a test note."
  
  invoice.update(function(err, invoice) {
    //Updated!
  });
});