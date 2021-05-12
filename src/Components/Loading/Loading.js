import { CircularProgress, makeStyles, Paper } from '@material-ui/core';
import React from 'react';

const ComponentLoading = () => {
   return (
      <Paper className="pageLoader" elevation={1}>
         <div className="text-center">
            <CircularProgress color="secondary" /><br/>
            <strong>Loading...</strong>
         </div>
      </Paper>
   );
};

export default ComponentLoading;