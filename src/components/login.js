import React from "react"
import { navigate } from "gatsby"
import { handleLogin, isLoggedIn } from "../services/auth"
class Login extends React.Component {
  state = {
    username: ``,
    password: ``,
  }
  handleUpdate = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }
  handleSubmit = event => {
    event.preventDefault()
    handleLogin(this.state)
  }
  render() {
    if (isLoggedIn()) {
      navigate(`/user/dashboard`)
    }
    return (
      <div className="container mx-auto max-w-md">
        <h2 className="text-center text-4xl">Log in</h2>
        <form
          method="post"
          className="w-full max-w-lg shadow rounded-lg p-8 bg-white"
          onSubmit={event => {
            this.handleSubmit(event)
            navigate(`/user/dashboard`)
          }}
        >
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Username
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              name="username"
              onChange={this.handleUpdate}
            />
          </label>
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Password
            <input
              type="password"
              name="password"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              onChange={this.handleUpdate}
            />
          </label>
          <input className="btn" type="submit" value="Log In" />
        </form>
      </div>
    )
  }
}
export default Login
