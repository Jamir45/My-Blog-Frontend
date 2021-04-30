import { useContextData } from "../ContextProvider";
import axios from "axios"
import { dataURLtoFile } from "../../ImageCropper/URLConverter";
import { getCookie } from "../../SignupAndSignin/Signin/SigninHelper";
import { toast } from 'react-toastify';
import { useHistory } from "react-router-dom";

const ProfileHandler = () => {
   const history = useHistory()
   const {user, userProfile, setUserProfile} = useContextData()
   const token = getCookie('myBlogToken')
   const url = 'http://localhost:3005/user/profile'
   
   // Upload User Profile Pic
   const uploadProfile = async (croppedImage) => {
      const convertDataUrl = croppedImage.toDataURL("image/jpeg")
      const convertFileUrl = dataURLtoFile(convertDataUrl, "cropped-image.jpeg")
      const formData = new FormData()
      formData.append('file', convertFileUrl)
      formData.append('userId', user.userId)
      const result = await axios.put(url+'/image/upload', formData, )
      console.log(result)
      setUserProfile(result.data.updatedUserData)
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
         console.log(result.data)
         if (result.data.success) {
            const {savedProfile, success} = result.data
            setUserProfile(savedProfile)
            toast.success(success)
            history.push('/user/profile')
         }
      }
   }

   
   return {
      uploadProfile,
      postProfileData
   }
};

export default ProfileHandler;