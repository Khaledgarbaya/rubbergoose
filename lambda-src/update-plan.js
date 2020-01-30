const statusCode = 200
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
}
const stripe = require("stripe")(process.env.STRIPE_SK)

exports.handler = async function(event, context, callback) {
  if (event.httpMethod !== "POST" || !event.body) {
    callback(null, {
      statusCode,
      headers,
      body: "",
    })
    return
  }
  const data = JSON.parse(event.body)
  if (!data.subscription_id || !data.plan) {
    callback(null, {
      statusCode: 400,
      headers,
      body: JSON.stringify({ status: "Invalid-request" }),
    })
    return
  }
  const subscription = await stripe.subscriptions.retrieve(data.subscription_id)
  console.log(subscription.id)
  stripe.subscriptions.update(subscription.id, {
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
