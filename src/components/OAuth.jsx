import { useLocation, useNavigate } from "react-router-dom"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore"
import { db } from "../firebase.config"
import { toast } from "react-toastify"
import googleIcon from '../assets/svg/googleIcon.svg'


const OAuth = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const onGoogleClick = async () => {
        try {
            const auth = getAuth()
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider)
            const user = result.user

            // Check for user in the firestore
            const docRef = doc(db, 'users', user.uid)
            const docSnap = await getDoc(docRef)

            // if user does not exist, create user
            if(!docSnap.exists()) {
                await setDoc(docRef, {
                    name: user.displayName,
                    email: user.email,
                    timestamp: serverTimestamp()
                })
                toast.success('Registration succesful!')
            } else {
                toast.success('Welcome back!')
            }
            navigate('/')
        } catch (error) {
            toast.error('Could not authorize with Google')
        }
    }

  return (
    <div className="socialLogin">
        <p>Sign {location.pathname === '/sign-up' ? 'up' : 'in' } with</p>
        <button className="socialIconDiv" onClick={onGoogleClick}>
            <img className="socialIconImg" src={googleIcon} alt="google" />
        </button>
    </div>
  )
}

export default OAuth