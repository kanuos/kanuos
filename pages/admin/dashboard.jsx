// import : internal components
import { NavBar } from '../../components/public/Nav';
import { HeadComponent } from '../../components/Head';


// import : internal 
import { getAdminUser } from '../../database/user';
import { isAdminMiddleware } from '../../utils/authLib';
import { ADMIN_ACCOUNT } from '../../utils';
import { ProfileComponent } from '../../components/admin/ProfileComponent';

const AdminDashboard = ({admin}) => {
  admin = JSON.parse(admin);
  return (
      <>
      <HeadComponent title='Admin | Dashboard CMS' />
      <NavBar left={true} type={'admin'} />
      <main className="text-dark main-light w-full h-full min-h-screen p-11">
          <ProfileComponent admin={admin} />
      </main>
      </>
  )
}


export default AdminDashboard;

export async function getServerSideProps({req, res}) {
  let admin;
  try {
    const {loggedAsAdmin} = await isAdminMiddleware(req, res);
    if (!loggedAsAdmin) {
      return {
        redirect : {
            destination : ADMIN_ACCOUNT,
            permanent : false
        }
      }
    }
    admin = await getAdminUser('');
    
    let temp = {...admin._doc};
    delete temp.password

    return {
      props : {
        admin : JSON.stringify(temp)
      }
    }
  } 
  catch (error) {
    admin = {};
    return {
      props : {
        admin : JSON.stringify(admin)
      }
    }
  }
  
  
}
