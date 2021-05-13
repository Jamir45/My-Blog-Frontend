import { Paper } from '@material-ui/core';
import React from 'react';
import PopularArticleHome from './PopularArticleHome';

const PopularArticle = ({allArticles}) => {
   const sortedArticle = allArticles.sort((a, b) => {
      if (a.likes.length < b.likes.length) return 1
      if (a.likes.length > b.likes.length) return -1
      return 0
   })

   return (
      <Paper className="popularArticle" elevation={1}>
         <h5> Most Popular Articles </h5>
         {
            sortedArticle && 
            sortedArticle.map(article => <PopularArticleHome articles={article} />)
         }
      </Paper>
   );
};

export default PopularArticle;