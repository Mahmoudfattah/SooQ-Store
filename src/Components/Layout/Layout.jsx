import React, { useContext, useEffect } from 'react';

import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import { UserContext } from "../../Context/UserContext";
import ScrollToTop from '../../Components/ScolledToTop';





export default function Layout() {

   const {setUserToken} = useContext(UserContext)

   useEffect(() => {
     if (localStorage.getItem('userToken') !==null)
       {

    setUserToken (localStorage.getItem('userToken'))
     }
   
    
   }, []);
   


 
 
    return <>
    <ScrollToTop/>
    
    <Navbar/>
   
  <div className='container'>  <Outlet/></div>
   
    <Footer/>
  
  
  
  
  
  
  
  
  
  
    </>
}
