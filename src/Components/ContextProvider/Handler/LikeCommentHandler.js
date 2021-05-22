import { useContextData } from "../ContextProvider";
import axios from "axios"
import { getCookie } from "../../SignupAndSignin/Signin/SigninHelper";
import { toast } from 'react-toastify';

const LikeCommentHandler = () => {
   const {
      setUserData,
      allArticles, 
      setAllArticles,
      allComments, 
      setAllComments
   } = useContextData()
   const token = getCookie('myBlogToken')
   const url = 'http://localhost:3005'

   const resultUpdater = (oldDataArray, newData) => {
      const result = oldDataArray.map(data => {
         if (data._id === newData._id) {
            return newData
         } else {
            return data
         }
      })
      return result
   }

   // Write Comment
   const writeComment = async (comment, articleId) => {
      const {userComment} = comment;

      const result = await axios.post(url+'/comment/write/'+articleId, {
         userComment
      }, {
         headers: {authorization: token}
      })
      if (!result.data.error) {
         setAllComments([result.data, ...allComments])         
      } else {
         toast.error(result.data.error)
      }
   }

   // Write Comment
   const replayOnComment = async (data, commentId) => {
      const replayBody = data.userComment;
      if (commentId) {
         const result = await axios.put(url+'/comment/replay/'+commentId, {
            replayBody
         }, {
            headers: {authorization: token}
         })
         if (!result.data.error) {
            const commentReplay = resultUpdater(allComments, result.data)
            setAllComments(commentReplay)
         } else {
            toast.error(result.data.error)
         }
      }
   }

   // Like on post 
   const likeDislikePost = async (articleId, action) => {
      const result = await axios.put(`${url}/article/${action}/${articleId}`, {}, {
         headers: {authorization: token}
      })
      if (!result.data.error) {
         const likedArticle = resultUpdater(allArticles, result.data)
         setAllArticles(likedArticle)
      } else {
         toast.error(result.data.error)
      }
   }

   // Bookmark post on profile 
   const bookmarkPost = async (articleId, action) => {
      const result = await axios.put(`${url}/article/${action}/${articleId}`, {}, {
         headers: {authorization: token}
      })
      if (!result.data.error) {
         setUserData(result.data)
      } else {
         toast.error(result.data.error)
      }
   }


   return {
      writeComment,
      replayOnComment,
      likeDislikePost,
      bookmarkPost,
      resultUpdater
   }
};

export default LikeCommentHandler;