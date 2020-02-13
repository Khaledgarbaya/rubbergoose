import React, { useState } from "react"
import { getCurrentUser, updateUserInfo } from "../services/auth"
import DashboardNav from "./dashbaord-nav"

import { useQuery, useMutation } from "@apollo/react-hooks"
import gql from "graphql-tag"

const GET_USER = gql`
  query getUser {
    users {
      name
      email
    }
  }
`
const UPDATE_USER = gql`
  mutation updateUser($name: String!, $email: String!) {
    update_users(
      where: { email: { _eq: $email } }
      _set: { email: $email, name: $name }
    ) {
      returning {
        email
        name
      }
    }
  }
`
const Dashboard = () => {
  const [userMetadata, setUserMetaData] = useState({ email: "", name: "" })
  const { loading, error, data } = useQuery(GET_USER, {
    onCompleted({ users }) {
      const { email, name } = users[0]
      setUserMetaData({ email, name })
    },
  })

  const [updateUser, { userData }] = useMutation(UPDATE_USER, {
    onCompleted(data) {
      const { returning } = data.update_users
      const { email, name } = returning[0]
      setUserMetaData({ email, name })
    },
  })
  const [errorMessage, setErrorMessage] = useState("")
  if (loading) return <span> loading ... </span>
  return (
    <div className="container mx-auto">
      <DashboardNav />
      <form
        className="container mx-auto shadow rounded-lg p-8 bg-white"
        onSubmit={async e => {
          e.preventDefault()
          setErrorMessage("")
          if (!userMetadata.name || userMetadata.name === "") {
            setErrorMessage("Please Fill in your full name")
            return
          }

          if (!userMetadata.email || userMetadata.email === "") {
            setErrorMessage("Please Fill in your email")
            return
          }
          updateUser({ variables: userMetadata })
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
                name: e.target.value,
              })
            }
            defaultValue={userMetadata.name}
          />
          <p className="text-red-500 text-xs italic">{errorMessage}</p>
        </div>

        <div className="w-full mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="email"
            type="email"
            placeholder="jane@example.com"
            onChange={e =>
              setUserMetaData({
                ...userMetadata,
                email: e.target.value,
              })
            }
            defaultValue={userMetadata.email}
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
