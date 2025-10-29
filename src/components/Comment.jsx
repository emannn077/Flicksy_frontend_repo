//import Post from "./Post"
// import axios from "axios"
//import { useState } from "react"
import AddComment from "./AddComment"

const Comment = ({ user, thread, post }) => {
  if (!user) {
    return <p>Please sign in to comment.</p>
  }

  return (
    <div>
      <h5>User: {user.username}</h5>
      <p>Thread: {thread}</p>
      <p>Post: {post}</p>
    </div>
  )
}

export default Comment
