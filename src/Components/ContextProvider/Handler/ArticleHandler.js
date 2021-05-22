import axios from "axios"
import { getCookie } from "../../SignupAndSignin/Signin/SigninHelper";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { useContextData } from "../ContextProvider";
import LikeCommentHandler from "./LikeCommentHandler";

const ArticleHandler = () => {
   const {
      allUsers,
      setAllUsers,
      setFormLoader, 
      allArticles, 
      setAllArticles
   } = useContextData()
   const {resultUpdater} = LikeCommentHandler()
   const url = 'http://localhost:3005'
   const token = getCookie('myBlogToken')
   const history = useHistory()


   const resultHandler = (result) => {
      if (result.data.error || result.data.success) {
         setFormLoader(false)
         if (result.data.success) {
            const {success, createdArticle, updatedUser} = result.data
            console.log(updatedUser)
            toast.success(success)
            setAllArticles([createdArticle, ...allArticles])
            const userUpdated = resultUpdater(allUsers, updatedUser)
            setAllUsers(userUpdated)

            history.push('/')
         } else {
            toast.error(result.data.error)
         }
      }
   }
 
   const postArticle = async (data, bodyText) => {
      const {title, thumbnail, searchTags} = data

      if (thumbnail.length > 0) {
         const postThumbnail = thumbnail[0]
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
            resultHandler(result)
         }
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
         resultHandler(result)
      }
   }

   const editResultHandler = (result) => {
      if (result.data.error || result.data.success) {
         setFormLoader(false)
         if (result.data.success) {
            const {success, updatedArticle} = result.data
            toast.success(success)
            const articleUpdated = resultUpdater(allArticles, updatedArticle)
            setAllArticles(articleUpdated)
            if (updatedArticle) {
               history.push('/article/details/'+updatedArticle._id)
            }
         } else {
            toast.error(result.data.error)
         }
      }
   }

   const editArticle = async (data, bodyText) => {
      const {title, thumbnail, searchTags} = data

      if (thumbnail.length === 1) {
         const postThumbnail = thumbnail[0]
         console.log(postThumbnail)
         const formData = new FormData()
         formData.append('file', postThumbnail)
         const result = await axios.post(url+'/upload/post-thumbnail', formData, {
            headers: {authorization: token}
         })
         const thumbnailUrl = result.data.secure_url
         if (thumbnailUrl) {
            const result = await axios.put(url+'/edit/article', {
               title,
               articleThumbnail: thumbnailUrl,
               body: bodyText,
               searchTags
            }, {
               headers: {authorization: token}
            })
            editResultHandler(result)
         }
      } else {
         const result = await axios.put(url+'/edit/article', {
            title,
            articleThumbnail: thumbnail,
            body: bodyText,
            searchTags
         }, {
            headers: {authorization: token}
         })
         editResultHandler(result)
      }
   }

   // Delete Article
   const deleteArticle = async (postId, handleClose) => {
      if (token) {
         const result = await axios.delete(url+'/delete/article/'+postId, {
            headers: {authorization: token}
         });
         if (result.data.error || result.data.success) {
            handleClose()
            setFormLoader(false)
            if (result.data.success) {
               const {deletedArticle, updatedUser, success} = result.data
               toast.success(success)
               const articleDeleted = allArticles.filter(post => {
                  return post._id !== deletedArticle._id
               })
               setAllArticles(articleDeleted)

               const updatedUserData = resultUpdater(allUsers, updatedUser)
               setAllUsers(updatedUserData)
               
            } else {
               toast.error(result.data.error)
            }
         }
      }
   }

   return {
      postArticle,
      editArticle,
      deleteArticle
   }
};

export default ArticleHandler;