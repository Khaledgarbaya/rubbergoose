import React from "react"
import DashboardNav from "./dashbaord-nav"
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import PostEditor from "./post-editor"
import * as Showdown from "showdown"

const GET_POSTS = gql`
  query getPosts {
    posts(order_by: { created_at: desc }) {
      title
      content
      id
      user {
        name
      }
    }
  }
`
const converter = new Showdown.Converter()
const Home = () => {
  const { loading, error, data } = useQuery(GET_POSTS, { pollInterval: 10000 })
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>
  return (
    <div className="container mx-auto">
      <DashboardNav />
      <div className="w-full shadow rounded-lg p-8 bg-white">
        <PostEditor />
        {loading ? (
          <p>loading...</p>
        ) : (
          <ul>
            {data.posts.map(post => (
              <li key={post.id} className="border-b p-8">
                <h3 className="text-xl mt-3 inline-block">
                  {post.title}
                  <span className="text-xs"> by {post.user.name}</span>
                </h3>
                <div
                  className="text-sm text-gray-700"
                  dangerouslySetInnerHTML={{
                    __html: converter.makeHtml(post.content),
                  }}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Home
