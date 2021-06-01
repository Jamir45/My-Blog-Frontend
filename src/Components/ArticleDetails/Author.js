import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import { Avatar, Button } from '@material-ui/core';
import UserHandler from '../ContextProvider/Handler/UserHandler';
import { useContextData } from '../ContextProvider/ContextProvider';

const Author = (props) => {
   const {article, authorProfile} = props
   const {user, allUsers} = useContextData()
   const {followUnFollow} = UserHandler()
   const {_id, createdAt, username, profilePic} = article.author

   const [articleAuthor, setArticleAuthor] = useState()
   useEffect(() => {
      if (allUsers) {
         const userData = allUsers.find(data => data._id === _id)
         setArticleAuthor(userData)
      }
   }, [allUsers])
   const followerUser = articleAuthor && user && articleAuthor.follower.includes(user && user.userId)

   const {country, bio, education, work} = authorProfile;
   const toDate = new Date(createdAt).toDateString().slice(4)

   const {degree} = education
   const {position} = work

   return (
      <>
         <div className="headerBg"></div>
         <div className="profileBody">
            <div className="profile">
               <Link to={`/article-author/profile/${_id}`} > 
                  <Avatar className="profileImg" src={profilePic} />
               </Link>
               <Link to={`/article-author/profile/${_id}`} > {username} </Link>
            </div>
            <div className="profileBody">
               <p> {bio} </p>
               {
                  user && user.userId === _id ?
                  <Link to="/user/profile">
                     <Button 
                        variant='contained'
                     >
                        Go To Profile
                     </Button>
                  </Link> :
                  <Button 
                     variant='contained'
                     onClick={() => followUnFollow(_id)}
                  >
                     {followerUser ? 'Unfollow' : 'Follow'}
                  </Button>
               }
               <label>LOCATION</label>
               <p> {country} </p>
               <label>WORK</label>
               <p> {position} </p>
               <label>EDUCATION</label>
               <p> {degree} </p>
               <label>JOINED</label>
               <p> {toDate} </p>
            </div>
         </div>
      </>
   );
};

export default Author;