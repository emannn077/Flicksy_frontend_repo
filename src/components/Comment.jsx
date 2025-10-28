import Post from "./Post"
import axios from "axios"
import Post from "../components/Post"
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
    const respond = await axios.Post(
      "http://localhost:3001/comment",
      threadForm
    )
    setComment([...comment, respond.data])
    setThreadForm({ username: "", thread: "" })
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
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
            rows="7"
            cols="25"
            onChange={handleChange}
            value={threadForm.thread}
          ></textarea>
        </form>
      </div>
    </>
  )
}

export default Comment
