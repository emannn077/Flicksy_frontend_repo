import { useNavigate } from "react-router-dom"
// import { NavLink } from "react-router-dom"
const Welcome = () => {
  let navigate = useNavigate()

  return (
    <>
      <div>
        <div className="signin-homepage">
          <button onClick={() => navigate("/sign-in")}>
            Get Started With Flicksy App
          </button>
        </div>
      </div>
    </>
  )
}

export default Welcome
