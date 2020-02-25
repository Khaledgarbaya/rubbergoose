const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPostTemplate = path.resolve("src/templates/blog-template.js")

  const result = await graphql(`
    {
      allContentfulPost {
        nodes {
          slug
        }
      }
    }
  `)
  if (result.errors) {
    throw result.errors
  }
  result.data.allContentfulPost.nodes.forEach(post => {
    createPage({
      path: `/blog/${post.slug}`,
      component: blogPostTemplate,
      context: {
        slug: post.slug,
      },
    })
  })
}

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions
  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/user/)) {
    page.matchPath = "/user/*"
    // Update the page.
    createPage(page)
  }
}
