// DISPLAY ADMIN PAGES
//  LOGIN | REGISTER | DASHBOARD PAGE

import { LoginBody, RegisterBody } from '../../components/admin/AccountBody';
import { HeadComponent } from '../../components/Head'
import { NavBar } from '../../components/public/Nav';


const AdminHomePage = () => {
    
    return (
    <>
        <HeadComponent title="Admin HomePage" />
        <NavBar type='admin' left={true}/>
        {/* <LoginBody /> */}
        <RegisterBody />
    </>
  )
}


export default AdminHomePage;

/*
  if no user            => show register page
  if user found   
      
      if logged out     => show login page
      if logged in      => show dashboard page
*/