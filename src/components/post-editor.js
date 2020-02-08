import React, { useState } from "react"

import { useMutation } from "@apollo/react-hooks"
import gql from "graphql-tag"

const ADD_POST = gql`
  mutation addPost($title: String!, $content: String!) {
    insert_posts(objects: { title: $title, content: $content }) {
      affected_rows
    }
  }
`
const PostEditor = () => {
  const [post, setPost] = useState({ title: "", content: "" })
  const [addPost, { data }] = useMutation(ADD_POST)
  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        addPost({ variables: post })
      }}
    >
      <div className="w-full mb-6 md:mb-0">
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="post-title"
        >
          Title
        </label>
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          id="post-title"
          type="text"
          placeholder="A new Post"
          onChange={e =>
            setPost({
              ...post,
              title: e.target.value,
            })
          }
          defaultValue={post.title}
        />

        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="post-content"
        >
          Content
        </label>
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          id="post-content"
          type="text"
          placeholder="some content"
          onChange={e =>
            setPost({
              ...post,
              content: e.target.value,
            })
          }
          defaultValue={post.content}
        />
      </div>
      <button className="btn">Save</button>
    </form>
  )
}

export default PostEditor
