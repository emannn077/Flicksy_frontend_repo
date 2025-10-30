import React from "react"
import { BASE_URL } from "../services/api"
import "../../public/stylesheet/camera.css"

const Post = ({ post }) => {
  return (
    <div className="post-container">
      {/* User Header */}
      <div className="post-user-header">
        <img
          src={
            post.user_id?.profile_picture
              ? `${BASE_URL}${post.user_id.profile_picture}`
              : "https://cdn-icons-png.flaticon.com/512/847/847969.png"
          }
          alt={post.user_id?.username || "User"}
          className="post-user-avatar"
        />
        <span className="post-user-name">
          {post.user_id?.username || "Anonymous User"}
        </span>
      </div>

      {/* Post Image */}
      <div className="post-image-container">
        <img src={post.image_url} alt="Post" className="post-img" />
      </div>

      {/* Post Details */}
      <div className="post-details">
        {post.caption && <p className="post-caption-text">{post.caption}</p>}
      </div>
    </div>
  )
}

export default Post
