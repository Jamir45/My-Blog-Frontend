import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useContextData } from '../ContextProvider/ContextProvider';
import CreateArticle from '../CreateArticle/CreateArticle';
import CreateArticleForm from '../CreateArticle/CreateArticleForm';
import FormLoading from '../Loading/FormLoading';
import EditArticleForm from './EditArticleForm';

const EditArticle = () => {
   const {editArticleId} = useParams()
   const {formLoader, allArticles} = useContextData()
 

   const article = allArticles && allArticles.find(articles => {
      if (articles) {
         return articles._id === editArticleId
      }
   })
   console.log(article)
   // const [article, setArticle] = useState(null)
   // useEffect(() => {
   // }, [editArticleId])

   // const [editArticleData, setEditArticleData] = useState(null)
   // useEffect(() => {
      
   //    setEditArticleData(article)
   // }, [allArticles])
   // console.log(editArticleData)

   return (
      <div className="container">
         <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8 createArticleDiv">
               {
                  article &&
                  <CreateArticleForm article={article} />
               }
               {
                  formLoader && <FormLoading />
               }
            </div>
            <div className="col-md-2"></div>
         </div>
      </div>
   );
};

export default EditArticle;