module.exports = migration => {
  const post = migration.createContentType("post").name("Post")

  post
    .createField("title")
    .name("Title")
    .type("Symbol")
  post
    .createField("slug")
    .name("Slug")
    .type("Symbol")
  post
    .createField("content")
    .name("Content")
    .type("RichText")
  post
    .createField("featureImage")
    .name("Feature Image")
    .type("Link")
    .linkType("Asset")
  post
    .createField("author")
    .name("Author")
    .type("Link")
    .linkType("Entry")
}
