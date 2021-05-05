import React, { createContext, useContext, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwtDecode from "jwt-decode";
import axios from "axios"
import { getCookie, isAuthenticated, removeCookie, removeLocalStorage } from '../SignupAndSignin/Signin/SigninHelper';
import { useHistory } from 'react-router-dom';

// Create Context
const DataContext = createContext()
export const useContextData = () => useContext(DataContext)

// Create Context Provider and
export const ContextDataProvider = (props) => {
   const contexts = Contexts()
   return <DataContext.Provider value={contexts}> 
      {props.children} 
   </DataContext.Provider>
}


// Create All Context
const Contexts = () => {
   const [formLoader, setFormLoader] = useState(false)
   const [header, setHeader] = useState(false)
   const [signupErrors, setSignupErrors] = useState(null);
   const [user, setUser] = useState(null)
   const [userData, setUserData] = useState(null)
   const [userProfile, setUserProfile] = useState(null)
   const [allArticles, setAllArticles] = useState(null)
   const [articleDetail, setArticleDetail] = useState(false)
   const [authorArticles, setAuthorArticles] = useState(false)
   const [popularArticle, setPopularArticle] = useState(false)
   const [allUsers, setAllUsers] = useState(null)
   const [allUsersProfile, setAllUsersProfile] = useState(null)
   const [message, setMessage] = useState(null)
   setTimeout( () => {
      setMessage(null)
   }, 4000)
   console.log(allArticles)

   const url = 'http://localhost:3005'
   const token = getCookie('myBlogToken');

   // get user data
   useEffect(() => {
      if (token) {
         axios.get(url+'/user/get/data', {
            headers: {
              authorization: token
            }
         })
         .then(result => {
            setUserData(result.data)
         })
      }
   }, [token])

   // get user profile data
   useEffect(() => {
      if (token) {
         axios.get(url+'/user/profile/get', {
            headers: {
              authorization: token
            }
         })
         .then(result => {
            setUserProfile(result.data)
         })
      }
   }, [user])

   // get all user article data
   useEffect(() => {
      axios.get(url+'/get-all/article')
      .then(result => {
         setAllArticles(result.data)
      })
   }, [])

   // get all user article data
   useEffect(() => {
      axios.get(url+'/user/get/all-users')
      .then(result => {
         setAllUsers(result.data)
      })
   }, [])

   // get all user article data
   useEffect(() => {
      axios.get(url+'/user/get/all-users/profile')
      .then(result => {
         setAllUsersProfile(result.data)
      })
   }, [])


   // Manage Signed User 
   const loggedInToken = isAuthenticated()
   useEffect(() => {
      const loggedUser = loggedInToken && jwtDecode(loggedInToken)
      setUser(loggedUser)
   }, [])

   // User Sign Out
   const signout = (history) => {
      removeCookie('myBlogToken');
      removeLocalStorage('loggedInUser');
      history.push('/')
      toast.error('You are logged out.')
      setUser(null)
   };


   // Show Toast Message in Our Component
   const toastMessage = () => {
      return <ToastContainer 
         position="top-center"
         autoClose={5000}
         hideProgressBar={false}
         newestOnTop={false}
         closeOnClick
         rtl={false}
         pauseOnFocusLoss
         draggable
         pauseOnHover
      />
   }

   return {
      user,
      setUser,
      message,
      header, 
      setHeader,
      formLoader, 
      setFormLoader,
      toastMessage,
      userData, 
      setUserData,
      userProfile, 
      setUserProfile,
      allArticles, 
      articleDetail, 
      setArticleDetail,
      popularArticle, 
      setPopularArticle,
      authorArticles, 
      setAuthorArticles,
      allUsers,
      allUsersProfile,
      signupErrors, 
      setSignupErrors,
      signout
   }
}