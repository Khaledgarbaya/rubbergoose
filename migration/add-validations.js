module.exports = migration => {
  const post = migration.editContentType("post")

  post.editField("author").validations([{ linkContentType: ["author"] }])
}
