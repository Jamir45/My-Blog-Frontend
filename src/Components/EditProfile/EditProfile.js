import React, { useEffect } from 'react';
import { useContextData } from '../ContextProvider/ContextProvider';
import CreateProfile from '../CreateProfile/CreateProfile';

const EditProfile = () => {
   const {profileEdit, userProfile, setProfileEdit} = useContextData()
   useEffect(() => {
      setProfileEdit(true)
   }, [])

   return (
      <>
         {userProfile && <CreateProfile userProfile={userProfile} />}
      </>
   );
};

export default EditProfile;