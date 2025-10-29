import { useEffect, useState } from "react"
import axios from "axios"

const Feed = ({ user }) => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const fetchPosts = async () => {
    setLoading(true) // start loading
    try {
      const token = localStorage.getItem("token")

      let url = ""
      if (user && user._id) {
        //here the user will see only their post in the profile page
        url = `http://localhost:3001/post/user/${user._id}`
      } else {
        // and here user can view all the users post in homepage
        url = `http://localhost:3001/post`
      }

      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })

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
              className="border rounded-lg overflow-hidden shadow"
            >
              <img
                src={post.image_url}
                alt="Post"
                className="w-full h-48 object-cover"
              />
              <div className="p-2">
                <p className="text-sm">{post.caption}</p>
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
