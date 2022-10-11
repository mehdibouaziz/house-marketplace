import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import VisibilityIcon from '../assets/svg/visibilityIcon.svg'


const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const { email,password } = formData

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back!</p>
        </header>
        <form>
          <input type="email" className="emailInput" placeholder="Email" id="email" value={email} onChange={handleChange} />
          <div className="passwordInputDiv">
            <input type={showPassword ? 'text' : 'password'} className="passwordInput" placeholder="Password" id="password" value={password} onChange={handleChange} />
            <img src={VisibilityIcon} alt="show password" className="showPassword" onClick={() =>  setShowPassword((prevState) => !prevState)} />
          </div>
          <Link to='/forgot-password' className="forgotPasswordLink">Forgot Password?</Link>

          <div className="signInBar">
            <p className="signInText">Sign In</p>
            <button className="signInButton">
              <ArrowRightIcon fill='white' width='34px' height='34px' />
            </button>
          </div>
        </form>

        {/* google oauth component */}

        <Link to='/sign-up' className="registerLink">
          Sign Up Instead
        </Link>
      </div>
    </>
  )
}

export default SignIn