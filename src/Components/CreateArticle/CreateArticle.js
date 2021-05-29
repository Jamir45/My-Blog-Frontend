import React from 'react';
import FormLoading from '../Loading/FormLoading';
import { useContextData } from '../ContextProvider/ContextProvider';
import CreateArticleForm from './CreateArticleForm';

const CreateArticle = () => {
   const {formLoader, } = useContextData()

   // const { register, handleSubmit, watch, errors } = useForm();
   // const onSubmit = async data => {
   //    const multipleImage = data.File
   //    const formData = new FormData()
   //    for (let i = 0; i < multipleImage.length; i++) {
   //       const element = multipleImage[i];
   //       formData.append('files', element)
   //    }
   //    const result = await axios.post(url+'/images', formData)
   //    console.log(result)
   // };

   return (
      <div className="container">
         <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8 createArticleDiv">
               <CreateArticleForm/>
               {
                  formLoader && <FormLoading />
               }
            </div>
            <div className="col-md-2"></div>
         </div>
      </div>
   );
};

export default CreateArticle;