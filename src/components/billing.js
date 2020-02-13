import React from "react"
import DashboardNav from "./dashbaord-nav"
import { StripeProvider } from "react-stripe-elements"
import SubscriptionCheckout from "../components/stripe/subscription-checkout"
const Billing = () => {
  return (
    <div className="container mx-auto">
      <DashboardNav />
      <div className="container mx-auto shadow rounded-lg p-8 bg-white">
        <StripeProvider apiKey={process.env.STRIPE_PK}>
          <SubscriptionCheckout />
        </StripeProvider>
      </div>
    </div>
  )
}

export default Billing
