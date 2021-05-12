import React, { useEffect } from 'react';
import { useContextData } from '../ContextProvider/ContextProvider';
import ProfileSection from './ProfileSection/ProfileSection';
import ProfileContent from './ProfileContent/ProfileContent';
import ComponentLoading from '../Loading/Loading';

const Profile = () => {
   const {
      user, 
      userData, 
      userProfile, 
      allArticles,
      toastMessage, 
      setArticleDetail,
      setAuthorArticles
   } = useContextData()

   useEffect(() => {
      setArticleDetail(false)
      setAuthorArticles(true)
   }, [])

   // const { register, handleSubmit, watch, errors } = useForm();
   // const onSubmit = async data => {
   //    const multipleImage = data.File
   //    const formData = new FormData()
   //    for (let i = 0; i < multipleImage.length; i++) {
   //       const element = multipleImage[i];
   //       formData.append('files', element)
   //    }
   //    const result = await axios.post(url+'/images', formData)
   //    console.log(result)
   // };

   return (
      <div className="container">
         {toastMessage()}
         <div className="row userProfile">
            <div className="col-md-0 col-lg-1"></div>
            <div className="col-md-12 col-lg-10">
               {
                  userData && userProfile ?
                  <ProfileSection 
                     user={user} 
                     userData={userData} 
                     userProfile={userProfile} 
                  /> : 
                  <ComponentLoading />
               }
               <div className="row profileContent">
                  {
                     userData && userProfile && allArticles &&
                     <ProfileContent 
                        user={user} 
                        userData={userData} 
                        userProfile={userProfile} 
                        allArticles={allArticles}
                     />
                  }
               </div>
            </div>
            <div className="col-md-0 col-lg-1"></div>
         </div>
         {/* <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Upload Multiple Files</h1>
            <input className='form-control' name="File" type="file" ref={register({required: true,})} multiple />
            {errors.File && <span style={{color:'red'}}>This field is required</span>}

            <input type="submit"/>
         </form> */}
      </div>
   );
};

export default Profile;