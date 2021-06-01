import { useContextData } from "../ContextProvider";
import axios from "axios"
import { authenticate, getCookie } from "../../SignupAndSignin/Signin/SigninHelper";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import jwtDecode from "jwt-decode";
import LikeCommentHandler from "./LikeCommentHandler";


const UserHandler = () => {
   const history = useHistory()
   const {setUser, setUserData, allUsers, setAllUsers, setFormLoader, setUserProfile, setSignupErrors} = useContextData()
   const url = 'https://my-blog-articl.herokuapp.com/user'
   const token = getCookie('myBlogToken')
   const {resultUpdater} = LikeCommentHandler()
   
   // User Create or Signup
   const userSignup = async (values) => {
      const {firstName, lastName, email, gender, password, confirmPassword} = values
      const name = `${firstName} ${lastName}`

      const result = await axios.post(url+'/signup', {
         username: name,
         email,
         gender,
         password,
         confirm_password: confirmPassword,
      })
      if (result.data.success || result.data.error) {
         setFormLoader(false)
         if (result.data.success) {
            toast.success(result.data.success)
         } else {
            toast.error(result.data.error)
         }
      } else {
         setSignupErrors(result.data)
      }
   }

   // User Sign in
   const userSignin = async (email, password, setErrors) => {
      const result = await axios.post(url+'/signin', {
         email,
         password,
      })
      if (result.data.success || result.data.error) {
         setFormLoader(false)
         if (result.data.success) {
            const {correctUser, success, token} = result.data
            toast.success(success)
            authenticate(token, () => {
               const {username} = jwtDecode(token)
               toast.success(`Hey ${username}, Welcome back!`);
            });
            const loggedUser = token && jwtDecode(token)
            setUser(loggedUser)
            const profile = await axios.get(url+'/profile/get', {
               headers: {
                 authorization: token
               }
            })
            setUserProfile(profile.data.getUser)
            if (correctUser.profile) {
               history.push('/user/profile')
            } else {
               history.push('/create/profile')
            }
         } else {
            toast.error(result.data.error)
         }
      } else {
         setErrors(result.data)
      }
   }

   const followUnFollow = async (userId) => {
      if (token) {
         console.log('Token is = '+token)
         const result = await axios.put(url+'/followUnFollow/'+userId, {}, {
            headers: {authorization: token}
         })
         console.log(result.data)
         if (!result.data.error) {
            const {followerUser, followingUser} = result.data
            setUserData(followerUser)

            const updatedUser1 = await resultUpdater(allUsers, followerUser)
            setAllUsers(updatedUser1)
            const updatedUser2 = await resultUpdater(allUsers, followingUser)
            setAllUsers(updatedUser2)
         }
      }
   }

   return {
      userSignin,
      userSignup,
      followUnFollow
   }
};

export default UserHandler;