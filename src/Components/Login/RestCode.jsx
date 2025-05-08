import React ,{useState }from 'react'
import  { useFormik} from "formik";
import axios from 'axios';
import * as Yup from "yup";
import { FallingLines } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function RestCode() {


 const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

let navigate = useNavigate();



  function restCode( values){
    setIsLoading(true)

    return axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,values)
    .then(res=> {
        setIsLoading(false);
      

        if(res.data.status  === 'Success' )
            
            {
              navigate('/resetpass')
              
            

                
              toast.success('Reset code verified successfully', {className: 'bg-black text-white',} )
              // ,{ icon: '👏',  className: 'fw-semiblod',}
            }
            else{
              toast.error('please try again')
            }
    })
    .catch((err)=>{
        setIsLoading(false)
        // console.log(err.response.data.message);
        setError(err.response.data.message);
    });
   
     

    
    
  }

  

    let validationSchema=Yup.object({
        resetCode: Yup.string()
      .required(' Rest Code is required')
      .matches(/^[0-9]{6}$/, 'Reset Code must be 6 digits'),
    })

    let formik = useFormik({
        initialValues: {
         
            resetCode: "",
        },
        validationSchema,
        onSubmit:restCode, 
    });

  return <>

    <div className="container mt-5 pt-5">
        <div className="row justify-content-center align-items-center vh-50">
            <div className="col-md-5 text-center forgotPass mb-4">
                <h3 className='text-center pt-3'> Confirm Code  </h3>
                {error ? <div className='alert alert-danger mt-2 p-2 '>{error}</div> : null}
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-3 ">
                        <label htmlFor="resetCode" className="form-label">Confirm Code :</label>
                        <input type="text" className="form-control" id="resetCode" name='resetCode' onChange={formik.handleChange} value={formik.values.resetCode} onBlur={formik.handleBlur} />
                        {formik.errors.resetCode && formik.touched.resetCode ? (<div className='alert alert-danger mt-2 p-2 '>{formik.errors.resetCode}</div>) : null}
                    </div>
                    {isLoading ? <>  <button className="btn bg-main text-white w-100 mt-4">
                                        <FallingLines color="#fff" width="20" visible={true} ariaLabel="falling-circles-loading" />
                                      </button></> : <> <button
                    disabled={!(formik.isValid && formik.dirty)}
                    type="submit"
                    className="btn bg-main ps-1 mb-2 text-white w-100 my-2"
                  >
                     Verify Code
                  </button></>}
                </form>
            </div>
        </div>
    </div>
  
  </>


}
