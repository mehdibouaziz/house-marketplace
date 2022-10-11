import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import VisibilityIcon from '../assets/svg/visibilityIcon.svg'


const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const { name, email, password } = formData

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
          <input type="text" className="nameInput" placeholder="Name" id="name" value={name} onChange={handleChange} />
          <input type="email" className="emailInput" placeholder="Email" id="email" value={email} onChange={handleChange} />
          <div className="passwordInputDiv">
            <input type={showPassword ? 'text' : 'password'} className="passwordInput" placeholder="Password" id="password" value={password} onChange={handleChange} />
            <img src={VisibilityIcon} alt="show password" className="showPassword" onClick={() =>  setShowPassword((prevState) => !prevState)} />
          </div>
          <Link to='/forgot-password' className="forgotPasswordLink">Forgot Password?</Link>

          <div className="signUpBar">
            <p className="signUpText">Sign Up</p>
            <button className="signUpButton">
              <ArrowRightIcon fill='white' width='34px' height='34px' />
            </button>
          </div>
        </form>

        {/* google oauth component */}

        <Link to='/sign-in' className="registerLink">
          Sign In Instead
        </Link>
      </div>
    </>
  )
}

export default SignUp