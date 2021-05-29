import React from 'react';
import { useParams } from 'react-router-dom';
import { useContextData } from '../ContextProvider/ContextProvider';
import CreateArticleForm from '../CreateArticle/CreateArticleForm';
import FormLoading from '../Loading/FormLoading';

const EditArticle = () => {
   const {editArticleId} = useParams()
   const {formLoader, allArticles} = useContextData()

   const article = allArticles && allArticles.find(articles => {
      if (articles) {
         return articles._id === editArticleId
      }
   })

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