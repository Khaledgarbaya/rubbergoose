const statusCode = 200
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
}
const stripe = require("stripe")(process.env.STRIPE_SK)

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST" || !event.body) {
    return {
      statusCode,
      headers,
      body: "",
    }
  }
  const data = JSON.parse(event.body)
  if (!data.subscription_id || !data.plan) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ status: "Invalid-request" }),
    }
  }
  const subscription = await stripe.subscriptions.retrieve(data.subscription_id)
  stripe.subscriptions.update(subscription.id, {
    cancel_at_period_end: false,
    items: [
      {
        id: subscription.items.data[0].id,
        plan: data.plan,
      },
    ],
  })
  return {
    statusCode,
    headers,
    body: JSON.stringify({
      subscription: { id: subscription.id, plan: data.plan },
    }),
  }
}
