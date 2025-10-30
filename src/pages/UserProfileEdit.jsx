import { useEffect, useState } from "react"
import { BASE_URL } from "../services/api"
import axios from "axios"
import Client from "../services/api"
import { useParams, useNavigate } from "react-router-dom"
import "../../public/stylesheet/edit.css"

const UserProfileEdit = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    profile_picture: "",
  })

  const [passwordData, setPasswordData] = useState({
    password: "",
    confirmPassword: "",
  })

  const [preview, setPreview] = useState("")
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token")
        const res = await Client.get(`/users/profile/${id}`)
        setFormData(res.data)
        if (res.data.profile_picture) {
          setPreview(`${BASE_URL}${res.data.profile_picture}`)
        }
      } catch (err) {
        console.error("Failed to load user:", err)
        setError("Unable to load profile data.")
      }
    }
    fetchUser()
  }, [id])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
      setPreview(URL.createObjectURL(selectedFile))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setMessage("")
    setLoading(true)

    if (
      passwordData.password &&
      passwordData.password !== passwordData.confirmPassword
    ) {
      setError("Passwords do not match.")
      setLoading(false)
      return
    }

    try {
      const token = localStorage.getItem("token")
      const data = new FormData()
      data.append("firstName", formData.firstName)
      data.append("lastName", formData.lastName)
      data.append("username", formData.username)
      data.append("email", formData.email)
      if (file) data.append("profile_picture", file)
      if (passwordData.password) data.append("password", passwordData.password)

      const res = await Client.put(`/users/profile/${id}/edit`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      setFormData(res.data.user)
      setMessage(res.data.msg || "Profile updated successfully!")

      if (res.data.user.profile_picture) {
        setPreview(`${BASE_URL}${res.data.user.profile_picture}`)
      }

      setPasswordData({ password: "", confirmPassword: "" })

      setTimeout(() => navigate(`/profile`), 1500)
    } catch (err) {
      console.error("Error updating profile:", err)
      setError(err.response?.data?.msg || "Failed to update profile.")
      setLoading(false)
    }
  }

  return (
    <div className="profile-edit-container">
      <div className="profile-edit-card">
        <h2 className="profile-edit-title">Edit Profile</h2>

        {error && <p className="message-error">{error}</p>}
        {message && <p className="message-success">{message}</p>}

        <form onSubmit={handleSubmit} className="profile-edit-form">
          <div className="profile-picture-section">
            <img
              src={
                preview
                  ? preview
                  : "https://cdn-icons-png.flaticon.com/512/847/847969.png"
              }
              alt="Profile Preview"
              className="profile-preview-image"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group password-section">
            <label className="form-label">New Password</label>
            <input
              type="password"
              name="password"
              value={passwordData.password}
              onChange={handlePasswordChange}
              className="form-input"
              placeholder="Enter new password (optional)"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              className="form-input"
              placeholder="Confirm new password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`submit-button ${loading ? "loading" : ""}`}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default UserProfileEdit
