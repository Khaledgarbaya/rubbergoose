import React from "react"
import { Link, navigate } from "gatsby"
import { logout } from "../services/auth"
const DashboardNav = () => (
  <nav className="mb-4 flex justify-between">
    <div>
      <Link
        activeClassName="border-b border-purple-700"
        className="p-1"
        to="/user/home"
      >
        Home
      </Link>
      <Link
        activeClassName="border-b border-purple-700"
        className="p-1"
        to="/user/dashboard"
      >
        Settings
      </Link>
      <Link
        activeClassName="border-b border-purple-700"
        className="p-1 ml-2"
        to="/user/plans"
      >
        Plans
      </Link>
      <Link
        activeClassName="border-b border-purple-700"
        className="p-1 ml-2"
        to="/user/billing"
      >
        Billing details
      </Link>
    </div>
    <div>
      <button
        onClick={e => {
          logout()
          navigate("/")
        }}
        className="p-1 ml-2 text-red-500 hover:text-red-700"
      >
        Logout
      </button>
    </div>
  </nav>
)

export default DashboardNav
