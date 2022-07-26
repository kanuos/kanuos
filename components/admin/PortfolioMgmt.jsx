import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { MdOutlineFingerprint } from "react-icons/md";
import { CTA } from "../portfolio/CTA";

const PortfolioForm = dynamic(() => import("./forms/PortfolioForm"));

export const PortfolioMgmt = ({
  portfolioProjects = [],
  isDarkMode,
  allProjects,
  allDesigns,
  submitToServer,
  init,
  getEditData,
  editMode,
}) => {
  const [showForm, setShowForm] = useState(
    portfolioProjects.length === 0 || editMode
  );
  const [availableDesigns, setAvailableDesigns] = useState([]);
  const [availableProjects, setAvailableProjects] = useState([]);

  useEffect(() => {
    const portfolioDesignID = portfolioProjects.map((item) => item.design._id);
    const portfolioProjectID = portfolioProjects.map(
      (item) => item.project._id
    );

    setAvailableDesigns(() =>
      allDesigns.filter((el) => !portfolioDesignID.includes(el._id))
    );
    setAvailableProjects(() =>
      allProjects.filter((el) => !portfolioProjectID.includes(el._id))
    );
  }, [portfolioProjects, allDesigns, allProjects]);

  function handleDeleteProjectFromPortfolio(portfolio) {
    const { _id } = portfolio;
    if (
      prompt(`Enter the code ${_id} into the prompt to delete!`).trim() !== _id
    ) {
      return;
    }
    submitToServer({
      method: "delete",
      portfolio,
    });
  }

  const priority = {
    1: "Low",
    2: "Average",
    3: "High",
  };

  return (
    <div className="container max-w-4xl mx-auto">
      <div className="flex items-center justify-between pt-4 border-t mt-2.5">
        <h1 className="heading--secondary">
          Portfolio Management &nbsp;&mdash;&nbsp;{" "}
          <small className="font-sans">({portfolioProjects.length})</small>
        </h1>
        {Boolean(availableDesigns.length * availableProjects.length) && (
          <button
            type="button"
            onClick={() => setShowForm((prev) => !prev)}
            title={`${showForm ? "Hide" : "Show"} form`}
            className="text-xl hover:text-secondary transition-all"
          >
            <MdOutlineFingerprint />
          </button>
        )}
      </div>

      {(showForm ||
        Boolean(availableDesigns.length * availableProjects.length)) && (
        <PortfolioForm
          init={init}
          key={JSON.stringify({ init, portfolioProjects })}
          getData={submitToServer}
          isDarkMode={isDarkMode}
          availableDesigns={availableDesigns}
          availableProjects={availableProjects}
        />
      )}

      {/* portfolio lists */}
      {portfolioProjects.length > 0 ? (
        <section className="w-full">
          <ul className="flex flex-col items-start gap-2 my-6">
            <li className="flex items-center justify-start gap-x-4 text-xs">
              <span className="w-10 h-1 bg-secondary block rounded-full"></span>
              <small className="font-bold">
                Showcased (
                {portfolioProjects.filter((el) => el.isShowcased).length})
              </small>
            </li>
            <li className="flex items-center justify-start gap-x-4 text-xs">
              <span className="w-10 h-1 bg-primary block rounded-full"></span>
              <small className="font-bold">
                Not Showcased (
                {portfolioProjects.length -
                  portfolioProjects.filter((el) => el.isShowcased).length}
                )
              </small>
            </li>
          </ul>

          <table className="w-full mx-auto table-fixed border-2 border-current border-separate">
            <thead
              className={`border-2 border-current ${
                !isDarkMode ? "nav-dark" : "nav-light"
              }`}
            >
              <tr className="capitalize">
                <th className="p-2 font-bold text-lg">
                  <small>Project</small>
                </th>
                <th className="p-2 font-bold text-lg">
                  <small>Design</small>
                </th>
                <th className="p-2 font-bold text-lg">
                  <small>Priority</small>
                </th>
                <th className="p-2 font-bold text-lg">
                  <small>Action</small>
                </th>
              </tr>
            </thead>
            <tbody className="font-title text-dark">
              {portfolioProjects.map((portfolio) => (
                <tr
                  key={portfolio._id}
                  className={
                    portfolio.isShowcased ? "bg-secondary" : "bg-primary"
                  }
                >
                  <td
                    className={`p-2 text-sm capitalize text-center`}
                    title={portfolio.project._id}
                  >
                    {portfolio.project.title}
                  </td>
                  <td
                    className={`p-2 text-sm capitalize text-center`}
                    title={portfolio.design._id}
                  >
                    {portfolio.design.title}
                  </td>
                  <td className={`p-2 text-sm capitalize text-center`}>
                    {priority[portfolio.priority]}
                  </td>
                  <td
                    className={`p-2 text-sm flex items-center justify-center flex-col md:flex-row capitalize text-center`}
                  >
                    <CTA
                      tiny={true}
                      btnMode={true}
                      cb={() => getEditData(portfolio)}
                      label="Edit"
                    />
                    <CTA
                      tiny={true}
                      btnMode={true}
                      cb={() => handleDeleteProjectFromPortfolio(portfolio)}
                      label="Delete"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ) : (
        <ul className="content--secondary list-inside list-disc my-8 marker:text-primary">
          {availableDesigns.length === 0 && <li>No designs available</li>}
          {availableProjects.length === 0 && <li>No projects available</li>}
        </ul>
      )}
    </div>
  );
};
