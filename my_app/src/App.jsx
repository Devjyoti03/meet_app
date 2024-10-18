import React, { useRef, useState } from 'react'
import Auth from './components/Auth'
import Cookies from 'universal-cookie'
import Chat from './components/Chat'
import { signOut } from 'firebase/auth'
import { auth } from './firebase-config'
const cookies = new Cookies()

const App = () => {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"))
  const [room, setRoom] = useState(null);
  const roomInputRef = useRef(null);
  const signout = async() => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  }

  if (!isAuth){
  return (
    <div>
      <Auth setIsAuth={setIsAuth}/>
    </div>
  )}
  return (
  <>
    {room ? 
      (<div> 
        <Chat room={room}/> 
        <div className="leave-room">
        <button onClick={() => setRoom(null)}>Leave Chat Room</button>
      </div>
      </div> )
       : 
       (<div className='room'>
        <label htmlFor="">Enter Room name</label>
        {/* <input type="text" onChange={(e) => setRoom(e.target.value)}/> */}
        <input type="text" ref={roomInputRef}/>
        <button onClick={()=> setRoom(roomInputRef.current.value)}>Enter  Chat</button>
       </div>
       )}
       <div className="sign-out">
        <button onClick={signout}>Sign Out</button>
       </div>
  </>
  )
}

export default App
