import React, { useRef, useState } from 'react';
import { Paper, Button } from '@material-ui/core';
import TextEditor from './TextEditor';
import { useForm } from 'react-hook-form';
import { getCookie } from '../SignupAndSignin/Signin/SigninHelper';
import ArticleHandler from '../ContextProvider/Handler/ArticleHandler';
import { useContextData } from '../ContextProvider/ContextProvider';

const CreateArticleForm = ({article}) => {
   const {setFormLoader} = useContextData()
   const token = getCookie('myBlogToken')

   const editorRef = useRef(null);
   const [bodyText, setBodyText] = useState(true)
   const editorText = () => {
     if (editorRef.current) {
       setBodyText(editorRef.current.getContent());
     }
   };

   const { register, handleSubmit, errors, watch } = useForm();
   const {title} = watch()

   const {postArticle, editArticle} = ArticleHandler()
   const onSubmit = data => { 
      if (article) {
         if (data.thumbnail.length === 0) {
            data.thumbnail = article.articleThumbnail
            console.log('Edit Article')
            editArticle(data, bodyText)
         } else {
            console.log('Edit Article With New Image')
            editArticle(data, bodyText)
         }
      } else {
         console.log('Post Article')
         postArticle(data, bodyText)
      }
      if (data && bodyText) {
         setFormLoader(true)
      }
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

   return (
      <Paper className="createArticle" elevation={3}>
         <h3>Create And Post Article</h3>
         <form className="createArticleForm" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
               <label>Article Title</label>
               <input 
                  name="title"
                  defaultValue={article && article.title}
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
                  !image && article ? 
                  <div className="thumbnailSection">
                     <img src={article.articleThumbnail} alt=""/>
                  </div> :
                  image && 
                  <div className="thumbnailSection">
                     <img src={image} alt=""/>
                  </div>
               }
            </div>
            <div className="form-group">
               <label>Article Body</label>
               <TextEditor bodyTextEdit={article && article.body} editorRef={editorRef} token={token} />
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
                  defaultValue={article && article.tags}
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
                  onClick={() => editorText()}
               >
                  Post Article
               </Button>
            </div>
         </form>
      </Paper>
   );
};

export default CreateArticleForm;