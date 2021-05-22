import React, { useEffect } from 'react';
import { Paper } from '@material-ui/core';
import { useContextData } from '../ContextProvider/ContextProvider';
import Article from './Article/Article';
import PopularArticle from './PopularArticle/PopularArticle';
import ComponentLoading from '../Loading/Loading';
import Sidebar from './Sidebar/Sidebar';

const Home = () => {
   const {allUsers, allArticles, setArticleDetail, setAuthorArticles} = useContextData()
   useEffect(() => {
      setArticleDetail(false)
      setAuthorArticles(false)
   }, [])

   return (
      <div className='ApplicationHome'>
         <div className='container'>
            <div className="row Home">
               <div className="col-md-3 col-lg-3 d-none d-md-block">
                  {
                     allUsers ? <Sidebar /> :
                     <ComponentLoading />
                  }
               </div>
               <div className="col-md-6 col-lg-6 homeArticle">
                  {
                     allArticles ?
                     allArticles.map( articles => <Article articles={articles} /> ) :
                     <ComponentLoading />
                  }
               </div>
               <div className="col-md-3 col-lg-3 d-none d-md-block sidebarRight">
                  {
                     allArticles ? <PopularArticle allArticles={allArticles} /> :
                     <ComponentLoading />
                  }
               </div>
            </div>
         </div>
      </div>
   );
};

export default Home;