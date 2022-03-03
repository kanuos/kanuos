// BLOG LIST PAGE
// import : internal
import { HeadComponent } from '../../components/Head'
import { PublicHeader } from '../../components/public/Header';
import { NavBar } from '../../components/public/Nav';
import { PUBLIC_LIST_TYPES } from '../../utils';
import { BlogThumbnail } from '../../components/content/BlogThumbnail';
import { ListLoader } from '../../components/public/ListLoader';
import { getAllBlogs } from '../../database/blogs'

const BlogList = ({blogList}) => {
    blogList = JSON.parse(blogList);
    return (
    <>
    <HeadComponent title="Sounak Mukherjee's Blogs" />
    <NavBar />
    <div className='main-light h-full w-full'>
        <div className='px-12 py-20 max-w-3xl mx-auto select-text selection:bg-black selection:text-light'>
            <PublicHeader data={{...PUBLIC_LIST_TYPES.blogs, count : blogList.length}} />
        {
            blogList.length > 0 ?
            <>
                <main className='flex flex-col my-20 gap-20'>
                    {blogList.map((blog, index) => (
                        <BlogThumbnail 
                            key={blog._id} 
                            data={blog} 
                            index={index + 1} />
                    ))}
                </main>
                <ListLoader />
            </>
            :
            <main className="h-[30vh] flex flex-col items-center justify-center">
                <p className='opacity-75'>
                    No blogs found!
                </p>
            </main>
        }
        </div>
    </div>
    </>
  )
}



export default BlogList;

export async function getStaticProps() {
    let blogList;
    try {
        blogList = await getAllBlogs(false);
    } 
    catch (error) {
        console.log(error);
        blogList = []
    }
    finally {
        return {
            props : {
                blogList : JSON.stringify(blogList)
            },
            revalidate : 5
        }
    }
}