import { Avatar, Button, Paper } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import { useContextData } from '../../ContextProvider/ContextProvider';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faCommentAlt, faThumbsDown, faThumbsUp } from '@fortawesome/free-regular-svg-icons'
import { Comment } from '@material-ui/icons';


const Article = ({articles}) => {
   const {_id, author, title, body, articleThumbnail, likes, dislikes, comments, readTime, createdAt, tags} = articles
   const toDate = new Date(createdAt).toDateString().slice(4)
   const firstP = body.split('<p>')[1]
   const firstPSlice = firstP.slice(0, firstP.length - 5)
   const {allUsers, articleDetail, authorArticles} = useContextData()
   console.log(authorArticles)
   const articleAuthor = allUsers && allUsers.find(user => user._id === author)
   // const {username, profilePic} = articleAuthor

   return (
      <Paper className="articleBox" elevation={1}>
         {
            !authorArticles && 
            <img className='img-fluid' src={articleThumbnail} alt=""/>
         }
         <div className="articleDetails">
            <div className="d-flex justify-content-between">
               <div className="userProfile">
                  <Avatar src={articleAuthor && articleAuthor.profilePic} />
                  <ul>
                     <li> {articleAuthor && articleAuthor.username} </li>
                     <li> Published at {toDate} </li>
                  </ul>
               </div>
               <div className="readTime">
                  <span> {readTime} </span>
                  <Button> 
                     Save
                  </Button> 
               </div>
            </div>
            <hr/>
            <h4> 
               <Link to={`/article/details/${_id}`}>
                  {title}
               </Link> 
            </h4>
            {
               articleDetail && 
               <div dangerouslySetInnerHTML={{__html: body}}></div>
            }
            <div> 
               {
                  !articleDetail && firstPSlice.length > 200 ? 
                  <p> 
                     {firstPSlice.slice(0, 200)+'....'} 
                     <Link to={`/article/details/${_id}`}>
                        Reade More
                     </Link> 
                  </p> : 
                  <p> {firstPSlice} </p>
               } 
            </div>
            <div className="tags">
               {
                  tags.map(tag => {
                     return <span> #<Link to=''>{tag}</Link> </span>
                  })
               }
            </div>
         </div>
         <div className="d-flex justify-content-evenly articleControl">
            <Button>
               13
               <FontAwesomeIcon icon={faThumbsUp} />
               Like
            </Button>
            <Button> 
               15
               <FontAwesomeIcon icon={faThumbsDown} />
               Dislike
            </Button>
            <Button> 
               17
               {/* <FontAwesomeIcon icon={faCommentAlt} /> */}
               <FontAwesomeIcon icon={faComment} />
               Comments
            </Button>
         </div>
      </Paper>
   );
};

export default Article;