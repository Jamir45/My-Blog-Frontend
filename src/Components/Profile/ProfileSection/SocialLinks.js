import React from 'react';
import LanguageIcon from '@material-ui/icons/Language';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const SocialLinks = ({socialLinks}) => {
   const {website, facebook, twitter, linkedin} = socialLinks
   
   return (
      <ul className="d-flex justify-content-center socialLinks">
         {
            website !== "" && 
            <a href={website} target="_blank"> <LanguageIcon/> </a>
         }
         {
            facebook !== "" && 
            <a href={facebook} target="_blank"> <FacebookIcon/> </a>
         }
         {
            twitter !== "" && 
            <a href={twitter} target="_blank"> <TwitterIcon/> </a>
         }
         {
            linkedin !== "" && 
            <a href={linkedin} target="_blank"> <LinkedInIcon/> </a>
         }       
      </ul>
   );
};

export default SocialLinks;