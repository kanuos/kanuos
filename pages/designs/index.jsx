// Project LIST PAGE
// import : internal
import { HeadComponent } from '../../components/Head'
import { PublicHeader } from '../../components/public/Header';
import { NavBar } from '../../components/public/Nav';
import { PUBLIC_LIST_TYPES } from '../../utils';
import { ListLoader } from '../../components/public/ListLoader';
import { DesignThumbnail } from '../../components/content/DesignThumbnail';
import { getAllDesigns } from '../../database/designs'

const DesignList = ({designList}) => {
designList = JSON.parse(designList)
  return (
    <>
    <HeadComponent title="Sounak Mukherjee's Ui/UX Designs" />
    <NavBar />
    <div className='main-light h-full w-full'>
        <div className='px-12 py-20 w-full flex flex-col items-center justify-start mx-auto select-text selection:bg-black selection:text-light h-full'>
            <PublicHeader data={{...PUBLIC_LIST_TYPES.designs, count : designList.length}} />
        {
            designList.length > 0 ?
            <>
            <main className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-8 lg:grid-cols-12 grid-flow-row gap-10 w-full mb-20'>
                {designList.map(design => (
                    <DesignThumbnail key={design._id} data={design} />
                ))}
            </main>
            <ListLoader />
            </>
            :
            <main className="h-[30vh] flex flex-col items-center justify-center">
                <p className='opacity-75'>
                    No designs found!
                </p>
            </main>
        }
        </div>
    </div>
    </>
  )
}



export default DesignList;

export async function getStaticProps(){
    let designList;
    try {
        designList = await getAllDesigns(false);
    } 
    catch (error) {
        console.log(error)
        designList = []
    }
    finally {
        return {
            props : {
                designList : JSON.stringify(designList)
            },
            revalidate : 10
        }
    }
}