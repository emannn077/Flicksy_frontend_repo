import React from "react"
import "/public/stylesheet/style.css"

const Post = ({ post }) => {
  return (
    <div className="post">
      <img src={post.image_url} alt="Post" className="post-image" />

      <div className="post-content">
        {post.caption && <p className="post-caption">{post.caption}</p>}
        <p className="post-user">
          {post.user_id?.username || "Anonymous User"}
        </p>
      </div>
    </div>
  )
}

export default Post
