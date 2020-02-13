module.exports = migration => {
  const author = migration.createContentType("author").name("Author")

  author
    .createField("fullName")
    .name("Full Name")
    .type("Symbol")
  author

  author
    .createField("bio")
    .name("Bio")
    .type("Symbol")
}
