import dynamic from "next/dynamic";
// import : internal
import { HeadComponent } from "../../components/Head";
import { getAllBlogs, getIndividualBlog } from "../../database/blogs";
import { generateDetailViewMetadata } from "../../utils";

// dynamic imports
const BlogDetailBody = dynamic(() =>
  import("../../components/content/BlogDetailBody").then(
    (m) => m.BlogDetailBody
  )
);
const NavBar = dynamic(() =>
  import("../../components/public/Nav").then((m) => m.NavBar)
);
const ThemeToggler = dynamic(() =>
  import("../../components/public/ThemeToggler").then((m) => m.ThemeToggler)
);

const BlogDetail = ({ blog }) => {
  blog = JSON.parse(blog);
  const content = generateDetailViewMetadata(
    blog.title,
    blog.tags?.map(({ tag }) => tag)?.toString(),
    "blog",
    "blog"
  );
  return (
    <>
      <HeadComponent title={blog.title} content={content} />
      <NavBar />
      <ThemeToggler />
      <BlogDetailBody blog={blog} />
    </>
  );
};

export default BlogDetail;

export async function getStaticProps({ params }) {
  let blog;
  try {
    blog = await getIndividualBlog(false, params.slug);
  } catch (error) {
    blog = {};
  } finally {
    return {
      props: {
        blog: JSON.stringify(blog),
      },
      revalidate: 10,
    };
  }
}

export async function getStaticPaths() {
  const allBlogs = await getAllBlogs(false);
  const paths = allBlogs.map((d) => ({ params: { slug: d.slug } }));
  return {
    paths,
    fallback: false,
  };
}
