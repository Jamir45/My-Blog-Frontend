import { Paper } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useContextData } from '../ContextProvider/ContextProvider';
import LikeCommentHandler from '../ContextProvider/Handler/LikeCommentHandler';
import BookmarkArticle from './BookmarkArticle';

const Bookmarks = () => {
   const {bookmarkPost} = LikeCommentHandler()
   const {user, allArticles, userData} = useContextData()

   const [bookmarks, setBookmarks] = useState(null)
   console.log(bookmarks)
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
      <div className='container'>
         <div className="row pt-3">
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