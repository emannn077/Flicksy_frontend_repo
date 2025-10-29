import { useEffect, useState } from "react"
import axios from "axios"
import AddComment from "./AddComment"
import Comment from "./Comment"
import Client from "../services/api"
const CommentSection = ({ postId, user }) => {
  const [comments, setComments] = useState([])

  const fetchComments = async () => {
    try {
      const res = await Client.get(`/comment/post/${postId}`)
      setComments(res.data)
    } catch (err) {
      console.error("Error fetching comments:", err)
    }
  }

  useEffect(() => {
    if (postId) fetchComments()
  }, [postId])

  const handleCommentAdded = (newComment) => {
    setComments((prev) => [newComment, ...prev]) //
  }

  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white">
      <h3 className="font-semibold mb-3">Comments</h3>

      <div className="space-y-3 mb-4 max-h-[400px] overflow-y-auto">
        {comments.length === 0 ? (
          <p className="text-gray-500 text-sm">No comments yet.</p>
        ) : (
          comments.map((c) => (
            <Comment
              key={c._id}
              user={c.user}
              thread={c.thread}
              post={c.post}
            />
          ))
        )}
      </div>

      {user && (
        <AddComment
          postId={postId}
          user={user}
          onCommentAdded={handleCommentAdded}
        />
      )}
    </div>
  )
}

export default CommentSection
