const axios = require("axios")
const { HASURA_SECRET } = process.env
const stripe = require("stripe")(process.env.STRIPE_SK)

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return callback(null, {
      statusCode: 410,
      body: "Unsupported Request Method",
    })
  }

  const { user } = JSON.parse(event.body)
  const stripeCutomer = await stripe.customers.create({
    name: user.user_metadata.full_name,
    description: user.user_metadata.full_name,
  })
  const responseBody = {
    query: `
  mutation insertUser($id: String, $email:String, $name:String, $customer_id: String){
    insert_users(objects: {id: $id, email: $email, name: $name, customer_id: $customer_id}) {
      affected_rows
    }
  }
  `,
    variables: {
      id: user.id,
      email: user.email,
      name: user.user_metadata.full_name,
      customer_id: stripeCutomer.id,
    },
  }

  try {
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
  } catch (e) {
    console.log(e)

    return {
      statusCode: 500,
      body: "Something is wrong",
    }
  }
  return {
    statusCode: 200,
    body: "{}",
  }
}
