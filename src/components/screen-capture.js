import React, { useRef } from "react"
import DashboardNav from "./dashbaord-nav"
import Join from "../components/twilio/join"

let screenTrack = null
const ScreenCapture = ({ location }) => {
  const screenPreview = useRef(null)
  return (
    <div className="container mx-auto">
      <DashboardNav />
      <div className="w-full shadow rounded-lg p-8 bg-white">
        <h2> Screen Capture </h2>
        <Join location={location} />
      </div>
    </div>
  )
}

export default ScreenCapture
