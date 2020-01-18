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

  render() {
    if (isLoggedIn()) {
      navigate(`/user/dashboard`)
    }
    return (
      <div className="container mx-auto max-w-md">
        <h2 className="text-center text-4xl">You must login</h2>
        <button onClick={() => handleLogin(navigate)} className="btn w-full">
          Login
        </button>
      </div>
    )
  }
}
export default Login
