import { useState, useContext } from "react";
import dynamic from "next/dynamic";

// import : internal components
import PublicLayout from "../../components/Layouts/PublicLayout";

// import : internal
import { getAdminUser } from "../../database/user";
import { isAdminMiddleware } from "../../utils/authLib";
import { ADMIN_ACCOUNT } from "../../utils";
import { CTA } from "../../components/portfolio/CTA";
import { ThemeContext } from "../../contexts/ThemeContext";

// dynamic imports
const ProfileComponent = dynamic(() =>
  import("../../components/admin/ProfileComponent").then(
    (module) => module.ProfileComponent
  )
);

const PortfolioMgmt = dynamic(() =>
  import("../../components/admin/PortfolioMgmt").then(
    (module) => module.PortfolioMgmt
  )
);

const AdminDashboard = ({ admin }) => {
  admin = JSON.parse(admin);

  const [tab, setTab] = useState(0);
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <PublicLayout
      metaTitle="Admin | Dashboard CMS"
      metaDesc="Sounak Mukherjee AKA Kanuos"
      navType="admin"
    >
      <div className="min-h-screen p-8">
        <div className="flex items-center justify-center gap-x-4 mb-6">
          <CTA
            btnMode={true}
            isActive={tab === 0}
            label="Update profile"
            cb={() => setTab(0)}
            isDarkMode={isDarkMode}
          />
          <CTA
            btnMode={true}
            isActive={tab === 1}
            label="Portfolio Mgmt"
            cb={() => setTab(1)}
            isDarkMode={isDarkMode}
          />
        </div>
        {tab === 0 && <ProfileComponent admin={admin} />}
        {tab === 1 && <PortfolioMgmt projects={admin.portfolio} />}
      </div>
    </PublicLayout>
  );
};

export default AdminDashboard;

export async function getServerSideProps({ req, res }) {
  let admin;
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
    admin = await getAdminUser("");

    let temp = { ...admin._doc };
    delete temp.password;

    return {
      props: {
        admin: JSON.stringify(temp),
      },
    };
  } catch (error) {
    console.log(error);
    admin = {};
    return {
      props: {
        admin: JSON.stringify(admin),
      },
    };
  }
}
