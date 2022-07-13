import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { MdOutlineFingerprint } from "react-icons/md";

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

  return (
    <div className="container max-w-4xl mx-auto">
      <div className="flex items-center justify-between pt-4 border-t mt-2.5">
        <h1 className="heading--secondary capitalize">Portfolio Management</h1>
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

      {showForm &&
        Boolean(availableDesigns.length * availableProjects.length) && (
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
        <section className="w-full my-10">
          <ul className="flex flex-col items-start gap-2 my-6">
            <li className="flex items-center justify-start gap-x-4 text-xs">
              <span className="w-10 h-1 bg-secondary block rounded-full"></span>
              <small className="font-bold">Showcased</small>
            </li>
            <li className="flex items-center justify-start gap-x-4 text-xs">
              <span className="w-10 h-1 bg-primary block rounded-full"></span>
              <small className="font-bold">Not Showcased</small>
            </li>
          </ul>
          <table className="w-full mx-auto table-auto">
            <thead className="">
              <tr className="capitalize">
                <th className="border p-2 text-sm text-left font-black">
                  <small>Project</small>
                </th>
                <th className="border p-2 text-sm text-left font-black">
                  <small>Design</small>
                </th>
                <th className="border p-2 text-sm text-left font-black">
                  <small>Action</small>
                </th>
              </tr>
            </thead>
            <tbody>
              {portfolioProjects.map((portfolio, i) => (
                <tr
                  key={portfolio._id}
                  className={
                    portfolio.isShowcased ? "text-secondary" : "text-primary"
                  }
                >
                  <td className="border p-2 text-xs font-bold">
                    #{i + 1}. {portfolio.project.title}
                  </td>
                  <td className="border p-2 text-xs font-bold">
                    {portfolio.design.title}
                  </td>
                  <td className="border p-2 text-xs flex items-center justify-between gap-4">
                    <button
                      onClick={() => getEditData(portfolio)}
                      className="w-full text-center font-bold uppercase grayscale hover:grayscale-0 transition-all hover:text-secondary border-2 border-current opacity-25 hover:opacity-100"
                    >
                      <small>edit</small>
                    </button>
                    <button
                      onClick={() =>
                        handleDeleteProjectFromPortfolio(portfolio)
                      }
                      className="w-full text-center font-bold uppercase grayscale hover:grayscale-0 transition-all hover:text-primary border-2 border-current opacity-25 hover:opacity-100"
                    >
                      <small>delete</small>
                    </button>
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
