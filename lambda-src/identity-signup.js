//const fetch = require("node-fetch")
const axios = require("axios")

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
}

exports.handler = async function(event, context) {
  const { user } = JSON.parse(event.body)
  console.log(user)
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
  return {
    statusCode: 200,
    body: "works",
  }
}
