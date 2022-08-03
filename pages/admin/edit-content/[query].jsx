// Edit existing content page
// import : built in + external
import axios from "axios";
import { useRouter } from "next/router";
import { useContext } from "react";
import dynamic from "next/dynamic";

// import : internal components
import PublicLayout from "../../../components/Layouts/PublicLayout";
const CTA = dynamic(() =>
  import("../../../components/portfolio/CTA").then((m) => m.CTA)
);
const ContentCRUD_Form = dynamic(() =>
  import("../../../components/admin/forms/ContentForm").then(
    (m) => m.ContentCRUD_Form
  )
);

// import : internal
import { getIndividualProject } from "../../../database/projects";
import { getIndividualBlog } from "../../../database/blogs";
import { getAllTags } from "../../../database/tags";
import { ADMIN_ACCOUNT, ADMIN_URLS } from "../../../utils";
import { API_ROUTES, CONTENT_TYPE } from "../../../utils/admin";
import { getIndividualDesign } from "../../../database/designs";
import { isAdminMiddleware } from "../../../utils/authLib";
import { ThemeContext } from "../../../contexts/ThemeContext";

const EditCMS = ({ allTags, data, contentType }) => {
  data = data ? JSON.parse(data) : {};
  const { isDarkMode } = useContext(ThemeContext);
  const router = useRouter();

  if (JSON.parse(allTags).length === 0) {
    router?.push(ADMIN_URLS.tags.url);
  }

  async function handleDeleteContent() {
    try {
      const verificationCode = prompt(
        `Delete ${contentType}! \nEnter the code ${data._id} to confirm`
      );

      if (verificationCode.trim() !== data._id) return;

      const url = API_ROUTES[contentType + "s"] + `/${data._id}`;

      const response = (
        await axios({
          url,
          method: "DELETE",
          withCredentials: true,
        })
      ).data;

      if (response.err) throw response.data;

      router.replace(ADMIN_URLS[contentType + "s"].url);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <PublicLayout metaTitle="Admin | Content CMS" navType="admin">
      <div className="h-auto w-full">
        <ContentCRUD_Form
          allTags={allTags}
          heading={"Edit " + contentType}
          isDarkMode={isDarkMode}
          init={data}
          contentType={contentType}
          action={"/" + data._id}
          method="PATCH"
        />
      </div>

      <div className="w-max mb-20 mx-auto text-primary">
        <CTA
          isDarkMode={isDarkMode}
          btnMode={true}
          cb={handleDeleteContent}
          label={`DELETE ${contentType} "${data.title}"`}
        />
      </div>
    </PublicLayout>
  );
};

export default EditCMS;

export async function getServerSideProps(ctx) {
  let allTags, data, type;

  try {
    const { req, res } = ctx;
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
    const { id, query } = ctx.query;
    type = query;

    switch (query.toLowerCase()) {
      case CONTENT_TYPE.blog.name:
        data = await getIndividualBlog(true, id);
        break;

      case CONTENT_TYPE.project.name:
        data = await getIndividualProject(true, id);
        break;

      case CONTENT_TYPE.design.name:
        data = await getIndividualDesign(true, id);
        break;

      default:
        data = null;
    }

    if (!data) throw "Content not found";

    return {
      props: {
        allTags: JSON.stringify(allTags),
        data: JSON.stringify(data),
        contentType: type,
      },
    };
  } catch (error) {
    allTags = [];
    data = {};
    return {
      props: {
        allTags: JSON.stringify(allTags),
        data: JSON.stringify(data),
        contentType: type,
      },
    };
  }
}
