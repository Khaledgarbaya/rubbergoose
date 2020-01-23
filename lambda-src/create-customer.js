const statusCode = 200
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
}

const stripe = require("stripe")(process.env.STRIPE_SK)

exports.handler = async function(event, context, callback) {
  //-- We only care to do anything if this is our POST request.
  if (event.httpMethod !== "POST" || !event.body) {
    callback(null, {
      statusCode,
      headers,
      body: "",
    })
  }

  //-- Parse the body contents into an object.
  const data = JSON.parse(event.body)
  //-- Make sure we have all required data. Otherwise, escape.
  if (!data.email || !data.payment_method) {
    console.error("Required information is missing.")
    callback(null, {
      statusCode,
      headers,
      body: JSON.stringify({ status: "missing-information" }),
    })
    return
  }

  if (!data.subscription_id) {
    // This creates a new Customer and attaches the PaymentMethod in one API call.
    const cus = await stripe.customers.create({
      payment_method: data.payment_method,
      email: data.email,
      invoice_settings: {
        default_payment_method: data.payment_method,
      },
    })
    try {
      const subscription = await stripe.subscriptions.create({
        customer: cusID,
        items: [{ plan: data.plan }],
        expand: ["latest_invoice.payment_intent"],
      })
    } catch (e) {
      console.error(e)
    }
  } else {
    const subscription = await stripe.subscriptions.retrieve(
      data.subscription_id
    )
    stripe.subscriptions.update(data.subscription_id, {
      cancel_at_period_end: false,
      items: [
        {
          id: subscription.items.data[0].id,
          plan: data.plan,
        },
      ],
    })
  }

  callback(null, {
    statusCode,
    headers,
    body: JSON.stringify({
      customer: { id: cusID, subscription_id: subscription.id },
    }),
  })
}
