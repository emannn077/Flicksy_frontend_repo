import React, { useRef, useState } from "react"
import Webcam from "react-webcam"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Camera, RefreshCw, Check } from "lucide-react"

const CameraPage = () => {
  const webcamRef = useRef(null)
  const [photo, setPhoto] = useState(null)
  const [facingMode, setFacingMode] = useState("user") // "user" = front, "environment" = back
  const navigate = useNavigate()

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot()
    setPhoto(imageSrc)
  }

  const retake = () => {
    setPhoto(null)
  }

  const switchCamera = () => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"))
  }

  const postPhoto = async () => {
    try {
      await axios.post("http://localhost:5000/api/posts", {
        image: photo,
        comment: "Challenge completed!",
      })
      navigate("/") // go to homepage after posting
    } catch (err) {
      console.error("❌ Upload failed:", err)
      alert("Failed to post photo.")
    }
  }

  const videoConstraints = {
    facingMode,
  }

  return (
    <div className="w-screen h-screen flex flex-col justify-between items-center bg-black relative overflow-hidden">
      {/* Challenge text overlay */}
      <div className="absolute top-5 text-white text-lg font-semibold z-10">
        🎯 Challenge: Capture your moment
      </div>

      {/* Live camera view or captured image */}
      <div className="flex-1 flex items-center justify-center">
        {!photo ? (
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            mirrored={facingMode === "user"}
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

      {/* Bottom controls */}
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
              className="bg-white/30 p-3 rounded-full text-white"
            >
              <RefreshCw />
            </button>

            <button
              onClick={postPhoto}
              className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
            >
              <Check className="text-white" size={32} />
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default CameraPage
