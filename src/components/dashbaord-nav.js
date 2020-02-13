import React from "react"
import { Link, navigate } from "gatsby"
import { logout } from "../services/auth"
const DashboardNav = () => (
  <nav className="mb-4 bg-white rounded-sm shadow flex justify-between">
    <div className="flex">
      <Link
        activeClassName="text-purple-700 hover:text-purple-700 border-b border-purple-700"
        className="flex items-center px-2 text-sm"
        to="/user/home"
      >
        <svg
          className="h-4 w-4 mr-1 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g data-name="Layer 2">
            <g data-name="home">
              <path d="M10 14h4v7h-4z" />
              <path d="M20.42 10.18L12.71 2.3a1 1 0 00-1.42 0l-7.71 7.89A2 2 0 003 11.62V20a2 2 0 001.89 2H8v-9a1 1 0 011-1h6a1 1 0 011 1v9h3.11A2 2 0 0021 20v-8.38a2.07 2.07 0 00-.58-1.44z" />
            </g>
          </g>
        </svg>
        Home
      </Link>
      <Link
        activeClassName="text-purple-700 hover:text-purple-700 border-b border-purple-700"
        className="flex text-sm items-center p-4"
        to="/user/dashboard"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 mr-1 fill-current"
          viewBox="0 0 24 24"
        >
          <g data-name="Layer 2">
            <g data-name="settings-2">
              <rect
                width="24"
                height="24"
                transform="rotate(180 12 12)"
                opacity="0"
              />
              <circle cx="12" cy="12" r="1.5" />
              <path d="M20.32 9.37h-1.09c-.14 0-.24-.11-.3-.26a.34.34 0 0 1 0-.37l.81-.74a1.63 1.63 0 0 0 .5-1.18 1.67 1.67 0 0 0-.5-1.19L18.4 4.26a1.67 1.67 0 0 0-2.37 0l-.77.74a.38.38 0 0 1-.41 0 .34.34 0 0 1-.22-.29V3.68A1.68 1.68 0 0 0 13 2h-1.94a1.69 1.69 0 0 0-1.69 1.68v1.09c0 .14-.11.24-.26.3a.34.34 0 0 1-.37 0L8 4.26a1.72 1.72 0 0 0-1.19-.5 1.65 1.65 0 0 0-1.18.5L4.26 5.6a1.67 1.67 0 0 0 0 2.4l.74.74a.38.38 0 0 1 0 .41.34.34 0 0 1-.29.22H3.68A1.68 1.68 0 0 0 2 11.05v1.89a1.69 1.69 0 0 0 1.68 1.69h1.09c.14 0 .24.11.3.26a.34.34 0 0 1 0 .37l-.81.74a1.72 1.72 0 0 0-.5 1.19 1.66 1.66 0 0 0 .5 1.19l1.34 1.36a1.67 1.67 0 0 0 2.37 0l.77-.74a.38.38 0 0 1 .41 0 .34.34 0 0 1 .22.29v1.09A1.68 1.68 0 0 0 11.05 22h1.89a1.69 1.69 0 0 0 1.69-1.68v-1.09c0-.14.11-.24.26-.3a.34.34 0 0 1 .37 0l.76.77a1.72 1.72 0 0 0 1.19.5 1.65 1.65 0 0 0 1.18-.5l1.34-1.34a1.67 1.67 0 0 0 0-2.37l-.73-.73a.34.34 0 0 1 0-.37.34.34 0 0 1 .29-.22h1.09A1.68 1.68 0 0 0 22 13v-1.94a1.69 1.69 0 0 0-1.68-1.69zM12 15.5a3.5 3.5 0 1 1 3.5-3.5 3.5 3.5 0 0 1-3.5 3.5z" />
            </g>
          </g>
        </svg>
        Settings
      </Link>
      <Link
        activeClassName="text-purple-700 hover:text-purple-700 border-b border-purple-700"
        className="flex items-center p-4 text-sm"
        to="/user/plans"
      >
        <svg
          className="w-4 h-4 mr-1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g data-name="Layer 2">
            <g data-name="cube">
              <path d="M11.25 11.83L3 8.36v7.73a1.69 1.69 0 001 1.52L11.19 21h.06zM12 10.5l8.51-3.57a1.62 1.62 0 00-.51-.38l-7.2-3.37a1.87 1.87 0 00-1.6 0L4 6.55a1.62 1.62 0 00-.51.38zM12.75 11.83V21h.05l7.2-3.39a1.69 1.69 0 001-1.51V8.36z" />
            </g>
          </g>
        </svg>
        Plans
      </Link>
      <Link
        activeClassName="text-purple-700 hover:text-purple-700 border-b border-purple-700"
        className="flex items-center text-sm p-4"
        to="/user/billing"
      >
        <svg
          className="w-4 h-4 mr-1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g data-name="Layer 2">
            <path
              d="M19 5H5a3 3 0 00-3 3v8a3 3 0 003 3h14a3 3 0 003-3V8a3 3 0 00-3-3zm-8 10H7a1 1 0 010-2h4a1 1 0 010 2zm6 0h-2a1 1 0 010-2h2a1 1 0 010 2zm3-6H4V8a1 1 0 011-1h14a1 1 0 011 1z"
              data-name="credit-card"
            />
          </g>
        </svg>
        Billing details
      </Link>
    </div>
    <div>
      <button
        onClick={() => {
          logout()
          navigate("/")
        }}
        activeClassName="text-purple-700 hover:text-purple-700 border-b border-purple-700"
        className="flex items-center p-4"
      >
        Logout
      </button>
    </div>
  </nav>
)

export default DashboardNav
