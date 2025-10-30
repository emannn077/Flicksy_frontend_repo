import axios from "axios"
import { useState } from "react"
import "../../public/stylesheet/design.css"
const Comment = ({ user, thread }) => {
  return (
    <div className="comment-item">
      <p className="comment-username">{user?.username || "Unknown User"}</p>
      <p className="comment-thread">{thread}</p>
    </div>
  )
}

export default Comment
