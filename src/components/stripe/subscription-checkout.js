import React from "react"
import { Elements } from "react-stripe-elements"

import InjectedCheckoutForm from "./checkout-form"

class SubscriptionCheckout extends React.Component {
  render() {
    return (
      <Elements>
        <InjectedCheckoutForm />
      </Elements>
    )
  }
}

export default SubscriptionCheckout
