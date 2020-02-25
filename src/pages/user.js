import React from "react"
import { Router } from "@reach/router"
import Dashboard from "../components/dashboard"
import Login from "../components/login"
import Billing from "../components/billing"
import Plans from "../components/plans"
import UserHome from "../components/user-home"
import ScreenCapture from "../components/screen-capture"
import VideoDisplay from "../components/twilio/video-display"
import PrivateRoute from "../components/private-route"
import Layout from "../components/layout"

const UserPage = () => (
  <Layout>
    <Router>
      <PrivateRoute path="/user/dashboard" component={Dashboard} />
      <PrivateRoute path="/user/billing" component={Billing} />
      <PrivateRoute path="/user/plans" component={Plans} />
      <PrivateRoute path="/user/home" component={UserHome} />
      <PrivateRoute path="/user/screen-capture" component={ScreenCapture} />
      <PrivateRoute path="/user/room/:roomID" component={VideoDisplay} />
      <Login path="/user/login" />
    </Router>
  </Layout>
)

export default UserPage
