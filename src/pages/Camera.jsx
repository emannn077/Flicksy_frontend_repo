import React, { useRef, useState } from "react"
import Webcam from "react-webcam"
import axios from "axios"
import Client from "../services/api"
import { useNavigate, useLocation } from "react-router-dom"
import { Camera, RefreshCw, Check, X } from "lucide-react"
import "../../public/stylesheet/camera.css"

const CameraPage = () => {
  const webcamRef = useRef(null)
  const [photo, setPhoto] = useState(null)
  const [caption, setCaption] = useState("")
  const [facingMode, setFacingMode] = useState("user")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const navigate = useNavigate()
  const location = useLocation()

  const queryParams = new URLSearchParams(location.search)
  const mode = queryParams.get("mode") || "normal"
  const challenge_id = queryParams.get("challenge_id") || null

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot()
    setPhoto(imageSrc)
  }

  const retake = () => {
    setPhoto(null)
    setCaption("")
  }

  const switchCamera = () => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"))
  }

  const postPhoto = async () => {
    setLoading(true)
    try {
      const user_id = localStorage.getItem("user_id")
      const token = localStorage.getItem("token")

      if (!user_id || !token) {
        setMessage("Please log in before posting!")
        navigate("/signin")
        setLoading(false)
        return
      }
      const challenge = location.state?.randomChallenge || null
      const finalCaption =
        caption ||
        (mode === "challenge" && challenge
          ? `Challenge: ${challenge.title} done !`
          : "Sharing a Moment !")

      const payload = {
        user_id,
        challenge_id: challenge?._id || null,
        image: photo,
        caption: finalCaption,
      }

      console.log("Payload:", payload)

      await Client.post(`/post/user/${user_id}`, payload)

      setMessage("Post uploaded successfully!")
      setTimeout(() => navigate("/profile"), 1500)
      setLoading(false)
    } catch (err) {
      console.error("Uploading Failed :", err)
      setMessage(
        `Failed to post photo. ${
          err.response?.data?.message || "Check console for details."
        }`
      )
      setLoading(false)
    }
  }

  const videoConstraints = { facingMode }

  return (
    <div className="camera-page">
      {/* Animated Background */}
      <div className="camera-bg-animation">
        <div className="floating-icon icon-1">📷</div>
        <div className="floating-icon icon-2">✨</div>
        <div className="floating-icon icon-3">🎯</div>
        <div className="floating-icon icon-4">💫</div>
        <div className="floating-icon icon-5">🌟</div>
        <div className="floating-icon icon-6">📸</div>
      </div>

      {/* Main Content Container */}
      <div className="camera-content">
        {/* Challenge Badge */}
        {mode === "challenge" && (
          <div className="challenge-badge">
            <span className="challenge-icon">🎯</span>
            <span className="challenge-text">Challenge Mode</span>
          </div>
        )}

        {/* Camera Frame (Locket Style) */}
        <div className="camera-frame">
          <div className="camera-view-bordered">
            {!photo ? (
              <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                mirrored={facingMode === "user"}
                className="webcam-feed"
              />
            ) : (
              <img src={photo} alt="Captured" className="captured-photo" />
            )}
          </div>
        </div>

        {/* Caption Input */}
        {photo && (
          <div className="caption-input-wrapper">
            <input
              type="text"
              placeholder="Add a caption... ✨"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="caption-input"
            />
          </div>
        )}

        {/* Camera Controls */}
        <div className="camera-controls">
          {!photo ? (
            <>
              <button onClick={switchCamera} className="control-btn secondary">
                <RefreshCw className="control-icon" />
              </button>

              <button onClick={capture} className="capture-btn">
                <div className="capture-btn-inner">
                  <Camera className="capture-icon" />
                </div>
              </button>

              <div className="control-btn-spacer"></div>
            </>
          ) : (
            <>
              <button
                onClick={retake}
                disabled={loading}
                className="control-btn danger"
              >
                <X className="control-icon" />
              </button>

              <button
                onClick={postPhoto}
                disabled={loading}
                className={`post-btn ${loading ? "loading" : ""}`}
              >
                <Check className="post-icon" />
              </button>

              <div className="control-btn-spacer"></div>
            </>
          )}
        </div>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner-camera"></div>
          <p className="loading-text">Uploading your moment...</p>
        </div>
      )}

      {/* Success/Error Message */}
      {message && !loading && (
        <div
          className={`message-toast ${
            message.includes("success") ? "success" : "error"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  )
}

export default CameraPage
