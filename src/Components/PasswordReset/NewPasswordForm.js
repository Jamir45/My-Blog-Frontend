import React from 'react';
import { Button, FormControl, FormControlLabel, FormLabel, IconButton, Input, InputAdornment, InputLabel, LinearProgress, Radio, RadioGroup, TextField } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

const NewPasswordForm = (props) => {
   const {password, setPassword} = props

   const handleChange = (prop) => (event) => {
      setPassword({ ...password, [prop]: event.target.value });
   };
   const handleClickShowPassword = () => {
      setPassword({ ...password, showPassword: !password.showPassword });
   };
   const handleMouseDownPassword = (event) => {
      event.preventDefault();
   };

   return (
      <>
         <FormControl className='form-control my-3' variant="filled">
            <InputLabel>Password</InputLabel>
            <Input
               required
               value={password.password}
               type={password.showPassword ? 'text' : 'password'}
               onChange={handleChange('password')}
               endAdornment={
               <InputAdornment position="end">
                  <IconButton
                     aria-label="toggle password visibility"
                     onClick={handleClickShowPassword}
                     onMouseDown={handleMouseDownPassword}
                  >
                     {password.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
               </InputAdornment>
               }
            />
         </FormControl>

         <FormControl className='form-control my-3' variant="filled">
            <InputLabel>Confirm Password</InputLabel>
            <Input
               required
               type={password.showPassword ? 'text' : 'password'}
               value={password.confirmPassword}
               onChange={handleChange('confirmPassword')}
               endAdornment={
               <InputAdornment position="end">
                  <IconButton
                     aria-label="toggle password visibility"
                     onClick={handleClickShowPassword}
                     onMouseDown={handleMouseDownPassword}
                  >
                     {password.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
               </InputAdornment>
               }
            />
         </FormControl>
         { 
            password.password !== "" && password.confirmPassword !== "" && 
            password.password !== password.confirmPassword
            && 
            <span className='Error'>
               Confirm password is not match
            </span> 
         }
      </>
   );
};

export default NewPasswordForm;