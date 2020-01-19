import React, { useState } from "react"
import { getCurrentUser, updateUserInfo } from "../services/auth"
import DashboardNav from "./dashbaord-nav"

const Dashboard = () => {
  const [userMetadata, setUserMetaData] = useState(
    getCurrentUser().user_metadata
  )
  const [errorMessage, setErrorMessage] = useState("")
  return (
    <div className="container mx-auto max-w-md">
      <DashboardNav />
      <form
        className="w-full max-w-lg shadow rounded-lg p-8 bg-white"
        onSubmit={async e => {
          e.preventDefault()
          setErrorMessage("")
          if (!userMetadata.full_name || userMetadata.full_name === "") {
            setErrorMessage("Please Fill in your full name")
            return
          }
          await updateUserInfo(userMetadata)
        }}
      >
        <div className="w-full mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="full-name"
          >
            Full Name
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="full-name"
            type="text"
            placeholder="Jane"
            onChange={e =>
              setUserMetaData({
                ...userMetadata,
                full_name: e.target.value,
              })
            }
            defaultValue={userMetadata.full_name}
          />
          <p className="text-red-500 text-xs italic">{errorMessage}</p>
        </div>
        <button className="btn" type="submit">
          Save
        </button>
      </form>
    </div>
  )
}

export default Dashboard
