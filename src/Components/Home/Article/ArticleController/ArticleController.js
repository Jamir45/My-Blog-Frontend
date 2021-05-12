import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faCommentAlt, faThumbsDown, faThumbsUp } from '@fortawesome/free-regular-svg-icons'
import LikeCommentHandler from '../../../ContextProvider/Handler/LikeCommentHandler';

const ArticleController = (props) => {
   const {articleComments, user, _id, likes, dislikes} = props;
   const {likeDislikePost} = LikeCommentHandler()

   const [commented, setCommented] = useState(null)
   useEffect(() => {
      if (articleComments && user) {
         const commentedUser = articleComments.find(comment => comment.user._id === user.userId)
         setCommented(commentedUser)
      }
   }, [articleComments])

   const [liked, setLiked] = useState(null)
   useEffect(() => {
      if (likes && user) {
         const likedUser = likes.find(like => like === user.userId)
         setLiked(likedUser)
      }
   }, [likes])

   const [disliked, setDisliked] = useState(null)
   useEffect(() => {
      if (dislikes && user) {
         const likedUser = dislikes.find(dislike => dislike === user.userId)
         setDisliked(likedUser)
      }
   }, [dislikes])

   return (
      <div className="d-flex justify-content-evenly articleControl">
         <Button 
            className={liked && 'clicked'} 
            onClick={() => likeDislikePost(_id, 'like')} 
         >
            {likes.length}
            <FontAwesomeIcon icon={faThumbsUp} />
            {liked ? 'Liked' : 'Like'}
         </Button>
         <Button 
            className={disliked && 'clicked'} 
            onClick={() => likeDislikePost(_id, 'dislike')} 
         > 
            {dislikes.length}
            <FontAwesomeIcon icon={faThumbsDown} />
            {disliked ? 'Disliked' : 'Dislike'}
         </Button>
         <Link to={`/article/details/${_id}`}>
            <Button className={commented && 'clicked'}> 
               {articleComments.length}
               <FontAwesomeIcon icon={faComment} />
               Comments
            </Button>
         </Link> 
      </div>
   );
};

export default ArticleController;