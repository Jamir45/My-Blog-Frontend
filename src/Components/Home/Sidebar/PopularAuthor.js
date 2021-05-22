import { Avatar, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PopularAuthor = (props) => {
   const { author, allArticles } = props;
   // console.log(allArticles)

   const [authorLikes, setAuthorLikes] = useState(null)
   const [authorComments, setAuthorComments] = useState(null)
   
   useEffect(() => {
      if (author && allArticles) {
         const article = allArticles.filter(data => data.author._id === author._id)
         if (article) {
            let likes = 0
            let comments = 0
            for (let i = 0; i < article.length; i++) {
               const element = article[i];
               likes = element.likes.length + likes
               comments = element.comments.length + comments
            }
            setAuthorLikes(likes)
            setAuthorComments(comments)
         }
      }
   }, [author && allArticles])
   // console.log(authorLikes)
   // console.log(authorComments)
   // const {_id, title, likes, dislikes, comments, readTime, createdAt} = articles

   return (
      <div className="popularArticleDetails">
         <Avatar alt="Remy Sharp" src={author.profilePic} />
         <div className="popularArticleControl">
            <div className='nameDiv'>
               <span className='userName'>
                  <Link to={`/article-author/profile/${author._id}`} >
                     {author.username}
                  </Link> 
               </span>
               <Button variant='contained'>
                  <Link to={`/article-author/profile/${author._id}`} >
                     View Profile
                  </Link>
               </Button>
            </div>
            <div className='likeDislike'>
               <span>{author.posts.length} Articles</span>
               <span>{authorLikes} Likes</span>
               <span>{authorComments} Comments</span>
            </div>
         </div>
      </div>
   );
};

export default PopularAuthor;