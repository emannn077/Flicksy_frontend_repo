import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Client, { BASE_URL } from "../services/api"
import "../../public/stylesheet/camera.css"

const Feed = ({ user }) => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [deleteError, setDeleteError] = useState("")

  const navigate = useNavigate()

  const fetchPosts = async () => {
    setLoading(true)
    try {
      const url = user && user._id ? `/post/user/${user._id}` : `/post`
      const res = await Client.get(url)

      setPosts(res.data)
      setLoading(false)
    } catch (err) {
      console.error("Failed to fetch posts:", err)
      setError(
        err.response?.data?.message || "An error occurred while fetching posts."
      )
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [user?._id])

  const handleDelete = async (postId, e) => {
    e.stopPropagation()
    if (!confirm("Are you sure you want to delete the post?")) return
    try {
      await Client.delete(`/post/${postId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      setPosts(posts.filter((p) => p._id !== postId))
    } catch (err) {
      console.error("Failed to delete post:", err)
      setDeleteError("Could not delete post. Please try again.")
    }
  }

  if (loading) {
    return (
      <div className="feed-loading">
        <div className="loading-spinner"></div>
        <p>Loading posts...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="feed-error">
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className="feed-container">
      {deleteError && (
        <div className="delete-error">
          <p>{deleteError}</p>
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
              {/* User Info at Top */}
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

              {/* Post Image */}
              <div className="post-image-wrapper">
                <img src={post.image_url} alt="Post" className="post-image" />
              </div>

              {/* Post Info */}
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
                    onClick={(e) => handleDelete(post._id, e)}
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
