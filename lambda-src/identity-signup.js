const fetch = require("node-fetch")

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
}

export async function handler(event, context) {
  const { user } = JSON.parse(event.body)
  console.log(user)
  const responseBodyString = JSON.stringify({
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
  })

  const result = await fetch("https://rubbergoose.herokuapp.com/v1/graphql", {
    method: "POST",
    body: responseBodyString,
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret": process.env.HASURA_SECRET,
    },
  })
  const { errors, data } = await result.json()
  console.log("data====================")
  console.log(data)
  console.log("data====================")
  console.log("errros====================")
  console.log(errors)
  console.log("errros====================")
  return {
    statusCode: 200,
    headers,
  }
  //if (errors) {
  //console.log(errors)
  //return {
  //statusCode: 500,
  //body: "Something is wrong",
  //}
  //} else {
  //return {
  //statusCode: 200,
  //body: JSON.stringify(data),
  //}
  //}
}
