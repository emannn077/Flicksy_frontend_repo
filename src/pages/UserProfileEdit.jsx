import { useEffect, useState } from "react"
import { BASE_URL } from "../services/api"
import axios from "axios"
import Client from "../services/api"
import { useParams, useNavigate } from "react-router-dom"

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
        const res = await Client.get(`/user/profile/${id}`)
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

      const res = await Client.put(`/user/profile/${id}`, data, {
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Edit Profile
        </h2>

        {error && (
          <p className="text-red-600 text-center mb-4 font-medium">{error}</p>
        )}
        {message && (
          <p className="text-green-600 text-center mb-4 font-medium">
            {message}
          </p>
        )}

        {/* this is for uploading profile image */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-center">
            <img
              src={
                preview
                  ? preview
                  : "https://cdn-icons-png.flaticon.com/512/847/847969.png"
              }
              alt="Profile Preview"
              className="w-32 h-32 object-cover rounded-full border mb-3"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="text-sm"
            />
          </div>

          <div>
            <label className="block text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div className="pt-2">
            <label className="block text-gray-700">New Password</label>
            <input
              type="password"
              name="password"
              value={passwordData.password}
              onChange={handlePasswordChange}
              className="w-full border rounded p-2"
              placeholder="Enter new password (optional)"
            />
          </div>

          <div>
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              className="w-full border rounded p-2"
              placeholder="Confirm new password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded text-white font-medium ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 transition"
            }`}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default UserProfileEdit
