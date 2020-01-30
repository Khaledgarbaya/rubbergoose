const statusCode = 200
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
}
const stripe = require("stripe")(process.env.STRIPE_SK)

exports.handler = async function(event, context, callback) {
  //-- Parse the body contents into an object.
    //-- We only care to do anything if this is our POST request.
  if (event.httpMethod !== "POST" || !event.body) {
    callback(null, {
      statusCode,
      headers,
      body: "",
    })
  }
  const data = JSON.parse(event.body)
  if(!data.subscription_id || !data.plan) {
    callback(null, {
      400,
      headers,
      body: JSON.stringify({ status: "Invalid-request" }),
    })
    return
  }
  const subscription = await stripe.subscriptions.retrieve(data.subscription_id)
  stripe.subscriptions.update(data.subscription_id, {
    cancel_at_period_end: false,
    items: [
      {
        id: subscription.items.data[0].id,
        plan: data.plan,
      },
    ],
  })
  callback(null, {
    statusCode,
    headers,
    body: JSON.stringify({
      customer: { subscription_id: subscription.id, current_plan: data.plan },
    }),
  })
}
