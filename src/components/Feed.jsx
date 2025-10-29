import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Client from "../services/api"

const Feed = ({ user }) => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [deleteError, setDeleteError] = useState("")

  const navigate = useNavigate()

  const fetchPosts = async () => {
    setLoading(true) // start loading
    try {
      //so here if user is in profile page can get their post else in homepage all post
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

  //delete the post
  const handleDelete = async (postId) => {
    if (!confirm("Are you sure you want to delete the post?")) return
    try {
      await Client.delete(`/post/${postId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      setPosts(posts.filter((p) => p._id !== postId))
      navigate("/home")
    } catch (err) {
      console.error("Failed to delete post:", err)
      setDeleteError("Could not delete post,Please try again.")
    }
  }

  //here it will show loading when fetching the posts.
  if (loading) return <p>Loading posts...</p>

  //here it will show error if the posts arent fetched
  if (error) return <p style={{ color: "red" }}>{error}</p>

  return (
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-4">
        {user ? "Your Posts" : "All Posts"}
      </h3>

      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {posts.map((post) => (
            <div
              key={post._id}
              onClick={() => navigate(`/post/${post._id}`)}
              className="border rounded-lg overflow-hidden shadow"
            >
              <img
                src={post.image_url}
                alt="Post"
                className="w-full h-48 object-cover"
              />
              <div className="p-2">
                <p className="text-sm">{post.caption}</p>
                {user && post.user_id?._id === user._id && (
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="mt-2 px-3 py-1 bg-red-500 text-white text-xs rounded"
                  >
                    Delete Post
                  </button>
                )}
                {post.challenge_id && (
                  <p className="text-xs text-gray-600 mt-1">
                    🎯 Challenge: {post.challenge_id.title}
                  </p>
                )}
                {!user && (
                  <p className="text-xs text-gray-500 mt-1">
                    👤 {post.user_id?.username}
                  </p>
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
