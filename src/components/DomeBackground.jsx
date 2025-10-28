//react css
// src/components/DomeBackground.jsx
import React from "react"
import DomeGallery from "dome-gallery" // from reactbits.dev
import "./DomeBackground.css"

const images = [
  { url: "/images/bg1.jpg" },
  { url: "/images/bg2.jpg" },
  { url: "/images/bg3.jpg" },
  { url: "/images/bg4.jpg" },
]

const DomeBackground = () => {
  return (
    <div className="sphere-root">
      <main className="sphere-main">
        <div className="stage">
          <DomeGallery
            images={images}
            autoRotate={true}
            rotationSpeed={0.2} // gentle, slow rotation
            zoom={1.1} // slightly zoomed out for depth
            showControls={false} // keeps background clean
          />
        </div>

        {/* Soft blur overlay for readability */}
        <div className="overlay"></div>
        <div className="overlay--blur"></div>
      </main>
    </div>
  )
}

export default DomeBackground
