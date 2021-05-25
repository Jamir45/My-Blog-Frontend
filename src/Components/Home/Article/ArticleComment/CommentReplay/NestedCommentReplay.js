import React, { useState } from 'react';
import { Avatar, Button } from '@material-ui/core';
import CommentReplay from './CommentReplay';
import moment from 'moment';


const NestedCommentReplay = (props) => {
   const {userData, articleId, commentId, commentReplay} = props;
   const {_id, user, replay, commentAt} = commentReplay
   const postedOn = moment(commentAt).fromNow()
   // const toTime = new Date(commentAt).toLocaleString()
   const [nestedReplayOpen, setNestedReplayOpen] = useState(null)

   return (
      <div className="commentReplayBox">
         <Avatar src={user && user.profilePic} />
         <div className="commentReplay">
            <div className='titleBar'>
               <p> {user && user.username} </p>
               <p> {postedOn} </p>
            </div>
            <p className='replayBody'> 
               {replay}
            </p>
            <div className='replay'> 
               <span>Like</span> 
               {
                  !nestedReplayOpen ? 
                  <span onClick={() => setNestedReplayOpen(_id)}>
                     Replay
                  </span> :
                  <span 
                     onClick={() => setNestedReplayOpen(null)}
                  >
                     Cancel Replay
                  </span> 
               }
            </div>
            {
               nestedReplayOpen === _id &&
               <CommentReplay 
                  commentId={commentId}
                  userData={userData}
                  articleId={articleId} 
                  secondReplay='secondReplay' 
               />
            }
         </div>
      </div>
   );
};

export default NestedCommentReplay;