const statusCode = 200
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
}
const { HASURA_SECRET } = process.env

exports.handler = async function(event, context) {
  // Parse and extract webhook data
  const subscriptionEvent = JSON.parse(event.body)
  const { id, customer, items } = subscriptionEvent.data.object
  const { plan } = items.data[0].plan
  //Pull the user id from Hasura
  const responseBody = {
    query: `
  query getUserByCustomerID($customer_id: String!) {
    users(where: {customer_id: {_eq: $customer_id}}) {
      id
    }
  }
  `,
    variables: {
      customer_id: customer,
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
    if (!result.data.data.users.length === 0) {
      return {
        statusCode: 500,
        body: "Something is wrong",
      }
    }
    console.log(result.data.data.users)
    const { identity } = context.clientContext
    const userUrl = `${identity.url}/admin/users/${result.data.data.users[0].id}`
    const userMeta = { app_metadata: { roles: [`${plan.id}`] } }
    const adminAuthHeader = "Bearer " + identity.token
    const updateResult = await axios.put(userUrl, userMeta, {
      headers: { Authorization: adminAuthHeader },
    })
    console.log(updateResult.data)
  } catch (e) {
    console.log(e)
    return {
      statusCode: 500,
      body: "Something is wrong",
    }
  }

  return {
    statusCode,
    headers,
    body: JSON.stringify({ message: "works" }),
  }
}
