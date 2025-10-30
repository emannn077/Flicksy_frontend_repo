import { useState } from "react"
import { useNavigate } from "react-router-dom"
import DomeGallery from "../../components/DomeGallery"

import "/src/App.css"

const SignUp = () => {
  const navigate = useNavigate()

  const initialState = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  }

  const [formValues, setFormValues] = useState(initialState)
  const [selectedImage, setSelectedImage] = useState(null)
  const [error, setError] = useState("")

  // Handle text inputs
  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  // Handle file input
  const handleFileChange = (e) => {
    setSelectedImage(e.target.files[0]) // ✅ Only the first file
  }

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    // ✅ Check password match first
    if (formValues.password !== formValues.confirmPassword) {
      setError("Passwords must match.")
      return
    }

    try {
      const formData = new FormData()
      formData.append("firstName", formValues.firstName)
      formData.append("lastName", formValues.lastName)
      formData.append("username", formValues.username)
      formData.append("email", formValues.email)
      formData.append("password", formValues.password)
      if (selectedImage) formData.append("profile_picture", selectedImage)

      const res = await Client.post(
        "http://localhost:3001/auth/sign-up",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )

      if (res.status === 200) {
        setFormValues(initialState)
        setSelectedImage(null)
        navigate("/sign-in")
      }
    } catch (err) {
      console.error("Sign-up error:", err)
      setError("Failed to create account. Please try again.")
    }
  }

  return (
    <>
      <DomeGallery />
      <div className="signup-page">
        <div className="signup-box">
          <h2>Sign Up</h2>

          {error && <p className="error">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="input-class">
              <label>First Name:</label>
              <input
                type="text"
                name="firstName"
                value={formValues.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-class">
              <label>Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={formValues.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-class">
              <label>Username:</label>
              <input
                type="text"
                name="username"
                value={formValues.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-class">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-class">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-class">
              <label>Confirm Password:</label>
              <input
                type="password"
                name="confirmPassword"
                value={formValues.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-class">
              <label>Profile Picture:</label>
              <input
                type="file"
                name="profile_picture"
                onChange={handleFileChange}
                accept="image/*"
                required
              />
            </div>

            <button
              type="submit"
              disabled={
                !formValues.email ||
                !formValues.password ||
                formValues.password !== formValues.confirmPassword
              }
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignUp
