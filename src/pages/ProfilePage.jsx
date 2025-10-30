import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Client, { BASE_URL } from "../services/api"
import Feed from "../components/Feed"
import { Camera, Edit2, Award } from "lucide-react"
import "../../public/stylesheet/camera.css"

const ProfilePage = ({ user, setUser }) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          setError("Unauthorized: No token found. Please log in again.")
          return
        }

        const payload = JSON.parse(atob(token.split(".")[1]))
        const user = payload

        const res = await Client.get(`/users/profile/${user._id}`)

        setUser(res.data)
      } catch (err) {
        console.error("cannot load the profile : ", err)

        if (err.response && err.response.status === 500) {
          setError(
            `Server Error (500): ${
              err.response.data?.message ||
              "Something went wrong on the server."
            }`
          )
        } else {
          setError("Failed to load profile. Please try again later.")
        }
      }

      setLoading(false)
    }

    fetchUser()
  }, [])

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="loading-spinner"></div>
        <p>Loading profile...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="profile-error">
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className="profile-page">
      {user ? (
        <div className="profile-container">
          {/* Profile Header Section */}
          <div className="profile-header">
            <div className="profile-content">
              {/* Profile Picture */}
              <div className="profile-picture-wrapper">
                <img
                  src={
                    user.profile_picture
                      ? `${BASE_URL}${user.profile_picture}`
                      : "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                  }
                  alt="Profile"
                  className="profile-picture"
                />
              </div>

              {/* Profile Info */}
              <div className="profile-info">
                <h1 className="profile-username">{user.username}</h1>
                <p className="profile-email">{user.email}</p>

                {/* Points Badge */}
                <div className="points-badge">
                  <Award className="award-icon" />
                  <span className="points-text">{user.points} Points</span>
                </div>

                {/* Action Buttons */}
                <div className="action-buttons">
                  <button
                    onClick={() => navigate("/camera")}
                    className="btn-add-post"
                  >
                    <Camera className="btn-icon" />
                    Add Post
                  </button>

                  <button
                    onClick={() => navigate(`/edit-profile/${user._id}`)}
                    className="btn-edit-profile"
                  >
                    <Edit2 className="btn-icon" />
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="profile-divider"></div>

          {/* Feed Section */}
          <div className="feed-section">
            <h2 className="feed-title">My Posts</h2>
            <Feed user={user} />
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default ProfilePage
