import React, { useContext } from 'react'
import { Navbar,Container } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { tokenAuthContext } from '../Context/TokenAuth'

function Header({insideDashBoard}) {

  const {isAuthorised,setIsAuthorised} = useContext(tokenAuthContext)


  const navigate = useNavigate()
  const handleLogout =()=>{
    sessionStorage.clear()
    setIsAuthorised(false)
    navigate('/')
  }



  return (
    <Navbar style={{width:"100%",backgroundColor:'	#A32CC4',position:'fixed',top:'0px',zIndex:5}} className="">
    <Container>
      <Navbar.Brand >
       <Link to={'/'} style={{textDecoration:'none',color:'black'}}  className='fw-bolder'>
          <i style={{height:'25px'}} className='fa-solid fa-hands-holding-circle'></i> Project Fair
       </Link>
      </Navbar.Brand>
      {
        insideDashBoard&&
        <div className='ms-auto' >
          <button  onClick={handleLogout} style={{textDecoration:'none',color:'black'}} className='btn btn-link text-dark fw-bolder' > 
          <i className='fa-solid fa-gear me-2'  ></i> Logout</button>

        </div>
      }
    </Container>
  </Navbar>
  )
}

export default Header