import { useState, useContext, useCallback } from "react";
import dynamic from "next/dynamic";
import axios from "axios";

// import : internal components
import PublicLayout from "../../components/Layouts/PublicLayout";
import layout from "../../utils/cms";

// import : internal
// DB methods
import { getAdminUser } from "../../database/user";
import { getAllDesigns } from "../../database/designs";
import { getAllProjects } from "../../database/projects";

import { isAdminMiddleware } from "../../utils/authLib";
import { ADMIN_ACCOUNT } from "../../utils";
import { CTA } from "../../components/portfolio/CTA";
import { ThemeContext } from "../../contexts/ThemeContext";
import { API_ROUTES } from "../../utils/admin";

const CMSForm = dynamic(() => import("../../components/admin/forms/CMS"));
const PortfolioMgmt = dynamic(() =>
  import("../../components/admin/PortfolioMgmt").then(
    (module) => module.PortfolioMgmt
  )
);

const AdminDashboard = ({ data }) => {
  const { admin, allDesigns, allProjects } = JSON.parse(data);

  const [adminData, setAdminData] = useState(admin);
  const [portfolios, setPortfolios] = useState(admin?.portfolio || []);
  const [editData, setEditData] = useState(null);
  const [editMode, setEditMode] = useState(false);

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
      alert("Profile Updated successfully!");
      setAdminData(data);
    } catch (error) {
      alert("Err: " + error);
    }
  }, []);

  const getEditData = useCallback((editable) => {
    setEditMode(true);
    setEditData(editable);
  }, []);

  const handleSubmitPortfolio = useCallback(async ({ method, portfolio }) => {
    try {
      let url = API_ROUTES.portfolio;
      // dynamic URL to server
      switch (method) {
        case "patch":
        case "delete":
          url += `/${portfolio._id}`;
          break;
      }

      // Send the data to server and wait for response from server
      const { error, data } = (
        await axios({
          url,
          method,
          data: portfolio,
        })
      ).data;

      if (error || !data) {
        throw data;
      }

      if (method === "delete") {
        setPortfolios((prev) => prev.filter((el) => el._id !== data._id));
        alert(`Portfolio ${method}ed successfully`);
        return;
      }

      if (method === "post") {
        setPortfolios((prev) => [...prev, data]);
        setEditData(null);
        setEditMode(false);
        alert(`Portfolio ${method}ed successfully`);
        return;
      }

      if (method === "patch") {
        setPortfolios((prev) =>
          prev.map((el) => {
            if (el._id === data._id) {
              return data;
            }
            return el;
          })
        );
        setEditData(null);
        setEditMode(false);
        alert(`Portfolio ${method}ed successfully`);
        return;
      }
    } catch (error) {
      alert(JSON.stringify(error));
    }
  }, []);

  return (
    <PublicLayout
      metaTitle="Admin | Dashboard CMS"
      metaDesc="Sounak Mukherjee AKA Kanuos"
      navType="admin"
    >
      <div className="min-h-screen px-8">
        <div className="flex items-center justify-start w-full mb-6 container max-w-4xl mx-auto gap-4 scale-90 origin-left">
          <div>
            <CTA
              btnMode={true}
              isActive={tab === 0}
              label="Update profile"
              cb={() => setTab(0)}
              isDarkMode={isDarkMode}
            />
          </div>
          <div>
            <CTA
              btnMode={true}
              isActive={tab === 1}
              label="Portfolio Mgmt"
              cb={() => setTab(1)}
              isDarkMode={isDarkMode}
            />
          </div>
        </div>
        {tab === 0 && (
          <CMSForm
            init={adminData}
            heading="Profile CMS"
            isDarkMode={isDarkMode}
            layout={layout.PROFILE_CMS}
            getFormData={handleProfileUpdate}
          />
        )}
        {tab === 1 && (
          <PortfolioMgmt
            init={editData}
            editMode={editMode}
            key={JSON.stringify({ portfolios, editData, editMode })}
            submitToServer={handleSubmitPortfolio}
            portfolioProjects={portfolios}
            allProjects={allProjects}
            allDesigns={allDesigns}
            isDarkMode={isDarkMode}
            getEditData={getEditData}
          />
        )}
      </div>
    </PublicLayout>
  );
};

export default AdminDashboard;

export async function getServerSideProps({ req, res }) {
  let admin = {},
    allProjects = [],
    allDesigns = [];
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
    allProjects = await getAllProjects(true);
    allDesigns = await getAllDesigns(true);
    let temp = { ...admin._doc };
    delete temp.password;

    return {
      props: {
        data: JSON.stringify({
          admin: temp,
          allProjects,
          allDesigns,
        }),
      },
    };
  } catch (error) {
    return {
      props: {
        data: JSON.stringify({
          admin,
          allProjects,
          allDesigns,
        }),
      },
    };
  }
}
