import React from 'react';
import { Button, FormControl, IconButton, Input, InputAdornment, InputLabel, LinearProgress, TextField, FormControlLabel, Checkbox } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import useStyles from './SigninFormStyle.js'
import { useContextData } from '../../ContextProvider/ContextProvider.js';

const SigninForm = (props) => {
   const {formLoader, setFormLoader} = useContextData()
   const {values, handleSubmit, onSubmit, setValues} = props;
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
               label="Email" 
               required
               value={values.email}
               onChange={handleChange('email')}
            />
         </div>

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
               value={values.password}
               required
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
         </FormControl>
         <div className="d-flex justify-content-between">
            <FormControlLabel
               value="Remember Me"
               control={<Checkbox color="primary" />}
               label="Remember Me"
               labelPlacement="Remember Me"
            />
            <span>
               <Link to="/password/reset">Forgot Password.?</Link>
            </span>
         </div>
         <Button  
            type="submit" 
            variant="contained"
            className='singUpOrSignIn mt-3' 
            onClick={() => setFormLoader(true)}
         >
            Submit
         </Button>

         <div className='massage'>
            <p>Create an account? <Link to='/signup'>Sign Up</Link></p>
         </div>
      </form>
   );
};

export default SigninForm;