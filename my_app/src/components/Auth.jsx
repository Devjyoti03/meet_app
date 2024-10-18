import React from 'react'
import {auth, provider} from "../firebase-config"
import { signInWithPopup } from 'firebase/auth'
import Cookies from 'universal-cookie'
const cookies = new Cookies()


const Auth = (props) => {

  const { setIsAuth } = props;
    const signIn = async() =>{
      try{
        const result = await signInWithPopup(auth, provider);
        // console.log(result);
        cookies.set("auth-token", result.user.refreshToken);
        setIsAuth(true);
      }catch(err){
        console.error(err)
      }
    }
  return (
    <div className='auth'>
      <p>SIGN IN WITH GOOGLE TO CONTINUE</p>
      <button onClick={signIn}>Sign in with Google</button>
    </div>
  )
}

export default Auth
