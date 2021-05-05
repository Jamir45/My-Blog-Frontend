import React, { useState } from 'react';
import { Paper } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import { useContextData } from '../../ContextProvider/ContextProvider';
import CommonForm from '../CommonForm';
import SigninForm from './SigninForm';
import UserHandler from '../../ContextProvider/Handler/UserHandler';



const Signin = () => {
   const { toastMessage, formLoader, setFormLoader} = useContextData()

   const history = useHistory();
   const location = useLocation();
   const from = location.state ? `${location.state.from.pathname}` : "/";
   // let { from } = location.state || { from: { pathname: "/" } };
   const redirect = () => {
      // history.replace(from)
      history.push(from)
   }

   const [values, setValues] = React.useState({
      email: '',
      password: '',
   });

   const { handleSubmit } = useForm();
   const [errors, setErrors] = useState(null)
   console.log(errors)

   const {userSignin} = UserHandler()
   const onSubmit = async () => {
      const {email, password} = values
      setFormLoader(true)
      userSignin(email, password, setErrors)
   };

   return (
      <div className="container">
         {toastMessage()}
         <div className='row signUpSingInForm'>
            <div className='col-md-3'></div>
            <div className='col-md-6'>
               <Paper className='signupPaper mb-5' elevation={3}>
                  <div className="text-center">
                     <h5 className='Title'>Sign In On Your Account</h5>
                  </div>
                  <SigninForm
                     values={values}
                     setValues={setValues}
                     handleSubmit={handleSubmit}
                     onSubmit={onSubmit}
                  ></SigninForm>

                  {/* <div className='row orOptionDiv'>
                     <span className='orOption col-5'></span>
                     <span className='col-2 text-center'>OR</span>
                     <span className='orOption col-5'></span>
                  </div>
                  <CommonForm></CommonForm> */}
               </Paper>
            </div>
            <div className='col-md-3'></div>
         </div>
      </div>
   );
};

export default Signin;