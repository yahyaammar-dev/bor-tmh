import Navbar from '@/components/Misc/Navbar'
import React from 'react'
import LoginForm from '@/components/Misc/LoginForm'
import Footer from '@/components/Misc/Footer'
import { useDispatch, useSelector } from 'react-redux'

const Login = () => {


  return (
    <div>
        <Navbar />
        <LoginForm />
        <Footer />
    </div>
  )
}

export default Login