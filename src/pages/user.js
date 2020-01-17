import React from "react"
import { Router } from "@reach/router"
import Dashboard from "../components/dashboard"
import Billing from "../components/billing"
import Login from "../components/login"
import PrivateRoute from "../components/private-route"
import Layout from "../components/layout"

const UserPage = () => (
  <Layout>
    <Router>
      <PrivateRoute path="/user/dashboard" component={Dashboard} />
      <PrivateRoute path="/user/billing" component={Billing} />
      <Login path="/user/login" />
    </Router>
  </Layout>
)

export default UserPage
