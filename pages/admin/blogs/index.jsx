import { useState } from "react";
// ADMIN blog list
import { getAllBlogs } from "../../../database/blogs";
import { ADMIN_ACCOUNT, PUBLIC_LIST_TYPES } from "../../../utils";
import { isAdminMiddleware } from "../../../utils/authLib";

import { BlogThumbnail } from "../../../components/content/BlogThumbnail";
import { AdminListLayout } from "../../../components/Layouts/AdminListLayout";

const BlogsAdminPage = ({ allBlogs }) => {
  allBlogs = allBlogs ? JSON.parse(allBlogs) : [];

  const [searchText, setSearchText] = useState("");

  return (
    <AdminListLayout
      type={PUBLIC_LIST_TYPES.blogs.type}
      totalSize={allBlogs.length}
      list={allBlogs.filter((el) =>
        el.title.toLowerCase().includes(searchText.toLowerCase())
      )}
      searchText={searchText}
      getSearchText={setSearchText}
    >
      {allBlogs
        .filter((el) =>
          el.title.toLowerCase().includes(searchText.toLowerCase())
        )
        ?.map((blog, index) => (
          <BlogThumbnail
            key={blog._id}
            data={blog}
            index={index + 1}
            adminMode={true}
          />
        ))}
    </AdminListLayout>
  );
};

export default BlogsAdminPage;

export async function getServerSideProps({ req, res }) {
  try {
    const { loggedAsAdmin } = await isAdminMiddleware(req, res);

    if (!loggedAsAdmin) {
      return {
        redirect: {
          destination: ADMIN_ACCOUNT,
          permanent: false,
        },
      };
    }

    const blogs = await getAllBlogs(true);
    return {
      props: {
        allBlogs: JSON.stringify(blogs),
      },
    };
  } catch (error) {
    return {
      props: {
        allBlogs: JSON.stringify([]),
      },
    };
  }
}
