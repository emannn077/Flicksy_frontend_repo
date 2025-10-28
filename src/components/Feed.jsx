import React, { useEffect, useState } from "react"
import axios from "axios"
import Post from "./Post"

const Feed = ({ userId }) => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const url = userId
          ? `http://localhost:3001/post/user/${userId}`
          : "http://localhost:3001/post"
        const res = await axios.get(url)
        setPosts(res.data)
      } catch (err) {
        console.error("Failed to fetch posts:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [userId])

  if (posts.length === 0) return <div className="feed-empty">No posts yet.</div>

  return (
    <div className="feed-container">
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  )
}

export default Feed
