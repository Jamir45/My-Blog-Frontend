import { Avatar, Button } from '@material-ui/core';
import React, { useRef, useState } from 'react';
import { useContextData } from '../../../ContextProvider/ContextProvider';
import CommentReplay from './CommentReplay/CommentReplay';
import NestedCommentReplay from './CommentReplay/NestedCommentReplay';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';

const ArticleComment = ({articleId}) => {
   const {userData, allComments, setAllComments} = useContextData()
   const articleComments = allComments && allComments.filter(comment => comment.post === articleId)

   const [showReplay, setShowReplay] = useState(null)
   const [allShowReplay, setAllShowReplay] = useState(null)
   console.log(allShowReplay)
   const [replayBoxOpen, setReplayBoxOpen] = useState(null)

   return (
      <div className='articleComment'>
         <label htmlFor="">Write Comment</label>
         <CommentReplay 
            articleId={articleId} 
            mainComment='mainComment'
            userData={userData} 
         />
         {
            articleComments && articleComments.map(commentData => {
               const {_id, comment, user, replies, createdAt} = commentData;
               const toTime = new Date(createdAt).toLocaleString()
               return <div className="showComment">
                  <Avatar src={user && user.profilePic} />
                  <div className="userCommentBox">
                     <div className='titleBar'>
                        <p> {user && user.username} </p>
                        <p> {toTime} </p>
                     </div>
                     <p className='commentBody'> 
                        {comment}
                     </p>
                     <div className='replay'> 
                        <span>Like</span> 
                        {
                           !replayBoxOpen ? 
                           <span onClick={() => setReplayBoxOpen(_id)}>
                              Replay
                           </span> :
                           <span 
                              onClick={() => replayBoxOpen === _id ? 
                              setReplayBoxOpen(null) : 
                              setReplayBoxOpen(_id)}
                           >
                              {
                                 replayBoxOpen === _id ? 
                                 'Cancel Replay' : 'Replay'
                              }
                           </span> 
                        }
                        {
                           !replies.length === 0 && <>
                           {
                              !allShowReplay ?
                              <span 
                                 onClick={() => allShowReplay === _id ? 
                                    setAllShowReplay(null) : 
                                    setAllShowReplay(_id)}
                              >
                                 {replies.length} Replay Show
                              </span> :
                              <span onClick={() => setAllShowReplay(null)}>
                                 {
                                    allShowReplay === _id ? 
                                    `${replies.length} Replay Hide` : 
                                    `${replies.length} Replay Show`
                                 }
                              </span>
                           }
                           </> 
                        }
                     </div>
                     {
                        _id && replayBoxOpen === _id &&
                        <CommentReplay 
                           commentId={_id}
                           userData={userData}
                           articleId={articleId} 
                           firstReplay='firstReplay'
                        />
                     }
                     {
                        replies.length ? 
                        replies.slice(0, 2).map(commentReplay => <NestedCommentReplay 
                           commentId={_id}
                           userData={userData}
                           articleId={articleId} 
                           commentReplay={commentReplay} 
                        />
                        ) : ''
                     }
                     {
                        showReplay === _id && 
                        replies.slice(2).map(commentReplay => <NestedCommentReplay 
                           commentId={_id}
                           userData={userData}
                           articleId={articleId} 
                           commentReplay={commentReplay} 
                        />
                        )
                     }
                     {
                        replies.length > 2 && 
                        <div className="showHideComment">
                        {
                           !showReplay ?
                           <span 
                              onClick={() => showReplay === _id ? 
                              setShowReplay(null) : 
                              setShowReplay(_id)}
                           >
                              <ArrowForwardIcon />Show More {(replies.length)-2} Replay
                           </span> :
                           <span onClick={() => setShowReplay(null)}>
                              {
                                 showReplay === _id ? 
                                 <span>
                                 <ArrowBackIcon />
                                 Hide More {(replies.length)-2} Replay
                                 </span> :
                                 <span>
                                 <ArrowForwardIcon />
                                 Show More {(replies.length)-2} Replay
                                 </span>
                              }
                           </span>
                        }
                        </div>
                     }
                  </div>
               </div>
            })
         }
      </div>
   );
};

export default ArticleComment;