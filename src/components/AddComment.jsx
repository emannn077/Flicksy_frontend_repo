//import Post from "./Post"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useState } from "react"

const AddComment = ({ user, post }) => {
  const navigate = useNavigate()

  const [threadState, setThreadState] = useState({
    thread: "",
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setThreadState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const token = localStorage.getItem("token")
      const response = await axios.post(
        "http://localhost:3001/comment",
        {
          thread: threadState.thread,
          user: user._id,
          post: post._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setThreadState({ thread: "" })
      navigate("/post")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="thread">comment</label>
        <textarea
          name="thread"
          value={threadState.thread}
          onChange={handleChange}
          required
        />
        <button type="submit">Add comment</button>
      </form>
    </div>
  )
}

export default AddComment
