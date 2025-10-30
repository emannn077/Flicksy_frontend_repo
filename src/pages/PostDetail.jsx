import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import Client from "../services/api"
import CommentSection from "../components/CommentSection"
import "../../public/stylesheet/design.css"

const PostDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        console.log("Fetching post with ID:", id)

        const token = localStorage.getItem("token")

        if (token) {
          const payload = JSON.parse(atob(token.split(".")[1]))
          setUser(payload)
        }

        const res = await Client.get(`/post/${id}`)
        setPost(res.data)
        setLoading(false)
      } catch (err) {
        setError("Error loading post details.")
        setLoading(false)
      }
    }

    fetchPost()
  }, [id])

  // Loading State
  if (loading) {
    return (
      <div className="post-detail-loading">
        <div className="loading-content">
          <div className="spinner"></div>
          <p className="loading-text">Loading post...</p>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="post-detail-error">
        <div className="error-box">
          <p className="error-text">Post not found or invalid ID.</p>
          <Link to="/home" className="post-detail-back-btn">
            ← Back to feed
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="post-detail-page">
      <div className="post-detail-container">
        <div className="post-detail-main">
          <div className="post-detail-card">
            {/* User Info */}
            <div className="post-detail-user">
              <img
                src={
                  post.user_id?.profile_picture
                    ? `http://localhost:3001/${post.user_id.profile_picture}`
                    : "http://localhost:3001/images/default-avatar.png"
                }
                alt="User"
                className="post-detail-avatar"
              />
              <h2 className="post-detail-username">{post.user_id?.username}</h2>
            </div>

            <img
              src={post.image_url}
              alt="Post"
              className="post-detail-image"
            />

            <p className="post-detail-caption">{post.caption}</p>
          </div>
        </div>

        <div className="post-detail-sidebar">
          <CommentSection postId={post._id} user={user} />
        </div>

        <div className="post-detail-back-section">
          <Link to="/home" className="post-detail-back-btn">
            ← Back to feed
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PostDetail
