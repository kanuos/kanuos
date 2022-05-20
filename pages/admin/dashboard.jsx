import { useState, useContext, useCallback } from "react";
import dynamic from "next/dynamic";

// import : internal components
import PublicLayout from "../../components/Layouts/PublicLayout";

// import : internal
import { getAdminUser } from "../../database/user";
import { isAdminMiddleware } from "../../utils/authLib";
import { ADMIN_ACCOUNT } from "../../utils";
import { CTA } from "../../components/portfolio/CTA";
import { ThemeContext } from "../../contexts/ThemeContext";
import CMSForm from "../../components/admin/forms/CMS";
import axios from "axios";
import { API_ROUTES } from "../../utils/admin";

const PortfolioMgmt = dynamic(() =>
  import("../../components/admin/PortfolioMgmt").then(
    (module) => module.PortfolioMgmt
  )
);

const AdminDashboard = ({ admin }) => {
  admin = JSON.parse(admin);

  const [tab, setTab] = useState(0);
  const { isDarkMode } = useContext(ThemeContext);

  const handleProfileUpdate = useCallback(async (formData) => {
    try {
      delete formData.portfolio;
      const { data, error } = (
        await axios({
          url: API_ROUTES.profile,
          method: "PATCH",
          data: formData,
          withCredentials: true,
        })
      ).data;
      if (error) throw data;
      alert("Updated successfully!");
    } catch (error) {
      alert("Err: " + error);
    }
  }, []);

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
        {tab === 0 && (
          <CMSForm
            type="profile"
            init={admin}
            heading="Profile CMS"
            isDarkMode={isDarkMode}
            getFormData={handleProfileUpdate}
          />
        )}
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
    console.log(admin);
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
