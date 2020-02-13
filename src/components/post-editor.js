import React, { useState } from "react"

import { useMutation } from "@apollo/react-hooks"
import gql from "graphql-tag"
import * as Showdown from "showdown"
import "react-mde/lib/styles/css/react-mde-all.css"
import ReactMde from "react-mde"

const ADD_POST = gql`
  mutation addPost($title: String!, $content: String!) {
    insert_posts(objects: { title: $title, content: $content }) {
      affected_rows
    }
  }
`
const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
})

const PostEditor = () => {
  const [post, setPost] = useState({ title: "", content: "" })
  const [addPost, { data }] = useMutation(ADD_POST)
  const [selectedTab, setSelectedTab] = useState("write")

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        addPost({ variables: post })
        setPost({ title: "", content: "" })
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
          value={post.title}
        />

        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="post-content"
        >
          Content
        </label>
        <div className="container">
          <ReactMde
            value={post.content}
            onChange={value => {
              setPost({
                ...post,
                content: value,
              })
            }}
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
            generateMarkdownPreview={markdown =>
              Promise.resolve(converter.makeHtml(markdown))
            }
          />
        </div>
      </div>
      <button className="btn">Save</button>
    </form>
  )
}

export default PostEditor
