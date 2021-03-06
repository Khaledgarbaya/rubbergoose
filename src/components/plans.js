import React from "react"
import DashboardNav from "./dashbaord-nav"
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
        const { subscription } = data
        const currentUser = getCurrentUser().user_metadata
        currentUser.subscription_id = subscription.id
        currentUser.current_plan = subscription.plan
        await updateUserInfo(currentUser)
        console.log(getCurrentUser().user_metadata)
      })
      .catch(e => {
        console.error(e)
      })
  }
  return (
    <div className="container mx-auto">
      <DashboardNav />
      <div className="container mx-auto shadow rounded-lg p-8 bg-white">
        <form>
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
          <button
            disabled={initialPlan === currentPlan}
            onClick={handleSubmit}
            className="btn mt-4 block"
          >
            Update Plan
          </button>
        </form>
      </div>
    </div>
  )
}

export default Plans
