import { getCookie, isAuthenticated, removeCookie, removeLocalStorage } from '../SignupAndSignin/Signin/SigninHelper';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwtDecode from "jwt-decode";
import moment from 'moment';
import axios from "axios"
import { useParams } from 'react-router-dom';

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
   const [articleDetail, setArticleDetail] = useState(false)
   const [editArticle, setEditArticle] = useState(false)
   const [imageUploadDialog, setImageUploadDialog] = useState(false)
   const [authorArticles, setAuthorArticles] = useState(false)
   const [popularArticle, setPopularArticle] = useState(false)
   const [profileEdit, setProfileEdit] = useState(false)
   const [message, setMessage] = useState(null)
   setTimeout( () => {
      setMessage(null)
   }, 4000)

   const url = 'https://my-blog-articl.herokuapp.com'
   const token = getCookie('myBlogToken');

   // Manage Signed User 
   const [user, setUser] = useState(null)
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

   // get user data
   const [userData, setUserData] = useState(null)
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
   const [userProfile, setUserProfile] = useState(null)
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

   // get all article comments data
   const [allComments, setAllComments] = useState(null)
   useEffect(() => {
      axios.get(url+'/comment/get-all')
      .then(result => {
         const reversed = result.data.reverse()
         setAllComments(reversed)
      })
   }, [])

   // get all users data
   const [allUsers, setAllUsers] = useState(null)
   useEffect(() => {
      axios.get(url+'/user/get/all-users')
      .then(result => {
         setAllUsers(result.data)
      })
   }, [])

   // get all users profile data
   const [allUsersProfile, setAllUsersProfile] = useState(null)
   useEffect(() => {
      axios.get(url+'/user/get/all-users/profile')
      .then(result => {
         setAllUsersProfile(result.data)
      })
   }, [])

   // get all user article data
   const [homeArticles, setHomeArticles] = useState(null)
   const [totalPage, setTotalPage] = useState(null)
   const [filterData, setFilterData] = useState(null)
   const [pageNumber, setPageNumber] = useState(null)
   useEffect(() => {
      axios.get(`${url}/get/home/article/filter/${filterData || 'latest'}/page=${pageNumber || 1}`)
         .then(result => {
            setHomeArticles(result.data.homeArticles)
            setTotalPage(result.data.totalPage)
         })
   }, [])
   useEffect(() => {
      if (filterData) {
         axios.get(`${url}/get/home/article/filter/${filterData || 'latest'}/page=${pageNumber || 1}`)
         .then(result => {
            setHomeArticles(result.data.homeArticles)
            setTotalPage(result.data.totalPage)
         })
      }
   }, [filterData])
   useEffect(() => {
      if (pageNumber) {
         axios.get(`${url}/get/home/article/filter/${filterData || 'latest'}/page=${pageNumber || 1}`)
         .then(result => {
            setHomeArticles(result.data.homeArticles)
            setTotalPage(result.data.totalPage)
         })
      }
   }, [pageNumber])


   // get all user article data
   const [allArticles, setAllArticles] = useState(null)
   useEffect(() => {
      axios.get(`${url}/get-all/article`)
         .then(result => {
            setAllArticles(result.data)
         })
   }, [])

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
      homeArticles, 
      setHomeArticles,
      allArticles, 
      setAllArticles,
      totalPage,
      setFilterData, 
      setPageNumber,
      allComments, 
      setAllComments,
      articleDetail, 
      setArticleDetail,
      editArticle, 
      setEditArticle,
      profileEdit, 
      setProfileEdit,
      popularArticle, 
      imageUploadDialog, 
      setImageUploadDialog,
      setPopularArticle,
      authorArticles, 
      setAuthorArticles,
      allUsers,
      setAllUsers,
      allUsersProfile,
      signupErrors, 
      setSignupErrors,
      signout
   }
}