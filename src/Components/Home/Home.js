import React, { useEffect, useRef } from 'react';
import { useContextData } from '../ContextProvider/ContextProvider';
import Article from './Article/Article';
import PopularArticle from './PopularArticle/PopularArticle';
import ComponentLoading from '../Loading/Loading';
import Sidebar from './Sidebar/Sidebar';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';
import Pagination from './Pagination/Pagination'

const Home = () => {
   const { setFilterData, setPageNumber, totalPage, allUsers, allArticles, homeArticles, setArticleDetail, setAuthorArticles} = useContextData()
   const {filter, pageNo} = useParams()
   useEffect(() => {
      if (filter) {
         setFilterData(filter)
         setPageNumber(parseInt(pageNo))
      }
   }, [filter])

   useEffect(() => {
      setArticleDetail(false)
      setAuthorArticles(false)
   }, [])

   let pages = []
   for (let i = 1; i <= totalPage; i++) {
      pages.push(i);
   }
   
   // Scroll Top and Down
   const scrollTop = useRef()
   const scrollFunc = () => {
      window.scrollTo({
         top: scrollTop.current.offsetTop,
         left: 0,
         behavior: "smooth",
      })
   }

   return (
      <div className='ApplicationHome'>
         <div className='container'>
            <div ref={scrollTop} className="row Home">
               <div className="col-md-3 col-lg-3 d-none d-md-block">
                  {
                     allUsers ? <Sidebar /> :
                     <ComponentLoading />
                  }
               </div>
               <div className="col-md-6 col-lg-6 homeArticle">
                  <div className='articleFilter'>
                     <Link to={`/home/latest/page=1`}>
                        <Button
                           className={filter === undefined ? 'active' : filter==='latest' && 'active'}
                        > 
                           Latest
                        </Button>
                     </Link>
                     <Link to={`/home/week/page=1`}>
                        <Button className={filter==='week' && 'active'}> 
                           Week
                        </Button>
                     </Link>
                     <Link to={`/home/month/page=1`}>
                        <Button className={filter==='month' && 'active'}> 
                           Month
                        </Button>
                     </Link>
                     <Link to={`/home/all/page=1`}>
                        <Button className={filter==='all' && 'active'}> 
                           All
                        </Button>
                     </Link>
                  </div>
                  {
                     homeArticles ?
                     homeArticles.map( articles => <Article articles={articles} /> ) :
                     <ComponentLoading />
                  }
                  {
                     totalPage && 
                     <Pagination 
                        totalPage={totalPage} 
                        scrollFunc={scrollFunc}
                     />
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