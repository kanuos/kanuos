import dynamic from "next/dynamic";
import { useContext } from "react";
// import : internal
import PublicLayout from "../../components/Layouts/PublicLayout";
import { ThemeContext } from "../../contexts/ThemeContext";
import { getAllBlogs, getIndividualBlog } from "../../database/blogs";
import { generateDetailViewMetadata } from "../../utils";

// dynamic imports
const BlogDetailBody = dynamic(() =>
  import("../../components/content/BlogDetailBody").then(
    (m) => m.BlogDetailBody
  )
);

const ContactMe = dynamic(() =>
  import("../../components/portfolio/ContactMe").then((m) => m.ContactMe)
);

const BlogDetail = ({ blog }) => {
  blog = JSON.parse(blog);
  const content = generateDetailViewMetadata(
    blog.title,
    blog.tags?.map(({ tag }) => tag)?.toString(),
    "blog",
    "blog"
  );

  const { isDarkMode } = useContext(ThemeContext);

  return (
    <PublicLayout metaTitle={"Blog : " + blog.title} metaDesc={content}>
      <BlogDetailBody blog={blog} />
      <ContactMe isDarkMode={isDarkMode} portfolioMode={false} />
    </PublicLayout>
  );
};

export default BlogDetail;

export async function getStaticProps({ params }) {
  let blog;
  try {
    blog = await getIndividualBlog(false, params.slug);
    return {
      props: {
        blog: JSON.stringify(blog),
      },
      revalidate: 1,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

export async function getStaticPaths() {
  const allBlogs = await getAllBlogs(false);
  const paths = allBlogs.map((d) => ({ params: { slug: d.slug } }));
  return {
    paths,
    fallback: "blocking",
  };
}
