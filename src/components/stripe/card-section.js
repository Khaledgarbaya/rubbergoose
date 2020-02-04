import React from "react"
import { CardElement } from "react-stripe-elements"

class CardSection extends React.Component {
  render() {
    return (
      <>
        <span className="mb-6 block">Card details</span>
        <CardElement style={{ base: { fontSize: "18px" } }} />
      </>
    )
  }
}

export default CardSection
