const statusCode = 200;
const headers = {
  "Access-Control-Allow-Origin" : "*",
  "Access-Control-Allow-Headers": "Content-Type"
};
exports.handler = async function(event, context, callback) {
  //-- We only care to do anything if this is our POST request.
  if(event.httpMethod !== 'POST' || !event.body) {
    callback(null, {
      statusCode,
      headers,
      body: ''
    });
  }

    //-- Parse the body contents into an object.
    const data = JSON.parse(event.body);
    //-- Make sure we have all required data. Otherwise, escape.
    if(
      !data.email ||
      !data.payment_method ||
    ) {

      console.error('Required information is missing.');

      callback(null, {
        statusCode,
        headers,
        body: JSON.stringify({status: 'missing-information'})
      });

      return;
    }

  // Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
const stripe = require('stripe')('sk_test_XUeSJEOdMyDuVnLU8ZItdUJn00VJVU9Iy1');

  // This creates a new Customer and attaches the PaymentMethod in one API call.
  const customer = await stripe.customers.create({
    payment_method: data.payment_method,
    email: data.email,
    invoice_settings: {
      default_payment_method: data.payment_method,
    },
  });
  callback(null, {
    statusCode,
    headers,
    body: JSON.stringify({status})
  });
}