import { Avatar } from '@material-ui/core';
import { DriveEta } from '@material-ui/icons';
import React from 'react';
import { Link } from 'react-router-dom';

const PopularArticleHome = ({articles}) => {
   const {_id, author, title, likes, dislikes, comments, readTime, createdAt} = articles
   return (
      <div className="popularArticleDiv">
         <Link to={`/article/details/${_id}`}>{title}</Link>
         <div className="popularArticleDetails">
            <Avatar alt="Remy Sharp" src={author.profilePic} />
            <div className="popularArticleControl">
               <div className='nameDiv'>
                  <span><b>{author.username}</b></span>
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