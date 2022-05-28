import { useContext } from "react";
// import : internal
import { getAllTags } from "../../database/tags";
import { ADMIN_ACCOUNT, ADMIN_URLS } from "../../utils";
import { isAdminMiddleware } from "../../utils/authLib";
import PublicLayout from "../../components/Layouts/PublicLayout";
import { ContentCRUD_Form } from "../../components/admin/forms/ContentForm";
import { ThemeContext } from "../../contexts/ThemeContext";

const ContentCMS = ({ allTags }) => {
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <PublicLayout metaTitle="Admin | Content CMS" navType="admin">
      <ContentCRUD_Form
        allTags={allTags}
        heading="Create new content"
        isDarkMode={isDarkMode}
        init={{}}
      />
    </PublicLayout>
  );
};

export default ContentCMS;

export async function getServerSideProps({ req, res }) {
  let allTags;
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
    allTags = await getAllTags();
    return {
      props: {
        allTags: JSON.stringify(allTags),
      },
    };
  } catch (error) {
    allTags = [];
    return {
      props: {
        allTags: JSON.stringify(allTags),
      },
    };
  }
}
