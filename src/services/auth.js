import netlifyIdentity from "netlify-identity-widget"
export const isBrowser = () => typeof window !== "undefined"
export const getUser = () =>
  isBrowser() && window.localStorage.getItem("gatsbyUser")
    ? JSON.parse(window.localStorage.getItem("gatsbyUser"))
    : {}
const setUser = user =>
  window.localStorage.setItem("gatsbyUser", JSON.stringify(user))

export const handleLogin = navigate => {
  netlifyAuth.authenticate(() => {
    setUser(netlifyIdentity.currentUser())
    navigate("/user/dashboard")
  })
}

const netlifyAuth = {
  isAuthenticated: false,
  user: null,
  authenticate(callback) {
    this.isAuthenticated = true
    netlifyIdentity.open()
    netlifyIdentity.on("login", user => {
      this.user = user
      callback(user)
    })
  },
  signout(callback) {
    this.isAuthenticated = false
    netlifyIdentity.logout()
    netlifyIdentity.on("logout", () => {
      this.user = null
      callback()
    })
  },
}

export const isLoggedIn = () => {
  return netlifyAuth.isAuthenticated
}
export const logout = callback => {
  setUser({})
  netlifyAuth.signout(callback)
}

export const getCurrentUser = () => {
  return netlifyIdentity.currentUser()
}

export const updateUserInfo = async user_metadata => {
  await netlifyIdentity.gotrue.currentUser().update({ data: user_metadata })
}
