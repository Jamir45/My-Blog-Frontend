import React from 'react';
import { Avatar, Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import LikeCommentHandler from '../../../../ContextProvider/Handler/LikeCommentHandler';

const CommentReplay = (props) => {
   const {userData, mainComment, firstReplay, secondReplay, articleId, commentId} = props;
   const {writeComment, replayOnComment} = LikeCommentHandler()

   const { register, handleSubmit, errors, watch } = useForm();
   const onSubmit = (data, e) => { 
      if (userData && mainComment) {
         if (data.userComment) {
            writeComment(data, articleId)
         }
      } else if (userData && firstReplay) {
         if (data.userComment) {
            console.log(data.userComment+'First Replay')
            replayOnComment(data, commentId)
         }
      } else if (userData && secondReplay) {
         console.log(data.userComment+'Second Replay')
         if (data.userComment) {
            console.log(data.userComment+'First Replay')
            replayOnComment(data, commentId)
         }
      }
      e.target.reset();
   }

   return (
      <div className="commentDiv">
         <Avatar src={userData && userData.profilePic} />
         <form className="commentWriteBox" onSubmit={handleSubmit(onSubmit)}>
            <textarea 
               rows="3"
               type="text"
               name='userComment'
               ref={register()}
               className='form-control' 
               placeholder="Write Your Comment" 
            />
            <Button type="submit">Submit</Button>
         </form>
      </div>
   );
};

export default CommentReplay;