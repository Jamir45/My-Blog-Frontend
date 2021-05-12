import { useContextData } from "../ContextProvider";
import axios from "axios"
import { authenticate, isAuthenticated } from "../../SignupAndSignin/Signin/SigninHelper";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import jwtDecode from "jwt-decode";


const UserHandler = () => {
   const history = useHistory()
   const {setUser, setFormLoader, userProfile, setUserProfile, setSignupErrors} = useContextData()
   const url = 'http://localhost:3005/user'
   
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
      console.log(result)
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
            const {success, token} = result.data
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
            !profile.data.error && isAuthenticated() ? 
            history.push('/user/profile') :
            history.push('/create/profile');
         } else {
            toast.error(result.data.error)
         }
      } else {
         setErrors(result.data)
      }
   }


   return {
      userSignin,
      userSignup
   }
};

export default UserHandler;