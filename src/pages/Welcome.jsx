import { useNavigate } from "react-router-dom"
import "../../public/stylesheet/style.css"

const Welcome = () => {
  let navigate = useNavigate()

  return (
    <>
      <div>
        <div className="signin-homepage">
          {/* Camera shutter effect */}
          <div className="shutter-blade shutter-1"></div>
          <div className="shutter-blade shutter-2"></div>
          <div className="shutter-blade shutter-3"></div>
          <div className="shutter-blade shutter-4"></div>

          {/* Floating camera icons */}
          <div className="float-icon camera-icon-1">📸</div>
          <div className="float-icon camera-icon-2">📷</div>
          <div className="float-icon camera-icon-3">✨</div>
          <div className="float-icon camera-icon-4">⚡</div>
          <div className="float-icon camera-icon-5">🎯</div>
          <div className="float-icon camera-icon-6">🔥</div>

          {/* Flash effect circles */}
          <div className="flash-circle flash-1"></div>
          <div className="flash-circle flash-2"></div>
          <div className="flash-circle flash-3"></div>

          {/* Polaroid frames floating */}
          <div className="polaroid polaroid-1"></div>
          <div className="polaroid polaroid-2"></div>
          <div className="polaroid polaroid-3"></div>

          {/* Main content */}
          <div className="welcome-content">
            {/* Camera lens logo */}
            <div className="camera-lens-wrapper">
              <div className="lens-outer">
                <div className="lens-middle">
                  <div className="lens-inner">
                    <div className="lens-reflection"></div>
                    <span className="lens-letter">F</span>
                  </div>
                </div>
              </div>
              <div className="lens-flash"></div>
            </div>

            {/* Title with photo effect */}
            <h1 className="welcome-title">
              <span className="title-letter">F</span>
              <span className="title-letter">l</span>
              <span className="title-letter">i</span>
              <span className="title-letter">c</span>
              <span className="title-letter">k</span>
              <span className="title-letter">s</span>
              <span className="title-letter">y</span>
            </h1>

            {/* Snap tagline */}
            <div className="snap-line">
              <span className="snap-emoji">📸</span>
              <p className="welcome-tagline">Click. Challenge. Conquer.</p>
              <span className="snap-emoji">📸</span>
            </div>

            {/* Description */}
            <p className="welcome-description">
              Capture the moment, take on challenges, and rise to the top!
            </p>

            {/* Button with camera click effect */}
            <div className="button-wrapper">
              <button
                onClick={() => navigate("/sign-in")}
                className="cta-button"
              >
                <span className="button-camera">📷</span>
                <span className="button-text">
                  Get Started With Flicksy App
                </span>
                <div className="button-flash-effect"></div>
                <div className="button-click-ripple"></div>
              </button>
            </div>

            {/* Challenge badges */}
            <div className="challenges-preview">
              <div className="challenge-card challenge-1">
                <div className="challenge-icon">🎯</div>
                <span className="challenge-text">Daily Challenges</span>
              </div>
              <div className="challenge-card challenge-2">
                <div className="challenge-icon">⚡</div>
                <span className="challenge-text">Instant Posts</span>
              </div>
              <div className="challenge-card challenge-3">
                <div className="challenge-icon">🏆</div>
                <span className="challenge-text">Win Big</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Welcome
