import { CircularProgress, Paper } from '@material-ui/core';
import React from 'react';

const FormLoading = () => {
   return (
      <Paper className="formLoader" elevation={1}>
         <div className="text-center">
            <CircularProgress color="secondary" /><br/>
            <strong>Please Wait A Moment</strong>
         </div>
      </Paper>
   );
};

export default FormLoading;