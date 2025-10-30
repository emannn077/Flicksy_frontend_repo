import { useState } from "react"
import Client from "../services/api"

const AddComment = ({ postId, user, onCommentAdded }) => {
  const [thread, setThread] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!thread.trim()) return // Don't submit empty comments

    try {
      const res = await Client.post("/comment", {
        thread,
        post: postId,
        user: user._id,
      })
      onCommentAdded(res.data)
      setThread("")
    } catch (err) {
      console.error("Error adding comment:", err)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="add-comment-form">
      <textarea
        name="thread"
        rows="3"
        placeholder="Write a comment..."
        value={thread}
        onChange={(e) => setThread(e.target.value)}
        className="add-comment-textarea"
      ></textarea>
      <button
        type="submit"
        disabled={!thread.trim()}
        className="add-comment-btn"
      >
        Post Comment
      </button>
    </form>
  )
}

export default AddComment
