import { Paper } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { useContextData } from '../../ContextProvider/ContextProvider';
import Article from '../../Home/Article/Article';

const ProfileContent = (props) => {
   const {userData, userProfile, allArticles} = props;
   console.log(allArticles)
   const {setAuthorArticles} = useContextData()
   const {_id, follower, following} = userData
   useEffect(() => {
      setAuthorArticles(true)
   }, [])

   const [authorArticle, setAuthorArticle] = useState(null)
   useEffect(() => {
      if (allArticles && userData) {
         const data = allArticles.filter(article => article.author._id === userData._id)
         setAuthorArticle(data)
      }
   }, [allArticles])


   return (
      <>
         <div className='col-md-4'>
            <Paper className='objective' elevation={1} >
               <h6>Career Objective</h6>
               <p>{userProfile.bio}</p>
            </Paper>
            <Paper className='overview' elevation={1} >
               <li><AssignmentIcon /> {authorArticle && authorArticle.length} Article Published</li>
               <li><ListAltIcon /> {follower.length} Followers</li>
               <li><ListAltIcon /> {following.length} Followings</li>
            </Paper>
         </div>
         <div className='col-md-8'>
            <Paper className='authorArticles' elevation={1} >
               <h4>Author Articles</h4>
               {
                  authorArticle && 
                  authorArticle.map(article => <Article articles={article} />)
               }
            </Paper>
         </div>
      </>
   );
};

export default ProfileContent;