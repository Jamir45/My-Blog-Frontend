import axios from "axios"
import { authenticate, getCookie, isAuthenticated } from "../../SignupAndSignin/Signin/SigninHelper";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const ArticleHandler = () => {
   const url = 'http://localhost:3005'
   const token = getCookie('myBlogToken')

   const postArticle = async (data, bodyText) => {
      const {title, thumbnail, searchTags} = data

      if (thumbnail.length > 0) {
         const postThumbnail = thumbnail[0]
         console.log(postThumbnail)
         const formData = new FormData()
         formData.append('file', postThumbnail)
         const result = await axios.post(url+'/upload/post-thumbnail', formData, {
            headers: {authorization: token}
         })
         const thumbnailUrl = result.data.secure_url
         if (thumbnailUrl) {
            const result = await axios.post(url+'/post/article', {
               title,
               articleThumbnail: thumbnailUrl,
               body: bodyText,
               searchTags
            }, {
               headers: {authorization: token}
            })
            console.log(result.data)
         }
         console.log('Thumbnail Is True')
      } else {
         const result = await axios.post(url+'/post/article', {
            title,
            articleThumbnail: '',
            body: bodyText,
            searchTags
         }, {
            headers: {authorization: token}
         })
         console.log(result.data)
      }
   }

   return {
      postArticle
   }
};

export default ArticleHandler;