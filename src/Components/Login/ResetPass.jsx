
import React, { useContext, useState } from "react";
import  { useFormik} from "formik";
import axios from 'axios';
import * as Yup from "yup";
import { FallingLines } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
// import { UserContext } from "../../Context/UserContext";

export default function ResetPass() {

    //  let {setUserToken,setUserDetails}=useContext(UserContext)


 const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

 let navigate = useNavigate();



  function restCode( values){
    setIsLoading(true)

    return axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,values)
    .then(res=> {
        setIsLoading(false);
        

        if(res.statusText  === "OK" )
            
            {
              
                // localStorage.setItem('userToken',res.data.token)
                // setUserToken(res.data.token)
                navigate('/login')
              
            

                
              toast.success('password updated successfully', {className: 'bg-black text-white',} )
              // ,{ icon: '👏',  className: 'fw-semiblod',}
            }
            else{
              toast.error('please try again')
            }
    })
    .catch((err)=>{
        setIsLoading(false)
        // console.log(err.response.data.message);
        setError(err);
    });
   
    
  }

  

    let validationSchema=Yup.object({
        email:Yup.string().email("Invalid email format").required("Email is required"),
        newPassword:Yup.string().matches(/^[A-Za-z][a-zA-Z0-9]{5,10}$/, "Password must start with a letter and be 6-11 characters long").required("Password is required"),
    })

    let formik = useFormik({
        initialValues: {
         
           email:'',
           newPassword:''
        },
        validationSchema,
        onSubmit:restCode, 
    });

  return <>

    <div className="container mt-5 pt-5">
        <div className="row justify-content-center align-items-center vh-50">
            <div className="col-md-5 text-center forgotPass mb-4">
                <h3 className='text-center pt-3'>Reset Password</h3>
                {error ? <div className="alert alert-danger p-2 mt-2">{error}</div> : null}
               
                             <form onSubmit={formik.handleSubmit}>
                               {/* Email Input */}
                               <label htmlFor="email" className="text-gray-900p fw-bolder py-2">Email</label>
                               <input
                                 type="email"
                                 name="email"
                                 onBlur={formik.handleBlur}
                                 onChange={formik.handleChange}
                                 value={formik.values.email}
                                 className="form-control mb-2"
                                 id="email"
                               />
                               {formik.errors.email && formik.touched.email ? (
                                 <div className="alert alert-danger p-2 mt-2">{formik.errors.email}</div>
                               ) : null}
               
                               {/* Password Input with Eye Icon */}
                               <label htmlFor="newPassword" className="text-gray-900p fw-bolder py-2"> New Password</label>
                               <div className="input-group mb-3">
                                 <input
                                   type="text" 
                                   name="newPassword"
                                   onBlur={formik.handleBlur}
                                   onChange={formik.handleChange}
                                   value={formik.values.newPassword}
                                   className="form-control border-end-0"
                                   id="newPassword"
                                 />
                                 
                               </div>
                               {formik.errors.newPassword && formik.touched.newPassword ? (
                                 <div className="alert alert-danger p-2 mb-4">{formik.errors.newPassword}</div>
                               ) : null}
               
                               {/* Submit Button */}
                               {isLoading ? (
                                 <button className="btn bg-main text-white w-100 mt-4">
                                   <FallingLines color="#fff" width="20" visible={true} ariaLabel="falling-circles-loading" />
                                 </button>
                               ) : (
                                 <button
                                   disabled={!(formik.isValid && formik.dirty)}
                                   type="submit"
                                   className="btn bg-main ps-1 mb-2 text-white w-100"
                                 >
                                   Confirm 
                                 </button>
                               )}
                      </form>
            </div>
        </div>
    </div>
  
  </>


}
