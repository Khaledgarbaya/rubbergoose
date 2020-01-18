const React = require("react")
const netlifyIdentity = require("netlify-identity-widget")

window.netlifyIdentity = netlifyIdentity
// You must run this once before trying to interact with the widget
netlifyIdentity.init()

exports.wrapRootElement = ({ element }) => {
  return <>{element}</>
}
