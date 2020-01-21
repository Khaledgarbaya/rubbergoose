// CheckoutForm.js
import React from "react"
import { injectStripe } from "react-stripe-elements"
import CardSection from "./card-section"
import axios from "axios"
class CheckoutForm extends React.Component {
  handleSubmit = ev => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault()
    const cardElement = this.props.elements.getElement("card")
    this.props.stripe
      .createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: {
          email: "jenny.rosen@example.com",
        },
      })
      .then(function(result) {
        console.log(result.paymentMethod.id)
        axios
          .post("lambda_url", {
            email: "jenny.rosen@example.com",
            payment_method: result.paymentMethod.id,
          })
          .then(customer => console.log(customer))
      })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <CardSection />
        <button class="btn mt-4">Confirm order</button>
      </form>
    )
  }
}

export default injectStripe(CheckoutForm)
