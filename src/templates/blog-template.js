import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS } from "@contentful/rich-text-types"

const H2 = node => <h2 className="text-xl blog"> {node.content[0].value} </h2>

const BlogTemplate = ({ data }) => {
  const { contentfulPost } = data
  const options = {
    renderNode: {
      [BLOCKS.HEADING_2]: H2,
    },
  }
  return (
    <Layout>
      <div className="p-6 container mx-auto">
        <h2 className="text-2xl bold"> {contentfulPost.title} </h2>
        <div>
          {documentToReactComponents(contentfulPost.content.json, options)}
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query getPost($slug: String!) {
    contentfulPost(slug: { eq: $slug }) {
      title
      slug
      content {
        json
      }
    }
  }
`
export default BlogTemplate
