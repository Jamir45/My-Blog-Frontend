import React, { useEffect, useState } from 'react';
import { useContextData } from '../ContextProvider/ContextProvider';
import ProfileSection from './ProfileSection/ProfileSection';
import ProfileContent from './ProfileContent/ProfileContent';
import ComponentLoading from '../Loading/Loading';
import { useParams } from 'react-router-dom';

const ArticleAuthorProfile = () => {
   const {
      allUsers,
      allArticles,
      allUsersProfile,
      setArticleDetail,
      setAuthorArticles,
   } = useContextData()

   useEffect(() => {
      setArticleDetail(false)
      setAuthorArticles(true)
   }, [])


   const {authorId} = useParams()
   const [author, setAuthor] = useState(null)
   useEffect(() => {
      if (allUsers && authorId) {
         const data = allUsers.find(article => article._id === authorId)
         setAuthor(data)
      }
   }, [authorId && allUsers])

   const [authorProfile, setAuthorProfile] = useState(null)
   useEffect(() => {
      if (allUsersProfile && author) {
         const profile = allUsersProfile.find(profile => profile.user === author._id)
         setAuthorProfile(profile)
      }
   }, [author])

   return (
      <div className="container">
         <div className="row userProfile">
            <div className="col-md-0 col-lg-1"></div>
            <div className="col-md-12 col-lg-10">
               {
                  author && authorProfile ?
                  <ProfileSection 
                     userData={author} 
                     userProfile={authorProfile} 
                  /> : 
                  <ComponentLoading />
               }
               <div className="row profileContent">
                  {
                     author && authorProfile && allArticles &&
                     <ProfileContent 
                        userData={author} 
                        userProfile={authorProfile} 
                        allArticles={allArticles}
                     />
                  }
               </div>
            </div>
            <div className="col-md-0 col-lg-1"></div>
         </div>
      </div>
   );
};

export default ArticleAuthorProfile;