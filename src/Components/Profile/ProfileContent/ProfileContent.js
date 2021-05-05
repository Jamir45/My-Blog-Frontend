import { Paper } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import PostAddIcon from '@material-ui/icons/PostAdd';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { useContextData } from '../../ContextProvider/ContextProvider';
import Article from '../../Home/Article/Article';

const ProfileContent = (props) => {
   const {setAuthorArticles} = useContextData()
   useEffect(() => {
      setAuthorArticles(true)
   }, [])
   const {user, userData, userProfile, allArticles} = props;
   console.log(user)
   const {country, bio, socialLinks, education, work} = userProfile;


   const [authorArticle, setAuthorArticle] = useState(null)
   useEffect(() => {
      if (allArticles && user) {
         const data = allArticles.filter(article => article.author === user.userId)
         setAuthorArticle(data)
      }
   }, [allArticles])


   return (
      <>
         <div className='col-md-4'>
            <Paper className='objective' elevation={1} >
               <h6>Career Objective</h6>
               <p>{bio}</p>
            </Paper>
            <Paper className='overview' elevation={1} >
               <li><AssignmentIcon /> 0 Article Published</li>
               <li><ListAltIcon /> 0 Followed</li>
               <li><ListAltIcon /> 0 Followers</li>
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