import { useEffect, useState } from "react"
import AddComment from "./AddComment"
import Comment from "./Comment"
import Client from "../services/api"
import "../../public/stylesheet/design.css"

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
    setComments((prev) => [newComment, ...prev])
  }

  return (
    <div className="comment-section">
      <h3 className="comment-section-title">Comments</h3>

      <div className="comments-list">
        {comments.length === 0 ? (
          <p className="comments-empty">
            No comments yet. Be the first to share your thoughts!
          </p>
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
        <div className="add-comment-section">
          <AddComment
            postId={postId}
            user={user}
            onCommentAdded={handleCommentAdded}
          />
        </div>
      )}
    </div>
  )
}

export default CommentSection
