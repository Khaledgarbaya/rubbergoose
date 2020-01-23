// CheckoutForm.js
import React from "react"
import { injectStripe } from "react-stripe-elements"
import CardSection from "./card-section"
import axios from "axios"
import { getCurrentUser } from "../../services/auth"
class CheckoutForm extends React.Component {
  constructor() {
    super()
    this.state = { plan: "plan_Gb26BxaCDanonu" }
  }
  handlePlanSelection = ev => {
    this.setState({ plan: ev.target.value })
  }
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
          .post("https://rubbergoose.dev/.netlify/functions/create-customer", {
            email: getCurrentUser().email,
            payment_method: result.paymentMethod.id,
            plan: this.state.plan,
          })
          .then(customer => console.log(customer))
      })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <CardSection />
        <div className="mt-6">
          {[
            { id: "plan_Gb26BxaCDanonu", name: "Basic" },
            { id: "plan_Gb26Y1FdKtO1YA", name: "Pro" },
            { id: "plan_Gb27iIYq4Xq6VN", name: "Pro Plus" },
          ].map(plan => {
            return (
              <label key={plan.id} className="p-4">
                {plan.name}{" "}
                <input
                  onSelect={this.handlePlanSelection}
                  defaultChecked={this.state.plan === plan.id}
                  name="plan"
                  type="radio"
                  value={plan.id}
                />
              </label>
            )
          })}
        </div>
        <button className="btn mt-4 block">Subscribe</button>
      </form>
    )
  }
}

export default injectStripe(CheckoutForm)
