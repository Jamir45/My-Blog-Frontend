import { Avatar, Paper } from '@material-ui/core';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContextData } from '../../ContextProvider/ContextProvider';
import MoreButton from './ArticleController/MoreButton';
import { useEffect } from 'react';
import ArticleComment from './ArticleComment/ArticleComment';
import ArticleController from './ArticleController/ArticleController';
import * as cheerio from 'cheerio';
import moment from 'moment';


const Article = ({articles}) => {
   const {_id, author, title, body, articleThumbnail, likes, dislikes, readTime, createdAt, tags} = articles
   let node = cheerio.load(body)
   let bodyText = node.text().replace(/(\r\r|\n|\r)/gm, '')
   const postedOn = moment(createdAt).fromNow()

   const toDate = new Date(createdAt).toDateString().slice(4)
   const {user, allComments, articleDetail, authorArticles} = useContextData()

   const [articleComments, setArticleComments] = useState(null)
   useEffect(() => {
      if (allComments) {
         const comments = allComments.filter(comment => comment.post === _id)
         setArticleComments(comments)
      }
   }, [allComments])

   return (
      <Paper className="articleBox" elevation={1}>
         {
            !authorArticles && 
            <img className='img-fluid' src={articleThumbnail} alt=""/>
         }
         <div className="articleDetails">
            <div className="d-flex justify-content-between">
               <div className="userProfile">
                  <Avatar src={author.profilePic} />
                  <ul>
                     <li> 
                        <Link to={`/article-author/profile/${author._id}`} >
                        {author.username}
                        </Link>
                        <span> {postedOn} </span>
                     </li>
                     <li> Published at {toDate} </li>
                  </ul>
               </div>
               <div className="readTime">
                  <MoreButton 
                     _id={_id} 
                     user={user} 
                     author={author} 
                     readTime={readTime} 
                  />
               </div>
            </div>
            <hr/>
            <h4> 
               <Link to={`/article/details/${_id}`}>
                  {title}
               </Link> 
            </h4>
            {
               articleDetail ?
               <div dangerouslySetInnerHTML={{__html: body}}></div> :
               <>
                  {
                     bodyText.length > 220 ? 
                     <p> {bodyText.substr(0, 220)+'.....'}
                        <Link to={`/article/details/${_id}`}>Read More</Link> 
                     </p> :
                     <p> {bodyText} </p>
                  }
               </>
            }
            <div className="tags">
               {
                  tags.map(tag => {
                     return <span> #<Link to=''>{tag}</Link> </span>
                  })
               }
            </div>
         </div>
         {
            articleDetail && <ArticleComment articleId={_id} />
         }
         {
            articleComments && 
            <ArticleController 
               _id={_id}
               user={user}
               likes={likes}
               dislikes={dislikes}
               articleComments={articleComments} 
            />
         }
      </Paper>
   );
};

export default Article;