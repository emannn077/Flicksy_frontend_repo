import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"
import Client from "../services/api"
import CommentSection from "../components/CommentSection"

const PostDetail = () => {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
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

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  return post ? (
    <div className="post-detail flex flex-wrap gap-8 p-6">
      <div className="flex-1 min-w-[300px]">
        <div className="border rounded-lg shadow p-4">
          <div className="flex items-center gap-3 mb-4">
            <img
              src={
                post.user_id?.profile_picture
                  ? `http://localhost:3001/${post.user_id.profile_picture}`
                  : "http://localhost:3001/images/default-avatar.png"
              }
              alt="User"
              width="60"
              height="60"
              className="rounded-full object-cover"
            />
            <h2 className="font-bold text-lg">{post.user_id?.username}</h2>
          </div>

          <img
            src={post.image_url}
            alt="Post"
            className="rounded-xl mb-4 max-h-[500px] object-cover"
          />

          <p className="text-gray-800">{post.caption}</p>
        </div>
      </div>

      <div className="w-[350px] min-w-[300px]">
        <CommentSection postId={post._id} user={user} />
      </div>

      <div className="w-full mt-6">
        <Link
          to="/home"
          className="text-blue-500 underline hover:text-blue-700"
        >
          ← Back to feed
        </Link>
      </div>
    </div>
  ) : null
}

export default PostDetail
