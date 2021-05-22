import { Avatar } from '@material-ui/core';
import { DriveEta } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PopularArticleHome = ({allUsers, articles}) => {
   const {_id, author, title, likes, dislikes, comments, readTime, createdAt} = articles

   const [articleAuthor, setArticleAuthor] = useState(null)
   useEffect(() => {
      if (allUsers) {
         const Author = allUsers.find(user => user._id === author._id)
         setArticleAuthor(Author)
      }
   }, [allUsers])

   return (
      <div className="popularArticleDiv">
         <Link to={`/article/details/${_id}`}>{title}</Link>
         <div className="popularArticleDetails">
            {/* <Avatar alt="Remy Sharp" src={articleAuthor && articleAuthor.profilePic} /> */}
            <Avatar alt="Remy Sharp" src={author.profilePic} />
            <div className="popularArticleControl">
               <div className='nameDiv'>
                  <span className='userName'>
                     <Link to={`/article-author/profile/${author._id}`} >
                        {author.username}
                     </Link> 
                  </span>
                  <span>{readTime}</span>
               </div>
               <div className='likeDislike'>
                  <span>{likes.length} Likes</span>
                  <span>{dislikes.length} Dislikes</span>
                  <span>{comments.length} Comments</span>
               </div>
            </div>
         </div>
      </div>
   );
};

export default PopularArticleHome;