import React from "react"
import Layout from "../components/layout"
import { graphql, Link } from "gatsby"

const BlogPage = ({ data }) => {
  const {
    allContentfulPost: { nodes },
  } = data
  return (
    <Layout>
      <div className="container mx-auto p-8">
        <h1> Blog </h1>
        {nodes.map(node => {
          return (
            <div className="my-2">
              <Link
                className="inline-block hover:text-purple-700 border-b-2 border-purple-700"
                to={`/blog/${node.slug}`}
              >
                <h2 className="text-xl"> {node.title} </h2>
              </Link>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
    allContentfulPost {
      nodes {
        slug
        title
        contentful_id
      }
    }
  }
`
export default BlogPage
