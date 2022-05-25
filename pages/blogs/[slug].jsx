import dynamic from "next/dynamic";
// import : internal
import PublicLayout from "../../components/Layouts/PublicLayout";
import { getAllBlogs, getIndividualBlog } from "../../database/blogs";
import { generateDetailViewMetadata } from "../../utils";

// dynamic imports
const BlogDetailBody = dynamic(() =>
  import("../../components/content/BlogDetailBody").then(
    (m) => m.BlogDetailBody
  )
);

const Footer = dynamic(() =>
  import("../../components/detail/Footer").then((m) => m.Footer)
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
    <PublicLayout metaTitle={"Blog : " + blog.title} metaDesc={content}>
      <BlogDetailBody blog={blog} />
      <Footer />
      {/* TODO: add footer content  */}
    </PublicLayout>
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
      revalidate: 1,
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
