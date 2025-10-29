import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Feed from "../components/Feed"

const HomePage = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/")
      return
    }
    const fetchAllPosts = async () => {
      setLoading(true) // start loading
      try {
        const res = await axios.get("http://localhost:3001/post")
        setPosts(res.data)
        setLoading(false) // ✅ stop loading on success
      } catch (err) {
        console.error("Error fetching posts:", err)
        setError("Failed to load posts.")
        setLoading(false) // ✅ stop loading on error
      }
    }

    fetchAllPosts()
  }, [])

  if (loading) return <p>Loading posts...</p>
  if (error) return <p>{error}</p>

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Users’ Posts</h2>
      <Feed posts={posts} /> {/* 👈 Pass posts directly to Feed */}
    </div>
  )
}

export default HomePage
