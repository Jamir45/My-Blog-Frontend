import React, { useEffect } from 'react';
import { Paper } from '@material-ui/core';
import { useContextData } from '../ContextProvider/ContextProvider';
import Article from './Article/Article';
import PopularArticle from './PopularArticle';

const Home = () => {
   const {allArticles, setArticleDetail, popularArticle, setAuthorArticles} = useContextData()
   useEffect(() => {
      setArticleDetail(false)
      setAuthorArticles(false)
   }, [])

   return (
      <div className='container'>
         <div className="row Home">
            <div className="col-md-0 col-lg-1"></div>
            <div className="col-md-8 col-lg-7">
               {
                  allArticles && !popularArticle && 
                  allArticles.map( articles => <Article articles={articles} /> )
               }
            </div>
            <div className={popularArticle ? "col-md-4 col-lg-4 d-block" : "col-md-4 col-lg-4 d-none d-md-block"}>
               <Paper className="popularArticle" elevation={1}>
                  <h5> Most Popular Articles </h5>
                  {
                     allArticles && 
                     allArticles.map( articles => <PopularArticle articles={articles} /> )
                  }
               </Paper>
            </div>
         </div>
      </div>
   );
};

export default Home;