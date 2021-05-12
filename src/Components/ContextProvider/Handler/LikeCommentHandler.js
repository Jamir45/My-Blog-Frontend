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
            const commentReplay = allComments.map(comment => {
               if (comment._id === result.data._id) {
                  return result.data
               } else {
                  return comment
               }
            })
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
         const likedArticle = allArticles.map(article => {
            if (result.data._id === article._id) {
               return result.data
            } else {
               return article
            }
         })
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
   }
};

export default LikeCommentHandler;