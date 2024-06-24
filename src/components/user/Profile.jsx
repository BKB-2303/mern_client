import React, { useContext } from 'react'
import AppContext from '../../context/AppContext'

const Profile = () => {
    const { user, userOrder } = useContext(AppContext);
  return (
   <>
   <div>
   <h1>Welcome , {user?.name}</h1>
   <h3 className='black'>{user?.email}</h3>
   </div>
   
        
   </>
  )
}

export default Profile