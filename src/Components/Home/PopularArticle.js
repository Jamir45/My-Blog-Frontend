import { Paper } from '@material-ui/core';
import React from 'react';

const PopularArticle = ({articles}) => {
   const {_id, author, title, body, articleThumbnail, likes, dislikes, comments, readTime, createdAt, tags} = articles

   return (
      <Paper className="popularArticle" elevation={1}>
         <h5> Most Popular Articles </h5>
         <h4>Articles</h4>
         <h4>Articles</h4>
         <h4>Articles</h4>
         <h4>Articles</h4>
         <h4>Articles</h4>
         <h4>Articles</h4>
         <h4>Articles</h4>
         <h4>Articles</h4>
      </Paper>
   );
};

export default PopularArticle;