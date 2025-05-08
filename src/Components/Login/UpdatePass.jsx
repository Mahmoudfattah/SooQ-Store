
import React, { useContext, useState } from "react";
import  { useFormik} from "formik";
import axios from 'axios';
import * as Yup from "yup";
import { FallingLines } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../../Context/UserContext";

export default function UpdatePass() {

    const { userToken, setUserToken, userDetails, setUserDetails } = useContext(UserContext);

    let headers = {
      token:localStorage.getItem('userToken')
    }


    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
     

 let navigate = useNavigate();



  function changeMyPassword( values){
    setIsLoading(true)

    return axios.put(`https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`,values , {
      headers
    })
    .then(res=> {
        setIsLoading(false);
        
        

        if(res.statusText  === "OK" )
            
            {
              
             
              navigate('/login')
           
              localStorage.removeItem('userToken');
             
              setUserToken(null);
              setUserDetails(null)
                
              
            

                
              toast.success('password updated successfully please login again!', {className: 'bg-black text-white',} )
              // ,{ icon: '👏',  className: 'fw-semiblod',}
            }
           
    })
    .catch((err)=>{
    
       
       

      
            
           
              
              setIsLoading(false);
              const errorMsg = err.response?.data?.message || 'حدث خطأ، حاول مرة أخرى';
              setError(errorMsg);
              toast.error(errorMsg, { className: 'bg-black text-white' });
           
        
          
         
    });
   
    
  }

  

    let validationSchema=Yup.object({
        currentPassword:Yup.string().matches(/^[A-Za-z][a-zA-Z0-9]{5,10}$/, "Password must start with a letter and be 6-11 characters long").required("Current Password is required"),
        password:Yup.string().matches(/^[A-Za-z][a-zA-Z0-9]{5,10}$/, "Password must start with a letter and be 6-11 characters long").required("Password is required"),
        rePassword:Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
    })

    let formik = useFormik({
        initialValues: {
         
           currentPassword:'',
           password:'',
           rePassword:''
        },
        validationSchema,
        onSubmit:changeMyPassword, 
    });

  return <>

    <div className="container mt-5 pt-5">
        <div className="row justify-content-center align-items-center vh-50">
            <div className="col-md-5 text-center forgotPass mb-4">
                <h3 className='text-center pt-3'>Change Password</h3>
                {error ? <div className="alert alert-danger p-2 mt-2">{error}</div> : null}
               
                             <form onSubmit={formik.handleSubmit}>
                              
                               {/* Password Input with Eye Icon */}
                               <label htmlFor="currentPassword" className="text-gray-900p fw-bolder py-2"> Current Password</label>
                               <div className="input-group mb-3">
                                 <input
                                   type="text" 
                                   name="currentPassword"
                                   onBlur={formik.handleBlur}
                                   onChange={formik.handleChange}
                                   value={formik.values.currentPassword}
                                   className="form-control border-end-0"
                                   id="currentPassword"
                                 />
                                 
                               </div>
                               {formik.errors.currentPassword && formik.touched.currentPassword ? (
                                 <div className="alert alert-danger p-2 mb-4">{formik.errors.currentPassword}</div>
                               ) : null}
                               <label htmlFor="password" className="text-gray-900p fw-bolder py-2"> New Password</label>
                               <div className="input-group mb-3">
                                 <input
                                   type="text" 
                                   name="password"
                                   onBlur={formik.handleBlur}
                                   onChange={formik.handleChange}
                                   value={formik.values.password}
                                   className="form-control border-end-0"
                                   id="password"
                                 />
                                 
                               </div>
                               {formik.errors.password && formik.touched.password ? (
                                 <div className="alert alert-danger p-2 mb-4">{formik.errors.password}</div>
                               ) : null}
                               <label htmlFor="rePassword" className="text-gray-900p fw-bolder py-2">  Confirm Password</label>
                               <div className="input-group mb-3">
                                 <input
                                   type="text" 
                                   name="rePassword"
                                   onBlur={formik.handleBlur}
                                   onChange={formik.handleChange}
                                   value={formik.values.rePassword}
                                   className="form-control border-end-0"
                                   id="rePassword"
                                 />
                                 
                               </div>
                               {formik.errors.rePassword && formik.touched.rePassword ? (
                                 <div className="alert alert-danger p-2 mb-4">{formik.errors.rePassword}</div>
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
