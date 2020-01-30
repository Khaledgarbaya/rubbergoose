import React from "react"
import { Router } from "@reach/router"
import Dashboard from "../components/dashboard"
import Login from "../components/login"
import Billing from "../components/billing"
import Plans from "../components/plans"
import PrivateRoute from "../components/private-route"
import Layout from "../components/layout"

const UserPage = () => (
  <Layout>
    <Router>
      <PrivateRoute path="/user/dashboard" component={Dashboard} />
      <PrivateRoute path="/user/billing" component={Billing} />
      <PrivateRoute path="/user/plans" component={Plans} />
      <Login path="/user/login" />
    </Router>
  </Layout>
)

export default UserPage
