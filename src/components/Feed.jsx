import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Client, { BASE_URL } from "../services/api"
import "../../public/stylesheet/camera.css"

const Feed = ({ user }) => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState("")
  const [confirmPost, setConfirmPost] = useState(null)

  const navigate = useNavigate()

  const fetchPosts = async () => {
    setLoading(true)
    try {
      const url = user && user._id ? `/post/user/${user._id}` : `/post`
      const res = await Client.get(url)
      setPosts(res.data)
    } catch (err) {
      console.error("Failed to fetch posts:", err)
      setError(
        err.response?.data?.message || "An error occurred while fetching posts."
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [user?._id])

  const openConfirmPopup = (postId, e) => {
    e.stopPropagation()
    console.log("Opening popup for post:", postId)
    setConfirmPost(postId)
  }

  const handleConfirmDelete = async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        setMessage("Unauthorized. Please log in again.")
        setMessageType("error")
        return
      }

      await Client.delete(`/post/${confirmPost}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      setPosts((prev) => prev.filter((p) => p._id !== confirmPost))
      setMessage(" Post deleted successfully!")
      setMessageType("success")
    } catch (err) {
      console.error("Failed to delete post:", err)
      setMessage(" Could not delete post. Try again.")
      setMessageType("error")
    } finally {
      setConfirmPost(null)
      setTimeout(() => setMessage(""), 2500)
    }
  }

  const handleCancelDelete = () => setConfirmPost(null)

  if (loading)
    return (
      <div className="feed-loading">
        <div className="loading-spinner"></div>
        <p>Loading posts...</p>
      </div>
    )

  if (error)
    return (
      <div className="feed-error">
        <p>{error}</p>
      </div>
    )

  return (
    <div className="feed-container">
      {message && (
        <div
          className={`message-toast ${
            messageType === "success"
              ? "success"
              : messageType === "error"
              ? "error"
              : ""
          }`}
        >
          {message}
        </div>
      )}

      {/*Popup Confirmation */}
      {confirmPost && (
        <div className="popup-overlay">
          <div className="popup-box">
            <p className="popup-message">
              Are you sure you want to delete this post?
            </p>
            <div className="popup-buttons">
              <button onClick={handleCancelDelete} className="popup-btn cancel">
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="popup-btn confirm"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {posts.length === 0 ? (
        <div className="no-posts">
          <div className="no-posts-icon">📷</div>
          <p className="no-posts-text">No posts yet.</p>
          <p className="no-posts-subtext">Start sharing your moments!</p>
        </div>
      ) : (
        <div className="posts-grid">
          {posts.map((post) => (
            <div
              key={post._id}
              className="post-card"
              onClick={() => navigate(`/post/${post._id}`)}
            >
              {!user && post.user_id && (
                <div className="post-header">
                  <img
                    src={
                      post.user_id.profile_picture
                        ? `${BASE_URL}${post.user_id.profile_picture}`
                        : "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                    }
                    alt={post.user_id.username}
                    className="user-avatar"
                  />
                  <span className="post-username">{post.user_id.username}</span>
                </div>
              )}

              <div className="post-image-wrapper">
                <img src={post.image_url} alt="Post" className="post-image" />
              </div>

              <div className="post-info">
                {post.caption && (
                  <p className="post-caption-preview">
                    {post.caption.length > 60
                      ? `${post.caption.substring(0, 60)}...`
                      : post.caption}
                  </p>
                )}

                {post.challenge_id && (
                  <div className="post-challenge-badge">
                    <span className="challenge-icon">🎯</span>
                    <span className="challenge-title">
                      {post.challenge_id.title}
                    </span>
                  </div>
                )}

                {user && post.user_id?._id === user._id && (
                  <button
                    onClick={(e) => openConfirmPopup(post._id, e)}
                    className="delete-btn"
                  >
                    🗑️ Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Feed
