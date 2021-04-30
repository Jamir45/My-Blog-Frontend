import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { getCookie } from '../SignupAndSignin/Signin/SigninHelper';
import TextEditor from './TextEditor';
import { useForm } from 'react-hook-form';
import { Button, Paper } from '@material-ui/core';
import ArticleHandler from '../ContextProvider/Handler/ArticleHandler';

const CreateArticle = () => {
   const token = getCookie('myBlogToken')
   const editorRef = useRef(null);
   const [bodyText, setBodyText] = useState(true)
   const editorText = () => {
     if (editorRef.current) {
       console.log(editorRef.current.getContent());
       setBodyText(editorRef.current.getContent());
     }
   };

   const { register, handleSubmit, errors, watch } = useForm();
   const {title, } = watch()

   const {postArticle} = ArticleHandler()
   const onSubmit = data => { 
      console.log(data)
      postArticle(data, bodyText)
      
      // const postThumbnail = data.thumbnail[0]
      // console.log(postThumbnail)
      // const formData = new FormData()
      // formData.append('file', postThumbnail)
   }

   const [image, setImage] = useState(null)

   const getFile = (e) => {
      if (e.target.files && e.target.files.length > 0) {
         const reader = new FileReader()
         reader.readAsDataURL(e.target.files[0])
         reader.addEventListener("load", () => {
            setImage(reader.result)
         })
      }
   }

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
            <Paper className="col-md-8 createArticle" elevation={3}>
               <h3>Create And Post Article</h3>
               <form className="createArticleForm" onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group">
                     <label>Article Title</label>
                     <input 
                        name="title"
                        className='form-control'
                        placeholder="Title Of Your Article (Max Length 100 Characters)"
                        ref={register({ required: true })}
                     />
                     {
                        errors.title && 
                        <span className="Error">
                           Please Provide Your Article Tile
                        </span>
                     }
                     {
                        title && title.length > 100 && 
                        <span className="Error">
                           Title Must Be Below 100 characters
                        </span>
                     }
                  </div>
                  <div className="form-group">
                     <label>Article Thumbnail</label>
                     <input 
                        onChange={getFile}
                        type="file"
                        name="thumbnail"
                        className='form-control'
                        placeholder="Select Your Article Thumbnail"
                        ref={register()}
                     />
                     { 
                        image && <div className="thumbnailSection">
                           <img src={image && image} alt=""/>
                        </div>
                     }
                  </div>
                  <div className="form-group">
                     <label>Article Body</label>
                     <TextEditor editorRef={editorRef} token={token} />
                     {
                        !bodyText && 
                        <span className="Error">
                           Please Provide Your Article Body
                        </span>
                     }
                  </div>
                  <div className="form-group">
                     <label>Tags For Search Article</label>
                     <input 
                        name="searchTags"
                        className='form-control'
                        placeholder="Provide Some Tags (tag1, tag2, tag3, etc..)"
                        ref={register({ required: true })}
                     />
                     {
                        errors.searchTags && 
                        <span className="Error">
                           Please Provide Some Tags For Search Article
                        </span>
                     }
                  </div>
                  <div className="postArticleBtn">
                     <Button
                        type="submit"
                        variant='contained'
                        onClick={editorText}
                     >
                        Post Article
                     </Button>
                  </div>
               </form>
            </Paper>
            <div>
               
            </div>
            <div className="col-md-2"></div>
         </div>
      </div>
   );
};

export default CreateArticle;