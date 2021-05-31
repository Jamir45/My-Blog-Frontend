import { Paper } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useContextData } from '../ContextProvider/ContextProvider';
import BookmarkArticle from './BookmarkArticle';

const Bookmarks = () => {
   const {allArticles, userData} = useContextData()

   const [bookmarks, setBookmarks] = useState(null)
   useEffect(() => {
      if (allArticles && userData) {
         const bookmarksArray = []
         userData.bookmarks.filter(data => {
            const bookmarks = allArticles.find( article => article._id === data)
            bookmarksArray.push(bookmarks)
         })
         setBookmarks(bookmarksArray)
      }
   }, [userData])

   return (
      <div className='container BookmarkPage'>
         <div className="row">
            <div className="col-md-1"></div>
            <Paper className='col-md-10' elevation={1} >
               {
                  bookmarks && 
                  bookmarks.map(article => <BookmarkArticle article={article} /> )
               }
            </Paper>
            <div className="col-md-1"></div>
         </div>
      </div>
   );
};

export default Bookmarks;