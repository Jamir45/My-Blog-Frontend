import React, { useEffect, useState } from 'react';
import { Paper, Button, Avatar} from '@material-ui/core';
import { useContextData } from '../ContextProvider/ContextProvider';
import { Link } from 'react-router-dom';
import LikeCommentHandler from '../ContextProvider/Handler/LikeCommentHandler';

const BookmarkArticle = ({article}) => {
   const {allUsers} = useContextData()
   const {bookmarkPost} = LikeCommentHandler()
   const {_id, author, title, readTime, createdAt, tags} = article
   const toDate = new Date(createdAt).toDateString().slice(4)

   const [articleAuthor, setArticleAuthor] = useState(null)
   useEffect(() => {
      if (allUsers) {
         const data = allUsers.find(user => user._id === author)
         setArticleAuthor(data)
      }
   }, [allUsers])

   return (
      <div className="bookmarkSection">
         <div className="bookmarkContent">
            <Avatar src={articleAuthor && articleAuthor.profilePic} />
            <div className='content'>
               <h5> 
                  <Link to={`/article/details/${_id}`}>
                     {title}
                  </Link> 
               </h5>
               <p>
                  <span>
                     <b>{articleAuthor && articleAuthor.username}</b>
                  </span>
                  <span>{toDate}</span>
                  <span>{readTime}</span>
                  <div>
                     {
                        tags && tags.map(tag => {
                           return <span> #<Link to=''>{tag}</Link> </span>
                        })
                     }
                  </div>
               </p>
            </div>
         </div>
         <div className='removeBtnBox'>
            <Button 
               color="secondary"
               variant="contained" 
               onClick={() => bookmarkPost(_id, 'bookmark')}
            >
               Remove
            </Button>
         </div>
      </div>
   );
};

export default BookmarkArticle;