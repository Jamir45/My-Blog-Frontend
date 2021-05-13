import { Paper } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useContextData } from '../ContextProvider/ContextProvider';
import Article from '../Home/Article/Article';
import Author from './Author';

const ArticleDetails = () => {
   const {articleId} = useParams()
   const {
      allUsers, 
      allUsersProfile, 
      allArticles, 
      setArticleDetail
   } = useContextData()

   const [article, setArticle] = useState(null)
   useEffect(() => {
      if (allArticles && articleId) {
         const data = allArticles.find(article => article._id === articleId)
         setArticle(data)
      }
   }, [articleId && allArticles])

   // const [author, setAuthor] = useState(null)
   // console.log(author)
   // useEffect(() => {
   //    if (allUsers && article) {
   //       const oneUser = allUsers.find(user => user._id === article.author)
   //       setAuthor(oneUser)
   //    }
   // }, [article])

   const [authorProfile, setAuthorProfile] = useState(null)
   console.log(authorProfile)
   useEffect(() => {
      if (allUsersProfile && article) {
         const profile = allUsersProfile.find(profile => profile.user === article.author._id)
         setAuthorProfile(profile)
      }
   }, [article])

   useEffect(() => {
      setArticleDetail(true)
   }, [])

   return (
      <div className="container">
         <div className="row articleDetails">
            <div className="col-md-0 col-lg-1"></div>
            <div className="col-md-8 col-lg-7 articleBox">
               {
                  article && <Article articles={article} />
               }
            </div>
            <div className="col-md-4 col-lg-4">
               <Paper className="articleAuthor authorBox" elevation={1}>
                  {
                     authorProfile && 
                     <Author article={article} authorProfile={authorProfile}/>
                  }
               </Paper>
            </div>
         </div>
      </div>
   );
};

export default ArticleDetails;