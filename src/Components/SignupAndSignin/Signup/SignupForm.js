import React, { useEffect } from 'react';
import { Button, FormControl, FormControlLabel, FormLabel, IconButton, Input, InputAdornment, InputLabel, LinearProgress, Radio, RadioGroup, TextField } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import useStyles from './SignupFormStyle'
import { useContextData } from '../../ContextProvider/ContextProvider';


const SignupForm = (props) => {
   const {values, handleSubmit, onSubmit, setValues} = props
   const {signupErrors, setSignupErrors} = useContextData()
   // const { email, gender, password, confirm_password} = signupErrors && signupErrors
   useEffect(() => {
      if (signupErrors) {
         setTimeout( () => {
            setSignupErrors()
         }, 3000)
      }
   }, [signupErrors])

   const classes = useStyles();
   const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
   };
   const handleClickShowPassword = () => {
      setValues({ ...values, showPassword: !values.showPassword });
   };
   const handleMouseDownPassword = (event) => {
      event.preventDefault();
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div>
            <TextField 
               className='form-control my-3'
               id="standard-basic" 
               label="First Name" 
               required
               value={values.firstName}
               onChange={handleChange('firstName')}
            />
         </div>

         <div>
            <TextField 
               className='form-control my-3'
               id="standard-basic" 
               label="Last Name" 
               required
               value={values.lastName}
               onChange={handleChange('lastName')}
            />
         </div>

         <div>
            <TextField 
               className='form-control my-3'
               id="standard-basic" 
               label="Email" 
               required
               value={values.email}
               onChange={handleChange('email')}
            />
            { signupErrors && <span className='Error'>{signupErrors.email}</span> }
         </div>

         <FormControl className={classes.formControl}>
            <FormLabel>Gender</FormLabel>
            <RadioGroup
               aria-label="Gender"
               name="gender"
               required
               value={values.gender}
               onChange={handleChange('gender')}
            >
               <FormControlLabel 
                  value="female" 
                  control={<Radio />} 
                  label="Female" 
               />
               <FormControlLabel 
                  value="male" 
                  control={<Radio />} 
                  label="Male" 
               />
               <FormControlLabel 
                  value="other" 
                  control={<Radio />} 
                  label="Other" 
               />
            </RadioGroup>
            { signupErrors && <span className='Error'>{signupErrors.gender}</span> }
         </FormControl>

         <FormControl className={classes.textField+' passwordField'} variant="filled">
            <InputLabel
               className='passwordLabel'
               htmlFor="password"
            >
               Password
            </InputLabel>
            <Input
               id="password"
               type={values.showPassword ? 'text' : 'password'}
               required
               value={values.password}
               onChange={handleChange('password')}
               endAdornment={
               <InputAdornment position="end">
                  <IconButton
                     aria-label="toggle password visibility"
                     onClick={handleClickShowPassword}
                     onMouseDown={handleMouseDownPassword}
                  >
                     {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
               </InputAdornment>
               }
            />
            { signupErrors && <span className='Error'>{signupErrors.password}</span> }
         </FormControl>

         <FormControl className={classes.textField+' passwordField'} variant="filled">
            <InputLabel
               className='passwordLabel'
               htmlFor="confirmPassword"
            >
               Confirm Password
            </InputLabel>
            <Input
               id="confirmPassword"
               type={values.showPassword ? 'text' : 'password'}
               value={values.confirmPassword}
               required
               onChange={handleChange('confirmPassword')}
               endAdornment={
               <InputAdornment position="end">
                  <IconButton
                     aria-label="toggle password visibility"
                     onClick={handleClickShowPassword}
                     onMouseDown={handleMouseDownPassword}
                  >
                     {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
               </InputAdornment>
               }
            />
            { signupErrors && <span className='Error'>{signupErrors.confirm_password}</span> }
         </FormControl>

         {/* {
            formLoader && <LinearProgress className='my-3' />  
         } */}
         
         <Button className='singUpOrSignIn mt-3' type="submit" variant="contained">Submit</Button>

         <div className='massage'>
            <p>Already have an account? <Link to='/login'><span>Sign In</span></Link></p>
         </div>
      </form>
   );
};

export default SignupForm;