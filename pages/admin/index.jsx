// DISPLAY ADMIN PAGES
//  LOGIN | REGISTER | DASHBOARD PAGE

import { useState } from 'react';

import { LoginBody, RegisterBody } from '../../components/admin/AccountBody';
import { HeadComponent } from '../../components/Head'
import { ADMIN_URLS } from '../../utils';
import { getAdminUser } from '../../database/user'
import { isAdminMiddleware } from '../../utils/authLib'


const AdminHomePage = ({adminFromDB}) => {
  adminFromDB = JSON.parse(adminFromDB);
  const [existingAdmin, setExistingAdmin] = useState(adminFromDB);

  return (
  <>
      <HeadComponent title="Admin Account" />
      {
        existingAdmin ?  
          <LoginBody />
          :
         <RegisterBody onSuccess={setExistingAdmin}/> 
      }
  </>)
}


export default AdminHomePage;


export async function getServerSideProps({req, res}) {
  
  try {
    const {loggedAsAdmin} = await isAdminMiddleware(req, res);

    if (loggedAsAdmin) {
      return {
        redirect : {
            destination : ADMIN_URLS.dashboard.url,
            permanent : false
        }
      }
    }
    const admin = await getAdminUser();
    return {
        props : { adminFromDB : JSON.stringify(admin)}
      }
  } 
  
  catch (error) {
    console.log(error)
    return {
      props : { adminFromDB : JSON.stringify({})}
    }
  }
  

}