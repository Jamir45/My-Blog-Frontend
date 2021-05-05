import React from 'react';
import {Link} from 'react-router-dom'
import { Avatar, Button } from '@material-ui/core';

const Author = (props) => {
   const {author, authorProfile} = props
   const {createdAt, username, profilePic} = author
   const {country, bio, socialLinks, education, work} = authorProfile;

   const toDate = new Date(createdAt).toDateString().slice(4)
   console.log(toDate)

   const {website, facebook, twitter, linkedin} = socialLinks
   const {degree, institute} = education
   const {position, organization} = work

   return (
      <>
         <div className="headerBg"></div>
         <div className="profileBody">
            <div className="profile">
               <Link to='/user/profile' > 
                  <Avatar className="profileImg" src={profilePic} />
               </Link>
               <Link to='/user/profile' > {username} </Link>
            </div>
            <div className="profileBody">
               <p> {bio} </p>
               <Button variant='contained'>
                  Follow
               </Button>
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