module.exports = migration => {
  const post = migration.editContentType("post")

  post.changeFieldControl("slug", "builtin", "slugEditor")
}
