// DISPLAY ADMIN PAGES
//  LOGIN | REGISTER | DASHBOARD PAGE

import { useState, useContext, useEffect } from 'react';
import { LoginBody, RegisterBody } from '../../components/admin/AccountBody';
import { HeadComponent } from '../../components/Head'
import { AdminAuthContext } from '../../contexts/AdminAuthContext';
import { getAdminUser } from '../../database/user';

import { useRouter } from 'next/router'
import { ADMIN_URLS } from '../../utils';

const AdminHomePage = ({adminFromDB}) => {
  const { admin } = useContext(AdminAuthContext);
  adminFromDB = JSON.parse(adminFromDB);
  const [existingAdmin, setExistingAdmin] = useState(adminFromDB);
  const router = useRouter()

  useEffect(() => {
    if (admin) {
      router.replace(ADMIN_URLS.dashboard.url)
    }
  }, [admin])

  return (
  <>
      <HeadComponent title="Admin HomePage" />
      {
        existingAdmin ?  
          <LoginBody />
          :
         <RegisterBody onSuccess={setExistingAdmin}/> 
      }
  </>)
}


export default AdminHomePage;

/*
  if no user            => show register page
  if user found   
      
      if logged out     => show login page
      if logged in      => show dashboard page
*/

export async function getServerSideProps() {
  let admin = null;
  try {
    admin = await getAdminUser();
  } 
  catch (error) {
    console.log(error)
  }
  finally {
    return {
      props : { adminFromDB : JSON.stringify(admin)}
    }
  }

}