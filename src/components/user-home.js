import React from "react"
import DashboardNav from "./dashbaord-nav"
import { useSubscription } from "@apollo/react-hooks"
import gql from "graphql-tag"

const GET_POSTS = gql`
  subscription getPosts {
    posts {
      title
      id
      author {
        id
        first_name
        last_name
      }
    }
  }
`
const Billing = () => {
  const { loading, error, data } = useSubscription(GET_POSTS)
  if (loading) return <p>Loading ...</p>
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>
  return (
    <div className="container mx-auto">
      <DashboardNav />
      <div className="w-full shadow rounded-lg p-8 bg-white">
        <ul>
          {data.posts.map(post => (
            <li className="border-b p-8">
              <h3>
                {post.title} by {post.author.first_name}
              </h3>
              <p>{post.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Billing
