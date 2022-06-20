import { useState } from "react";
// ADMIN design list
import { DesignThumbnail } from "../../../components/content/DesignThumbnail";
import { ADMIN_ACCOUNT, PUBLIC_LIST_TYPES } from "../../../utils";
import { getAllDesigns } from "../../../database/designs";
import { isAdminMiddleware } from "../../../utils/authLib";
import { AdminListLayout } from "../../../components/Layouts/AdminListLayout";

const DesignAdminPage = ({ allDesigns }) => {
  allDesigns = allDesigns ? JSON.parse(allDesigns) : [];

  const [searchText, setSearchText] = useState("");

  return (
    <AdminListLayout
      type={PUBLIC_LIST_TYPES.designs.type}
      totalSize={allDesigns.length}
      list={allDesigns.filter((el) =>
        el.title.toLowerCase().includes(searchText.toLowerCase())
      )}
      searchText={searchText}
      getSearchText={setSearchText}
    >
      {allDesigns
        .filter((el) =>
          el.title.toLowerCase().includes(searchText.toLowerCase())
        )
        ?.map((design, index) => (
          <DesignThumbnail
            key={index}
            data={design}
            adminMode={true}
            index={index}
          />
        ))}
    </AdminListLayout>
  );
};

export default DesignAdminPage;

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

    const designs = await getAllDesigns(true);
    if (!designs || designs.length === 0) throw "No designs found";
    return {
      props: {
        allDesigns: JSON.stringify(designs),
      },
    };
  } catch (error) {
    return {
      props: {
        allDesigns: JSON.stringify([]),
      },
    };
  }
}
