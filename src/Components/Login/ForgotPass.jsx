import React ,{useState }from 'react'
import  { useFormik} from "formik";
import axios from 'axios';
import * as Yup from "yup";
import { FallingLines } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function ForgotPass() {


 const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
let navigate = useNavigate();



  function forgotPass( values){
    setIsLoading(true)

    return axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,values)
    .then(res=> {
        setIsLoading(false);
      

        if(res.data.statusMsg  === 'success' )
            {

                navigate('/restcode')
              toast.success('Reset code sent to your email'  , {className: 'bg-black text-white',} )
              // ,{ icon: '👏',  className: 'fw-semiblod',}
            }
            else{
              toast.error('please try again')
            }
    })
    .catch((err)=>{
        setIsLoading(false)
        
       
        setError(err);
    });
   
     

    
    
  }

  

    let validationSchema=Yup.object({
        email:Yup.string().email("Invalid email format").required("Email is required"),
    })

    let formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema,
        onSubmit: forgotPass,
    });

  return <>

    <div className="container mt-5 pt-5">
        <div className="row justify-content-center align-items-center vh-50">
            <div className="col-md-5 text-center forgotPass mb-4">
                <h3 className='text-center pt-3'>Forgot Password</h3>
                {error ? <div className='alert alert-danger mt-2 p-2 '>{error}</div> : null}
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-3 ">
                        <label htmlFor="email" className="form-label">Email address :</label>
                        <input type="email" className="form-control" id="email" name='email' onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} />
                        {formik.errors.email && formik.touched.email ? (<div className='alert alert-danger mt-2 p-2 '>{formik.errors.email}</div>) : null}
                    </div>
                    {isLoading ? <>  <button className="btn bg-main text-white w-100 mt-4">
                                        <FallingLines color="#fff" width="20" visible={true} ariaLabel="falling-circles-loading" />
                                      </button></> : <> <button
                    disabled={!(formik.isValid && formik.dirty)}
                    type="submit"
                    className="btn bg-main ps-1 mb-2 text-white w-100 my-2"
                  >
                   Send Code
                  </button></>}
                </form>
            </div>
        </div>
    </div>
  
  </>


}
