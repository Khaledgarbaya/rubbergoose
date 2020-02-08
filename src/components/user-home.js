import React from "react"
import DashboardNav from "./dashbaord-nav"
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import PostEditor from "./post-editor"
const GET_POSTS = gql`
  query getPosts {
    posts {
      title
      content
      id
      user {
        name
      }
    }
  }
`
const Home = () => {
  const { loading, error, data } = useQuery(GET_POSTS, { pollInterval: 10000 })
  if (loading) return <p>Loading ...</p>
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>
  return (
    <div className="container mx-auto">
      <DashboardNav />
      <div className="w-full shadow rounded-lg p-8 bg-white">
        <PostEditor />
        <ul>
          {data.posts.map(post => (
            <li key={post.id} className="border-b p-8">
              <h3>
                {post.title} by {post.user.name}
              </h3>
              <p>{post.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Home
