import React from 'react';
import { Button, IconButton, InputAdornment, Paper, TextField } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { useContextData } from '../ContextProvider/ContextProvider';
import FormLoading from '../Loading/FormLoading';
import UserHandler from '../ContextProvider/Handler/UserHandler';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import NewPasswordForm from './NewPasswordForm';

const PasswordReset = () => {
   const history = useHistory()
   const {resetToken} = useParams()
   const {formLoader, setFormLoader, toastMessage} = useContextData()
   const {resetPassword, setNewPassword} = UserHandler()

   const [values, setValues] = React.useState({email: ''});
   const handleChange1 = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
   };

   const [password, setPassword] = React.useState({
      password: '',
      confirmPassword: '',
      showPassword: false
   });

   const { handleSubmit } = useForm();
   const onSubmit = () => {
      setFormLoader(true)
      if (resetToken) {
         console.log(password)
         setNewPassword(resetToken, password)
      } else {
         console.log(values)
         resetPassword(values.email)
      }
   };

   return (
      <div className='container row mx-auto passwordReset'>
         {toastMessage()}
         <div className='col-md-6 mx-auto p-0'>
            <Paper className='resetPaper' elevation={3}>
               <h5><Visibility />{resetToken ? "Set Your New Password" : "Provide Your Account to Reset Your Password"}</h5>
               <form onSubmit={handleSubmit(onSubmit)}>
                  {
                     resetToken ?
                     <>
                     <NewPasswordForm password={password} setPassword={setPassword} />
                     
                     </> :
                     <TextField 
                        className='form-control my-3'
                        id="standard-basic" 
                        label="Type Your Email" 
                        required
                        value={values.email}
                        onChange={handleChange1('email')}
                     />
                  }
                  <Button 
                     type="submit" 
                     variant="contained"
                     className='submitBtn mt-3'
                     disabled={
                        password.password !== "" && password.confirmPassword !== "" && 
                        password.password !== password.confirmPassword && true
                     }
                  >
                     Submit
                  </Button>
               </form>
            </Paper>
            {
               formLoader && <FormLoading/>  
            }
         </div>
      </div>
   );
};

export default PasswordReset;