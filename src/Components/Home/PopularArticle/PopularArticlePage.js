import React from 'react';
import { useContextData } from '../../ContextProvider/ContextProvider';
import Article from '../Article/Article';

const PopularArticlePage = () => {
   const {allArticles} = useContextData()
   const sortedArticle = allArticles && allArticles.sort((a, b) => {
      if (a.likes.length < b.likes.length) return 1
      if (a.likes.length > b.likes.length) return -1
      return 0
   })

   return (
      <div>
         {
            sortedArticle && 
            sortedArticle.map(article => <Article articles={article} />)
         }
      </div>
   );
};

export default PopularArticlePage;