import { Paper } from '@material-ui/core';
import React from 'react';
import { useContextData } from '../ContextProvider/ContextProvider';
import BookmarkArticle from './BookmarkArticle';

const Bookmarks = () => {
   const {userData} = useContextData()

   return (
      <div className='container'>
         <div className="row">
            <div className="col-md-1"></div>
            <Paper className='col-md-10' elevation={1} >
               {
                  userData && 
                  userData.bookmarks.map(article => <BookmarkArticle article={article} /> )
               }
            </Paper>
            <div className="col-md-1"></div>
         </div>
      </div>
   );
};

export default Bookmarks;