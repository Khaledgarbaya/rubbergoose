const fetch = require("node-fetch")

exports.handler = async (event, context) => {
  const { identity, user } = context.clientContext
  if (user) {
    const userID = user.sub
    return {
      statusCode: 200,
      body: JSON.stringify({
        "X-Hasura-User-Id": userID,
        "X-Hasura-Role": "user",
      }),
    }
  }
  return {
    statusCode: 200,
    body: JSON.stringify({
      "X-Hasura-role": "anonymous",
    }),
  }
}
