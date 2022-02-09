require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Rubber Goose`,
    description: `Debug Your brain with Rubber Goose`,
    author: `@khaled_garbaya`,
  },
  plugins: ["gatsby-plugin-postcss"],
}
