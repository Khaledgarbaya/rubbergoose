const React = require("react")
module.exports.onRenderBody = ({ setPostBodyComponents }) => {
  return setPostBodyComponents([
    <script
      id="stripe-js"
      key="gatsby-plugin-stripe"
      src="https://js.stripe.com/v3/"
      async={true}
    />,
  ])
}
