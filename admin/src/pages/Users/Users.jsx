import React, { useContext, useEffect, useState } from 'react'
import './Users.css'
import axios from 'axios'
import { dataContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'

const Users = () => {

  const [usersList,setUsersList] = useState([])
  const {token} = useContext(dataContext)

  const fetchUsersList = async()=>{
    const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/admin/users-list`,{},{headers:{admintoken:token}});
    if(response.data.success){
          setUsersList(response.data.users)
          console.log(response.data.users)
    }else{
        toast(response.data.message)
    }
  }

useEffect(()=>{
    fetchUsersList()
},[])

  return (
    <div className="users list add flex-col">
        <p style={{fontSize:"20px"}}>All Users List ({usersList.length})</p>
          <div className="user-table title">
              <b>SR</b>
              <b>Name</b>
              <b>email</b>
          </div>
          {usersList.map((user,index)=>{
              return <div key={index} className="user-table">
                    <p>{index+1}</p>
                    <p>{user.name}</p>
                    <p>{user.email}</p>
                    <p>x</p>
              </div>
          })}
    </div>
  )
}

export default Users