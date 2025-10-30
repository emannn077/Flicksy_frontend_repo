import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Client from "../services/api"
import Feed from "../components/Feed"
import "../../public/stylesheet/design.css"
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
      setLoading(true)
      try {
        const res = await Client.get("/post")
        setPosts(res.data)
        setLoading(false)
      } catch (err) {
        console.error("Error fetching posts:", err)
        setError("Failed to load posts.")
        setLoading(false)
      }
    }

    fetchAllPosts()
  }, [])

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <div className="spinner"></div>
          <p className="loading-text">Loading your feed...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-box">
          <p className="error-text">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="home-page">
      <div className="home-header">
        <div className="home-header-content">
          <div>
            <h1>All Users' Posts</h1>
            <p className="home-header-subtitle">
              {posts.length} {posts.length === 1 ? "post" : "posts"} shared by
              the community
            </p>
          </div>
          <div className="live-indicator">
            <div className="live-dot"></div>
            <span className="live-text">Live Feed</span>
          </div>
        </div>
      </div>

      <div className="home-content">
        {posts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-card">
              <svg
                className="empty-state-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <h3>No posts yet</h3>
              <p>Be the first to share something with the community!</p>
            </div>
          </div>
        ) : (
          <Feed posts={posts} />
        )}
      </div>
    </div>
  )
}

export default HomePage
