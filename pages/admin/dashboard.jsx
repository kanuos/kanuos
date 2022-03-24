import { useState } from 'react'
import dynamic from 'next/dynamic';

// import : internal components
import { HeadComponent } from '../../components/Head';


// import : internal 
import { getAdminUser } from '../../database/user';
import { isAdminMiddleware } from '../../utils/authLib';
import { ADMIN_ACCOUNT } from '../../utils';

// dynamic imports
const ProfileComponent = dynamic(() => import('../../components/admin/ProfileComponent').then(module => module.ProfileComponent))

const PortfolioMgmt = dynamic(() => import('../../components/admin/PortfolioMgmt').then(module => module.PortfolioMgmt))

const NavBar = dynamic(() => import('../../components/public/Nav').then(module => module.NavBar))




const AdminDashboard = ({admin}) => {
  admin = JSON.parse(admin);
  
  const [tab, setTab] = useState(0);

  return (
      <>
      <HeadComponent title='Admin | Dashboard CMS' />
      <NavBar left={true} type={'admin'} />
      <main className="text-dark main-light w-full h-full min-h-screen p-11">
        <ul className="flex items-center justify-center gap-x-4 my-6 text-xs">
          <li 
            className={tab === 0  ?'text-primary cursor-default' : 'cursor-pointer hover:underline'} 
            onClick={() => setTab(0)}>
            Update Profile
          </li>
          <li 
            className={tab === 1 ? 'text-primary cursor-default' : 'cursor-pointer hover:underline'} 
            onClick={() => setTab(1)}>
            Portfolio Management
          </li>
        </ul>
        {tab === 0 && <ProfileComponent admin={admin} />}
        {tab === 1 && <PortfolioMgmt projects={admin.portfolio} />}
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
    console.log(error)
    admin = {};
    return {
      props : {
        admin : JSON.stringify(admin)
      }
    }
  }
  
  
}
