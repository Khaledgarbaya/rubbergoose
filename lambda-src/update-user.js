const statusCode = 200
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
}

exports.handler = async function(event, context, callback) {
  console.log(event.body)
  return {
    statusCode,
    headers,
    body: JSON.stringify({ message: "works" }),
  }
}
