import { useState } from "react"
import axios from "axios"
import Client from "../services/api"

const AddComment = ({ postId, user, onCommentAdded }) => {
  const [thread, setThread] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await Client.post("/comment", {
        thread,
        post: postId, // ✅ match schema
        user: user._id, // ✅ match schema
      })
      onCommentAdded(res.data)
      setThread("")
    } catch (err) {
      console.error("Error adding comment:", err)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <textarea
        name="thread"
        rows="3"
        placeholder="Write a comment..."
        value={thread}
        onChange={(e) => setThread(e.target.value)}
        className="border rounded p-2 w-full"
      ></textarea>
      <button
        type="submit"
        className="bg-blue-500 text-white rounded px-3 py-1 hover:bg-blue-600"
      >
        Post Comment
      </button>
    </form>
  )
}

export default AddComment
