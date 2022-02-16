// BLOG LIST PAGE
// import : internal
import { HeadComponent } from '../../components/Head'
import { PublicHeader } from '../../components/public/Header';
import { NavBar } from '../../components/public/Nav';
import { PUBLIC_LIST_TYPES } from '../../utils';
import { BlogThumbnail } from '../../components/content/BlogThumbnail';
import { JoinLine } from '../../components/public/DescHeader';
import { ListLoader } from '../../components/public/ListLoader';


const BlogList = () => {
  return (
    <>
    <HeadComponent title="Sounak Mukherjee's Blogs" />
    <NavBar />
    <div className='main-light h-full w-full'>
        <div className='px-12 py-20 max-w-3xl mx-auto select-text selection:bg-black selection:text-light'>
            <PublicHeader data={{...PUBLIC_LIST_TYPES.blogs, count : blogList.length}} />
            <main className='flex flex-col my-20 gap-20'>
                {blogList.map((blog, index) => (
                    <BlogThumbnail 
                        key={blog._id} 
                        data={blog} 
                        index={index + 1} />
                ))}
            </main>
            <ListLoader />
        </div>
    </div>
    </>
  )
}



export default BlogList;


const blogList = [
    {
        _id : 1,
        name : 'How I implement JWT for authorization',
        desc : `Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem quis ipsa amet, odio cupiditate voluptatibus nihil doloremque dolores nam suscipit temporibus cumque aut, sunt iure ad corporis harum delectus libero, laborum voluptas? Voluptates, odio omnis odit laudantium tempora animi maiores iusto delectus necessitatibus nulla autem recusandae alias, esse illo magnam.
        `,
        tags : ['Access Token', 'Refresh Token', 'JsonWebToken', 'Authorization'],
        date : new Date().toDateString()
    },
    {
        _id : 2,
        name : 'LeetCode Solution : Two Sum',
        desc : `Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem quis ipsa amet, odio cupiditate voluptatibus nihil doloremque dolores nam suscipit temporibus cumque aut, sunt iure ad corporis harum delectus libero, laborum voluptas? Voluptates, odio omnis odit laudantium tempora animi maiores iusto delectus necessitatibus nulla autem recusandae alias, esse illo magnam.
        `,
        tags : ['LeetCode', 'Dynamic Problem', 'Optimization'],
        date : new Date().toDateString()
    }
]