import { useState, useEffect } from 'react'

import './App.css'
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth'
import { getFirestore,onSnapshot, collection, addDoc, orderBy, query, serverTimestamp} from 'firebase/firestore'
import { auth, app } from '../firebase'

const db = getFirestore(app)


function App() {

  const [user, setUser] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"))
    const unsubscribe = onSnapshot(q, snapshot => {
      setMessages(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
    return unsubscribe
  }, [])
  
 
  useEffect(() => {
      onAuthStateChanged(auth, user => {
        if(user) {
          setUser(user)
        } else {
          setUser(null)
        }
      })
  }, [])

  const sendMessage = async () => {
    await addDoc(collection(db, "messages"), {
      uid: user.uid,
      photoURL: user.photoURL,
      displayName: user.displayName,
      text: newMessage,
      timestamp: serverTimestamp()
    })

    setNewMessage("")
  }
  

const handleGoogleLogin = async () => {
  const provider = new GoogleAuthProvider()

  try {

  await signInWithPopup(auth, provider)

    
  } catch (error) {
    console.log(error)
  }
}
  return (
    <div className='App' >
      { user ? (
        <div className='chat-container'>

<h3 class="title">Logged in as {user.displayName}</h3>
       
       

        <div className="messages">

{messages.map(msg => (
  <div  key={msg.id} className={`message ${msg.data.uid === user.uid ? 'current' : 'other'}`}>
  <div>
    <img className='w-10 h-10 rounded-full' src={msg.data.photoURL} />
   {msg.data.text}
  </div>
  </div>
))}
</div>
<div className="chat-input-form">
<input class="chat-input"
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
        />
        <button className='button send-button' onClick={sendMessage}>Send Message</button>
        <button className='mb-8 bg-white rounded-[10px] p-3' onClick={() => auth.signOut()}>Logout</button>
        </div>
        </div>
      ):
   
      <button onClick={handleGoogleLogin}>Login with Google</button>
}
      </div>
  )
}

export default App