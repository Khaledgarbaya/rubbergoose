import React from "react"
import { CardElement } from "react-stripe-elements"

class CardSection extends React.Component {
  render() {
    return (
      <label>
        <span className="mb-6 block">Card details</span>
        <CardElement style={{ base: { fontSize: "18px" } }} />
      </label>
    )
  }
}

export default CardSection
