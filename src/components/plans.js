import React from "react"
import DashboardNav from "./dashbaord-nav"
import { Elements, StripeProvider } from "react-stripe-elements"
import CheckoutForm from "../components/stripe/checkout-form"
import SubscriptionCheckout from "../components/stripe/subscription-checkout"
import { useState } from "react"
import { getCurrentUser, updateUserInfo } from "../services/auth"
import axios from "axios"
const Plans = () => {
  const initialPlan =
    getCurrentUser().user_metadata.current_plan || "plan_Gb26BxaCDanonu"
  const [currentPlan, setCurrentPlan] = useState(initialPlan)

  const handlePlanSelection = e => {
    setCurrentPlan(e.target.value)
  }
  const handleSubmit = e => {
    e.preventDefault()
    axios
      .post(`${process.env.LAMBDA_ENDPOINT}/update-plan`, {
        subscription_id: getCurrentUser().user_metadata.subscription_id,
        plan: currentPlan,
      })
      .then(async ({ data }) => {
        // Attach Customer id to authenticated authenticated user
        const { subscription_id, current_plan } = data
        const currentUser = getCurrentUser().user_metadata
        currentUser.subscription_id = subscription_id
        currentUser.current_plan = current_plan
        await updateUserInfo(currentUser)
        console.log(getCurrentUser().user_metadata)
      })
  }
  return (
    <div className="container mx-auto max-w-md">
      <DashboardNav />
      <div className="w-full max-w-lg shadow rounded-lg p-8 bg-white">
        <form onSubmit={handleSubmit}>
          <h2>Plans Details</h2>
          <p className="text-sm text-gray-600">
            You can update your plan at any time
          </p>
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
                    onChange={handlePlanSelection}
                    defaultChecked={currentPlan === plan.id}
                    name="plan"
                    type="radio"
                    value={plan.id}
                  />
                </label>
              )
            })}
          </div>
          <button type="submit" className="btn mt-4 block">
            Update Plan
          </button>
        </form>
      </div>
    </div>
  )
}

export default Plans
