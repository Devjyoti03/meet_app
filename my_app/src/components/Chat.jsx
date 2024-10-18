import React, { useEffect, useState } from 'react'
import {addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where} from "firebase/firestore"
import { auth, db } from '../firebase-config';

const Chat = (props) => {
    const {room} = props;
    const [newM, setNewM] = useState("");
    const mesRef = collection(db, "texts");
    const [messages, setMessages] = useState([])

    useEffect(()=> {
        const queryM = query(mesRef, where("room", "==", room), orderBy("createdAt"));
        const m = onSnapshot(queryM, (snapshot) => {
            let messages = [];
            snapshot.forEach((doc) => {
                messages.push({...doc.data(), id: doc.id})
            });
            setMessages(messages)
        });
        return () => m();
    }, [])
    const handleSubmit = async(e) => {
        e.preventDefault();
        if (newM === "") return;
        await addDoc(mesRef, {
            text: newM,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room,
        })
    
        setNewM("");
    };
  return (
    <div className='chat-app'>
        <div className="header">
            <h1>Welcome to: {room}</h1>
        </div>
        <div className='messages'>
            {messages.map((message) => 
            <div className="message" key={message.id}>
                <span className='user'>{message.user}</span>
                {message.text} 
            </div>
            )}
        </div>
      <form onSubmit={handleSubmit} action="" className="chat-form">
        <input type="text" className="new-input" 
        onChange={(e) => setNewM(e.target.value)}
        placeholder='Type your message here...'
        value={newM}/>
        <button type='submit' className='send'>Send</button>
      </form>
    </div>
  )
}

export default Chat
