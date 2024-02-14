import React, { useEffect } from 'react'
import { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import uploadProfile from '../assets/uploadprofile.png'
import SERVER_URL from '../services/serverUrl';
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { updateUserProfileAPI } from '../services/allAPI';


function Profile() {
  const [open,setOpen] = useState(false)
  const [userData,setUserData] = useState({
    username:"",password:"",email:"",github:"",linkedin:"",profileImage:""
  })

  const [existingImage,setExistingImage] = useState("")
  const [preview,setPreview] = useState("")

useEffect(()=>{
  if(sessionStorage.getItem("userDetails")){
    const userDetails = JSON.parse(sessionStorage.getItem("userDetails"))
    setUserData({...userData,username:userDetails.username,password:userDetails.password,email:userDetails.email,
    github:userDetails.github,linkedin:userDetails.linkedin})
    setExistingImage(userDetails.profile)
  }
},[open])

useEffect(()=>{
  if(userData.profileImage){
    setPreview(URL.createObjectURL(userData.profileImage))
  }else{
    setPreview("")
  }
},[userData.profileImage])
console.log(userData);

const handleProfileUpdate = async ()=>{
  const {username,password,email,github,linkedin,profileImage} = userData
  if(!github || !linkedin){
    toast.info("Please fill the form completely!!!")
  }else{
    //proceed to api call
    const reqBody = new FormData()
    reqBody.append("username",username)
    reqBody.append("password",password)
    reqBody.append("email",email)
    reqBody.append("github",github)
    reqBody.append("linkedin",linkedin)
    preview?reqBody.append("profileImage",profileImage):reqBody.append("profileImage",existingImage)

    const token = sessionStorage.getItem("token")
    if(token){
      const reqHeader ={
        "Content-Type":preview?"multipart/form-data":"application/json",
        "Authorization":`Bearer ${token}`
      }
      // api call
      try{
        const result = await updateUserProfileAPI(reqBody,reqHeader)
        if(result.status==200){
          setOpen(!open)
          sessionStorage.setItem("userDetails",JSON.stringify(result.data))

        }else{
          console.log(result);
        }
      }catch(err){
        console.log(err);
      }
    }
  }
}

  return (
    
    <>
      <div className='  d-flex justify-content-between border rounded p-2 '>
        <h2>Profile</h2>
        <button onClick={()=>setOpen(!open)} className='btn btn-outline-warning'> 
        <i className='fa-solid fa-caret-down'></i></button>
      </div>
      <Collapse in={open}>
        <div id="example-collapse-text">
        
          <label >
            <input type="file" style={{display:'none'}} onChange={e=>setUserData({
              ...userData,profileImage:e.target.files[0]
            })} />
           { existingImage==""?
           <img width={'150px'} height={'150px'} className='img-fluid rounded-circle'
             src={preview?preview:uploadProfile} alt="upload profile pic" />
             :
             <img width={'150px'} height={'150px'} className='img-fluid rounded-circle'
             src={preview?preview:`${SERVER_URL}/uploads/${existingImage}`} alt="upload profile pic" /> }
 
            
          </label>
          
            <div className='mt-3'>
              <input type="text" className='form-control' placeholder='Enter your Github Link Here'
              value={userData.github}  onChange={e=>setUserData({...userData,github:e.target.value})} />
              </div>  
              <div className='mt-3'>
              < input type="text" className='form-control' placeholder='Enter your Linkedin Link Here'
              value={userData.linkedin}  onChange={e=>setUserData({...userData,linkedin:e.target.value})} />
              </div>  
              <div className='mb-3 d-grind w-75 mx-auto'>
                <button onClick={handleProfileUpdate} className='btn btn-warning'>Update</button>
                </div>      
             

        </div>
      </Collapse>
      <ToastContainer autoClose={3000} theme='colored' />


    </>
  )
}

export default Profile