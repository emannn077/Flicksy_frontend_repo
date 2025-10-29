import React, { useRef, useState } from "react"
import Webcam from "react-webcam"
import axios from "axios"
import Client from "../services/api"
import { useNavigate, useLocation } from "react-router-dom"
import { Camera, RefreshCw, Check } from "lucide-react"

const CameraPage = () => {
  const webcamRef = useRef(null)
  const [photo, setPhoto] = useState(null)
  const [caption, setCaption] = useState('') // user caption
  const [facingMode, setFacingMode] = useState('user')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const navigate = useNavigate()
  const location = useLocation()

  // Detect mode and optional challenge_id from URL
  const queryParams = new URLSearchParams(location.search)
  const mode = queryParams.get('mode') || 'normal'
  const challenge_id = queryParams.get('challenge_id') || null

  // Capture photo
  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot()
    setPhoto(imageSrc)
  }

  const retake = () => {
    setPhoto(null)
    setCaption('')
  }

  const switchCamera = () => {
    setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'))
  }

  // Post photo
  const postPhoto = async () => {
    setLoading(true)
    try {
      const user_id = localStorage.getItem('user_id')
      const token = localStorage.getItem('token')

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

      setMessage(" Post uploaded successfully!")
      setTimeout(() => navigate("/profile"), 1500)
      setLoading(false)
    } catch (err) {
      console.error("Uploading Failed :", err)
      setMessage(
        `Failed to post photo. ${
          err.response?.data?.message || 'Check console for details.'
        }`
      )
      setLoading(false)
    }
  }

  const videoConstraints = { facingMode }

  return (
    <div className="w-screen h-screen flex flex-col justify-between items-center bg-black relative overflow-hidden">
      {mode === "challenge" && (
        <div className="absolute top-5 text-white text-lg font-semibold z-10">
          🎯 Challenge: Capture your moment
        </div>
      )}

      <div className="flex-1 flex items-center justify-center">
        {!photo ? (
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            mirrored={facingMode === 'user'}
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={photo}
            alt="Captured"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {photo && (
        <div className="absolute bottom-32 w-full px-6 z-20">
          <input
            type="text"
            placeholder="Add a caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full rounded-lg p-3 text-black bg-white/90 outline-none"
          />
        </div>
      )}

      {/* Controls */}
      <div className="absolute bottom-10 w-full flex justify-center items-center gap-10 z-20">
        {!photo ? (
          <>
            <button
              onClick={switchCamera}
              className="bg-white/30 p-3 rounded-full text-white"
            >
              <RefreshCw />
            </button>

            <button
              onClick={capture}
              className="bg-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg border-4 border-white"
            >
              <Camera className="text-black" size={28} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={retake}
              disabled={loading}
              className="bg-white/30 p-3 rounded-full text-white"
            >
              <RefreshCw />
            </button>

            <button
              onClick={postPhoto}
              disabled={loading}
              className={`${
                loading ? 'bg-gray-400' : 'bg-green-500'
              } w-16 h-16 rounded-full flex items-center justify-center shadow-lg`}
            >
              <Check className="text-white" size={32} />
            </button>
          </>
        )}
      </div>

      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-lg">
          Uploading...
        </div>
      )}
    </div>
  )
}

export default CameraPage
