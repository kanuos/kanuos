// import : internal
import { HeadComponent } from '../../components/Head'
import { BlogDetailBody } from '../../components/content/BlogDetailBody';
import { NavBar } from '../../components/public/Nav'
import { getAllBlogs, getIndividualBlog } from '../../database/blogs'

const BlogDetail = ({blog}) => {
    blog = JSON.parse(blog);
    return (
        <>
        <HeadComponent title={blog.name} />
        <NavBar />
        <BlogDetailBody blog={blog} />
        </>
  )
}

export default BlogDetail


export async function getStaticProps({params}) {
    let blog;
    try {
        blog = await getIndividualBlog(false, params.slug);
    } 
    catch (error) {
        blog = {}
    }
    finally {
        return {
            props : {
                blog : JSON.stringify(blog),
            },
            revalidate : 10
        }
    }
}


export async function getStaticPaths() {
    const allBlogs = await getAllBlogs(false);
    const paths = allBlogs.map(d => ({ params : { slug : d.slug}}));
    return {
      paths,
      fallback : false
    }
  
  }
