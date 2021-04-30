import React, { useEffect } from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { Button, Paper } from '@material-ui/core';
import { useContextData } from '../ContextProvider/ContextProvider';
import axios from "axios"
import { toast } from 'react-toastify';

const ActivateAccount = ({setHeader}) => {
   useEffect(() => {
      setHeader(false)
   }, [])
   
   const {toastMessage} = useContextData()
   const params = useParams()
   const history = useHistory()

   const url = 'http://localhost:3005/user'
   const activateHandler = async () => {
      const result = await axios.post(url+'/activation', {token:params.userToken})
      console.log(result.data)
      if (result.data.success) {
         toast.success(result.data.success)
         setTimeout(() => {
            history.push('/login')
         }, 1000)
         // window.location.pathname('/login')
      } else {
         toast.error(result.data.error)
      }
   }

   return (
      <div className="container">
         {toastMessage()}
         <div className="row">
            <div className='col-md-3'></div>
            <Paper className='accountActive col-md-6' elevation={3}>
               <h4>Please Click Activate Button To Activate Your Account</h4>
               <Button 
                  className='activeBtn' 
                  type="submit" 
                  variant="contained"
                  onClick={activateHandler}
               >
                  Activate Account
               </Button>
            </Paper>
            <div className='col-md-3'></div>
         </div>
         
      </div>
   );
};

export default ActivateAccount;