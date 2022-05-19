// ADMIN design list
import { DesignThumbnail } from "../../../components/content/DesignThumbnail";
import { ADMIN_ACCOUNT, PUBLIC_LIST_TYPES } from "../../../utils";
import { getAllDesigns } from "../../../database/designs";
import { isAdminMiddleware } from "../../../utils/authLib";
import { AdminListLayout } from "../../../components/Layouts/AdminListLayout";

const DesignAdminPage = ({ allDesigns }) => {
  allDesigns = allDesigns ? JSON.parse(allDesigns) : [];

  return (
    <AdminListLayout type={PUBLIC_LIST_TYPES.designs.type} list={allDesigns}>
      {allDesigns?.map((design, index) => (
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
    console.log(error);
    return {
      props: {
        allDesigns: JSON.stringify([]),
      },
    };
  }
}
