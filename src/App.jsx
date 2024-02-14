import { useContext, useState } from 'react'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Footer from './components/Footer'
import { tokenAuthContext } from './Context/TokenAuth'

function App() {
  const [count, setCount] = useState(0)
  const {isAuthorised,setIsAuthorised} = useContext(tokenAuthContext)


  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Auth/>}/>
      <Route path='/register' element={<Auth insideRegister/>}/>
      <Route path='/dashboard' element={isAuthorised?<Dashboard/>:<Home/>}/>
      <Route path='/projects' element={ isAuthorised?<Projects/>:<Home/>}/>
      <Route path='/*' element={<Navigate to={'/'}/>}/>

    </Routes>
    <Footer/>
    </>
    
  )
}

export default App
