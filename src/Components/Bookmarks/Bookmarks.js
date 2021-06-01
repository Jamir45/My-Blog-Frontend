import { Paper } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useContextData } from '../ContextProvider/ContextProvider';
import ComponentLoading from '../Loading/Loading';
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
            <div className='col-md-10'>
               <Paper className='bookmarks' elevation={1} >
                  {
                     bookmarks && bookmarks.length > 0 &&
                     bookmarks.map(article => <BookmarkArticle article={article} /> )
                  }
                  {
                     !bookmarks && <ComponentLoading />
                  }
               </Paper>
               {
                  bookmarks && bookmarks.length === 0 && 
                  <div className="notBookmark">
                     <h4>Not added any bookmark Yet</h4>
                  </div>
               }
            </div>
            <div className="col-md-1"></div>
         </div>
      </div>
   );
};

export default Bookmarks;