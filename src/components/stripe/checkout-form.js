// CheckoutForm.js
import React from "react"
import { injectStripe } from "react-stripe-elements"
import CardSection from "./card-section"
import axios from "axios"
import { getCurrentUser, updateUserInfo } from "../../services/auth"
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
          email: getCurrentUser().email,
        },
      })
      .then(result => {
        axios
          .post(`${process.env.LAMBDA_ENDPOINT}/create-customer`, {
            email: getCurrentUser().email,
            subscription_id: getCurrentUser().user_metadata.subscription_id,
            payment_method: result.paymentMethod.id,
            plan: this.state.plan,
          })
          .then(async ({ data }) => {
            // Attach Customer id to authenticated authenticated user
            const { customer } = data
            const currentUser = getCurrentUser().user_metadata
            currentUser.customer_id = customer.id
            currentUser.subscription_id = customer.subscription_id
            await updateUserInfo(currentUser)
            console.log(getCurrentUser().user_metadata)
          })
      })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <CardSection />
        <button className="btn mt-4 block">Update Payment Method</button>
      </form>
    )
  }
}

export default injectStripe(CheckoutForm)
