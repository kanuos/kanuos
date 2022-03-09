// import : internal components
import { NavBar } from '../../components/public/Nav';
import { HeadComponent } from '../../components/Head';


// import : internal 
import { getAllTags } from '../../database/tags';
import { isAdminMiddleware } from '../../utils/authLib';
import { ADMIN_ACCOUNT } from '../../utils';

const AdminDashboard = ({allTags}) => {

    return (
        <>
        <HeadComponent title='Admin | Dashboard CMS' />
        <NavBar left={true} type={'admin'} />
        <main className="text-dark main-light w-full h-full min-h-screen p-16">
            <p>
                {allTags}
            </p>
        </main>
        </>
    )
}


export default AdminDashboard;

export async function getServerSideProps({req, res}) {
  let allTags;
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
    allTags = await getAllTags();
    return {
      props : {
        allTags : JSON.stringify(allTags)
      }
    }
  } 
  catch (error) {
    allTags = [];
    return {
      props : {
        allTags : JSON.stringify(allTags)
      }
    }
  }
  
  
}
