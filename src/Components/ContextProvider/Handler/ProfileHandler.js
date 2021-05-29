import { useContextData } from "../ContextProvider";
import axios from "axios"
import { dataURLtoFile } from "../../ImageCropper/URLConverter";
import { authenticate, getCookie } from "../../SignupAndSignin/Signin/SigninHelper";
import { toast } from 'react-toastify';
import { useHistory } from "react-router-dom";
import jwtDecode from "jwt-decode";

const ProfileHandler = () => {
   const history = useHistory()
   const {user, setUser, setFormLoader, setUserData, setUserProfile} = useContextData()
   const token = getCookie('myBlogToken')
   const url = 'https://my-blog-article.herokuapp.com/user/profile'

   const resultHandler = (result) => {
      if (result.data.success || result.data.error) {
         if (result.data.success) {
            const {savedProfile, token, success} = result.data
            if (token) {
               authenticate(token, () => {
                  const {username} = jwtDecode(token)
                  toast.success(`Hey ${username}, Welcome back!`);
               });
               const loggedUser = jwtDecode(token)
               setUser(loggedUser)
            }
            setFormLoader(false)
            setUserProfile(savedProfile)
            toast.success(success)
            history.push('/user/profile')
         } else {
            toast.error(result.data.error)
         }
      }
   }
   
   // Upload User Profile Pic
   const uploadProfile = async (croppedImage, handleClose) => {
      const convertDataUrl = croppedImage.toDataURL("image/jpeg")
      const convertFileUrl = dataURLtoFile(convertDataUrl, "cropped-image.jpeg")
      const formData = new FormData()
      formData.append('file', convertFileUrl)
      formData.append('userId', user.userId)
      const result = await axios.put(url+'/image/upload', formData, )
      if (result.data.success) {
         setFormLoader(false)
         setUserData(result.data.updatedUserData)
         handleClose()
         toast.success(result.data.success)
      } else {
         setFormLoader(false)
         toast.error(result.data.error)
      }
   }

   // Post User Profile Data
   const postProfileData = async (profileData) => {
      const {country, name, bio, website, facebook, twitter, linkedin, degree, institute, position, organization} = profileData
      if (token) {
         const result = await axios.post(url+'/set', {
            country, 
            name,
            bio, 
            website, 
            facebook, 
            twitter, 
            linkedin, 
            degree, 
            institute, 
            position, 
            organization
         }, {
            headers: {authorization: token}
         })
         resultHandler(result)
      }
   }

   // Profile Edit Data
   const editProfileData = async (profileEditData) => {
      const {country, name, bio, website, facebook, twitter, linkedin, degree, institute, position, organization} = profileEditData
      if (token) {
         const result = await axios.put(url+'/edit', {
            country, 
            name,
            bio, 
            website, 
            facebook, 
            twitter, 
            linkedin, 
            degree, 
            institute, 
            position, 
            organization
         }, {
            headers: {authorization: token}
         })
         resultHandler(result)
      }
   }
   
   return {
      uploadProfile,
      postProfileData,
      editProfileData
   }
};

export default ProfileHandler;