import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Feed from "../components/Feed"

const ProfilePage = ({ user, setUser }) => {
  // const [user, setUser] = useState(null)
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

        const res = await axios.get(
          `http://localhost:3001/user/profile/${user._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )

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

  return (
    <div style={{ padding: "20px" }}>
      {user ? (
        <>
          <h2>{user.username}'s Profile</h2>

          {/* to upload profile image we used multer an here below is the edit profile picture */}
          <img
            src={
              user.profile_picture
                ? `http://localhost:3001${user.profile_picture}`
                : "/default-avatar.png"
            }
            alt="Profile"
            width="100"
            height="100"
          />
          <p>Email: {user.email}</p>
          <p>Points: {user.points}</p>

          <button
            onClick={() => navigate("/camera")}
            style={{
              marginTop: "15px",
              padding: "10px 20px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#4CAF50",
              color: "white",
              cursor: "pointer",
            }}
          >
            + Add Post
          </button>

          {/* editing the profile page */}
          <button
            onClick={() => navigate(`/edit-profile/${user._id}`)}
            style={{
              marginTop: "10px",
              padding: "10px 20px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#007bff",
              color: "white",
              cursor: "pointer",
              display: "block",
            }}
          >
            Edit Profile
          </button>

          <hr style={{ margin: "20px 0" }} />

          <Feed user={user} />
        </>
      ) : null}
    </div>
  )
}

export default ProfilePage
