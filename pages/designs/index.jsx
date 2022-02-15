// Project LIST PAGE
// import : internal
import { HeadComponent } from '../../components/Head'
import { PublicHeader } from '../../components/public/Header';
import { NavBar } from '../../components/public/Nav';
import { PUBLIC_LIST_TYPES } from '../../utils';
import { ListLoader } from '../../components/public/ListLoader';
import { DesignThumbnail } from '../../components/content/DesignThumbnail';


const DesignList = () => {
  return (
    <>
    <HeadComponent title="Sounak Mukherjee's Ui/UX Designs" />
    <NavBar />
    <div className='main-light h-full w-full'>
        <div className='px-12 py-20 w-full flex flex-col items-center justify-start mx-auto select-text selection:bg-black selection:text-light h-full'>
            <PublicHeader data={{...PUBLIC_LIST_TYPES.designs, count : designList.length}} />
            <main className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-8 lg:grid-cols-12 grid-flow-row gap-8 w-full mb-20'>
                {designList.map(design => (
                    <DesignThumbnail key={design._id} data={design} />
                ))}
            </main>
            <ListLoader />
        </div>
    </div>
    </>
  )
}



export default DesignList;

const designList = [
    {
        _id : 1,
        title : 'football.io',
        thumbnail : `https://images.unsplash.com/photo-1517747614396-d21a78b850e8`
    },
    {
        _id : 2,
        title : 'Instacart clone',
        thumbnail : `https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9`
    },
    {
        _id : 3,
        title : 'Pizza App',
        thumbnail : `https://images.unsplash.com/photo-1604382354936-07c5d9983bd3`
    },
    {
        _id : 4,
        title : 'Freelancer',
        thumbnail : `https://images.unsplash.com/photo-1596003906949-67221c37965c`
    },
    {
        _id : 5,
        title : 'Chef Tribe',
        thumbnail : `https://images.unsplash.com/photo-1505576399279-565b52d4ac71`
    },
    {
        _id : 6,
        title : 'Travellion',
        thumbnail : `https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6`
    },
    {
        _id : 7,
        title : 'Crypto',
        thumbnail : `https://images.unsplash.com/photo-1523961131990-5ea7c61b2107`
    },
    {
        _id : 8,
        title : 'Sounak',
        thumbnail : `https://images.unsplash.com/photo-1584967918940-a7d51b064268`
    },
]