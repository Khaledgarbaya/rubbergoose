const statusCode = 200
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
}

const axios = require("axios")
const { HASURA_SECRET } = process.env
const stripe = require("stripe")(process.env.STRIPE_SK)

exports.handler = async (event, context) => {
  //-- We only care to do anything if this is our POST request.
  if (event.httpMethod !== "POST" || !event.body) {
    return {
      statusCode,
      headers,
      body: "",
    }
  }

  //-- Parse the body contents into an object.
  const data = JSON.parse(event.body)
  //-- Make sure we have all required data. Otherwise, escape.
  if (!data.user_id || !data.payment_method) {
    console.error("Required information is missing.")
    return {
      statusCode,
      headers,
      body: JSON.stringify({ status: "missing-information" }),
    }
  }
  let { user_id, plan = "plan_Gb26BxaCDanonu" } = data
  let subscription = null
  // Get the stripe customer id from out database
  const responseBody = {
    query: `
  query getUserByID($id: String!) {
    users(where: {id: {_eq: $id}}) {
      customer_id
    }
  }
  `,
    variables: {
      id: user_id,
    },
  }
  const result = await axios.post(
    "https://rubbergoose.herokuapp.com/v1/graphql",
    responseBody,
    {
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": HASURA_SECRET,
      },
    }
  )
  if (!result.data.data.users.length === 0) {
    return {
      statusCode: 500,
      body: "Something is wrong",
    }
  }
  console.log(result.data.data.users)
  const { customer_id } = result.data.data.users[0]
  // This creates a new Customer and attaches the PaymentMethod in one API call.
  try {
    subscription = await stripe.subscriptions.create({
      customer: customer_id,
      items: [{ plan }],
      expand: ["latest_invoice.payment_intent"],
    })
  } catch (e) {
    console.error(e)
  }

  return {
    statusCode,
    headers,
    body: JSON.stringify({
      customer: { id: customer_id, subscription_id: subscription.id },
    }),
  }
}
