import { useState, useEffect } from 'react'
import { Header, Post, ProfileSettings } from '../components'
import { useParams } from 'react-router-dom'
import MakePost from '../components/MakePost'
import { HiCog } from 'react-icons/hi'
import { SiGithub } from 'react-icons/si'
import bitmoji from '../assets/bitmoji.png'
import { useUserContext } from "../ctx/UserContext"
import Aside from '../components/Aside'

const Profile = () => {
  const emptyUser = {
    username: '',
    password: '',
    github: '',
    userBio: '',
    userColor: '',
    userImage: '',
    _id: ''
  }

  const {usernameParam} = useParams()
  console.log(usernameParam)
  const { currUser, logout } = useUserContext()
  const [ posts, setPosts] = useState()
  const [ user, setUser ] = useState(emptyUser)

  useEffect(() => {
    if (currUser?.data?._id !== undefined) {
      getUser()
    }
  }, [currUser])

  function getUser() {
    try {
      fetch(`/api/user/username/${usernameParam}`)
      .then(res => {return res.json()})
      .then(data => {
        setUser(data.payload[0])
        getPosts(data.payload[0]._id)
      })
    } catch (err) {
      throw new Error(err)
    }
  }

  function getPosts(id) {
    try {
      fetch(`/api/post/myposts/${id}`)
      .then(res => {return res.json()})
      .then(data => {
        setPosts(data.payload.reverse())
      })
    } catch (err) {
      throw new Error(err)
    }
  }

  if ( currUser.status === 'searching') {
    return (
      <>
      </>
    )
  } else if ( currUser.status === "notfound" ) {
    window.location.href = '/landing'
    return ( 
      <>
      </>
    )
  }

  return (
    <div className='bg-dark-gray min-h-screen h-full'>

      <Header />

      <div className='flex'>
        <Aside />

        <div className='md:mt-[70px] w-full md:ml-16'>

          <div className=" bg-[#454545] flex justify-between gap-6 p-4 px-10 items-center">
            <img src={user.userImage} className=" rounded-full w-[96px] h-[96px]" style={{border: `2px solid ${user.userColor}`}}/>

            {user._id === currUser.data._id && (
              <button onClick={logout} className='text-red-800 py-1 px-2 bg-red-400 rounded-md hover:opacity-80'>Log Out</button>
            )}

          </div>

          <div className='w-full bg-[#454545] px-4 py-2 flex flex-col gap-8 pb-8'>
            <div>
              <p className='font-bold text-xl' style={{color: user.userColor}}>{user.username}</p>
              <p className='text-gray-400'>{user.userBio}</p>
            </div>

            <div className='flex flex-col gap-4 max-w-[600px]'>

              {user.github && (
                <a href={user.github} target='_blank' className=' flex w-fit items-center gap-2 py-1 px-2 bg-dark-gray rounded-md hover:opacity-80 ' style={{color: user.userColor}}>
                    <SiGithub /> {user.github}
                </a>
              )}
              
              {user._id === currUser.data._id && (
                <ProfileSettings/>
              )}

            </div>
          
          </div>

          <div className="mt-6">
            {user._id === currUser.data._id && (
              <MakePost />
            )}

            {posts &&
              (posts.map((post) => (
                <Post postData={post} key={post._id}/>
            )))
            }
              
          </div>

        </div>

      </div>
        
    </div>
  )
}

export default Profile