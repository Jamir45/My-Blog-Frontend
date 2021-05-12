import { LinearProgress, Paper } from '@material-ui/core';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useContextData } from '../../ContextProvider/ContextProvider';
import SignupForm from './SignupForm';
import UserHandler from '../../ContextProvider/Handler/UserHandler';
import FormLoading from '../../Loading/FormLoading';

const Signup = () => {
   const {toastMessage, formLoader} = useContextData()
   const {userSignup} = UserHandler()
   
   const [values, setValues] = useState({
      firstName: '',
      lastName: '',
      email: '',
      gender: '',
      password: '',
      confirmPassword: '',
      showPassword: false,
   });


   const { handleSubmit } = useForm();
   const onSubmit = () => {
      console.log(values);
      userSignup(values)
   };

   return (
      <div className="container">
         {toastMessage()}
         <div className='row signUpSingInForm'>
            <div className='col-md-3'></div>
            <div className='col-md-6'>
               <Paper className='signupPaper' elevation={3}>
                  <div className="text-center">
                     <h5 className='Title'>Create an account</h5>
                  </div>

                  <SignupForm
                     values={values}
                     setValues={setValues}
                     handleSubmit={handleSubmit}
                     onSubmit={onSubmit}
                     formLoader={formLoader}
                  ></SignupForm>   

                  {/* <div className='row orOptionDiv'>
                     <span className='orOption col-5'></span>
                     <span className='col-2 text-center'>OR</span>
                     <span className='orOption col-5'></span>
                  </div>
                  <CommonForm></CommonForm> */}
               </Paper>
               {
                  formLoader && <FormLoading />
               }
            </div>
            <div className='col-md-3'></div>
         </div>
      </div>
   );
};

export default Signup;