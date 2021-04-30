import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useContextData } from '../ContextProvider/ContextProvider';

const CommonForm = () => {
   const contexts = useContextData()

   const history = useHistory();
   const location = useLocation();
   const from = location.state ? `${location.state.from.pathname}` : "/";
   // let { from } = location.state || { from: { pathname: "/" } };
   const redirect = () => {
      // history.replace(from)
      history.push(from)
   }

   return (
      <div className='socialLogin'>
         <div onClick={() => contexts.signInWithFacebook(redirect)} className="socialBox">
            <div className='facebookLogin'>
               <span>Continue With Facebook</span>
            </div>
         </div>
         <div onClick={() => contexts.signInWithGmail(redirect)} className="socialBox">
            <div className='googleLogin'>
               <span>Continue With Google</span>
            </div>
         </div>
      </div>
   );
};

export default CommonForm;