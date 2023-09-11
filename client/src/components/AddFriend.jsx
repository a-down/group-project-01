import Header from './Header'
import Aside from './Aside'
import { useUserContext } from '../ctx/UserContext'
import { useState, useEffect } from 'react'


export default function AddFriend() {
  const { currUser } = useUserContext()
  const [ apiUrl, setApiUrl ] = useState('')
  const [ username, setUsername ] = useState('')

  useEffect(() => {
    setApiUrl(`http://localhost:6500/api/friend/find/user?username=${username}`)
    
    fetch(apiUrl, {
      
    }

  }, [username])

  return (
    <div>

        <form>
          <input className='m-2 border' value={username} onChange={(e) => setUsername(e.target.value)}>

          </input>
        </form>

    </div>
  )
}