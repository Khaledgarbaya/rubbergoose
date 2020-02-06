const axios = require("axios")

exports.handler = async function(event, context) {
  const { user } = JSON.parse(event.body)
  const responseBody = {
    query: `
    mutation insertUser($id: String, $email:String, $name:String){
      insert_users(objects: {id: $id, email: $email, name: $name}) {
        affected_rows
      }
    }    
  `,
    variables: {
      id: user.id,
      email: user.email,
      name: user.user_metadata.full_name,
    },
  }
  try {
    const result = await axios.post(
      "https://rubbergoose.herokuapp.com/v1/graphql",
      responseBody,
      {
        headers: {
          "Content-Type": "application/json",
          "x-hasura-admin-secret": process.env.HASURA_SECRET,
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
  const { data } = result.data
  console.log(data)
  return {
    statusCode: 200,
    body: JSON.stringify(responseBody),
  }
}
