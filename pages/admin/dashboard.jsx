// import : internal components
import { NavBar } from '../../components/public/Nav';
import { HeadComponent } from '../../components/Head';


// import : internal 
import { getAllTags } from '../../database/tags';

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

export async function getServerSideProps() {
  let allTags;
  try {
    allTags = await getAllTags();
  } 
  catch (error) {
    allTags = [];
  }
  finally {
    return {
      props : {
        allTags : JSON.stringify(allTags)
      }
    }
  }
}
