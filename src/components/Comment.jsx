import Post from "./Post"
import axios from "axios"
import { useState } from "react"

const Comment = () => {
  const [comment, setComment] = useState([])
  const [threadForm, setThreadForm] = useState({
    username: "",
    thread: "",
  })

  const handleChange = (e) => {
    setThreadForm({ ...threadForm, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        alert("You must be logged in to comment!")
        return
      }
      const res = await axios.post(
        "http://localhost:3001/comment",
        threadForm,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      setComment([...comment, res.data])
      setThreadForm({ username: "", thread: "" })
    } catch (err) {
      console.error("Failed to post comment:", err)
    }
  }

  return (
    <>
      <div className="comment-page">
        <form className="comment-form" onSubmit={handleSubmit}>
          <label htmlFor="username">userName</label>
          <input
            type="text"
            name="username"
            onChange={handleChange}
            value={threadForm.username}
          />
          <label htmlFor="thread">comment</label>
          <textarea
            name="thread"
            rows="4"
            cols="17"
            onChange={handleChange}
            value={threadForm.thread}
          ></textarea>
          <button type="submit">Comment</button>
        </form>
      </div>
    </>
  )
}

export default Comment
