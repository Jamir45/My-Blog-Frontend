import React, { useEffect, useState } from 'react';
import { Button, Paper } from '@material-ui/core';
import RoomIcon from '@material-ui/icons/Room';
import CakeIcon from '@material-ui/icons/Cake';
import SocialLinks from './SocialLinks';
import UserHandler from '../../ContextProvider/Handler/UserHandler';
import { useContextData } from '../../ContextProvider/ContextProvider';

const ProfileSection = (props) => {
   const {userData, userProfile} = props;
   const {user} = useContextData()
   const {followUnFollow} = UserHandler()

   const {_id, profilePic, follower, following, username, gender, createdAt} = userData
   const followerUser = follower.includes(user.userId)

   const toDate = new Date(createdAt).toDateString().slice(4)

   const {country, bio, socialLinks, education, work} = userProfile;

   const workAndEducation = (education, work) => {
      const {degree, institute} = education
      const {position, organization} = work

      return <div className="d-md-flex justify-content-evenly">
         <div className="Education"> 
            <h5>Education</h5>
            <p> {degree} </p>
            <p> {institute} </p>
         </div>
         <div className="Work"> 
            <h5>Work OR Job</h5> 
            <p> {position} </p>
            <p> {organization} </p>
         </div>
      </div>
   }

   return (
      <Paper elevation={1} className='profileSection'>
         <div className="profileImg">
            <div className='profileBg'></div>
            <img className='profilePic rounded-circle' src={profilePic} alt=""/>
            <h4> {username} </h4>
         </div>
         <div className='profileDetails'>
            {
               socialLinks && <SocialLinks socialLinks={socialLinks} />
            }
            <ul className="d-flex justify-content-center joinAndCountry">
               <li> <RoomIcon /> {country} </li>
               <li> <CakeIcon /> Joined at {toDate} </li>
            </ul>
            {
               education && work && workAndEducation(education, work)
            }            
         </div>
         {
            user.userId !== _id && 
            <Button
               variant='contained'
               className="logOutBtn"
               onClick={() => followUnFollow(_id)}
            >
               {followerUser ? 'Unfollow' : 'Follow'}
            </Button>
         }
      </Paper>
   );
};

export default ProfileSection;