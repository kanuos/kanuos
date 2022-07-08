import dynamic from "next/dynamic";
import { useState, Fragment, useCallback, useEffect } from "react";

import { CTA } from "../../portfolio/CTA";

import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";

const SelectInput = dynamic(() =>
  import("../inputs/SelectInput").then((m) => m.SelectInput)
);
const StringInput = dynamic(() =>
  import("../inputs/String").then((m) => m.StringInput)
);

const PortfolioForm = ({
  init = null,
  availableProjects,
  availableDesigns,
  isDarkMode,
  getData,
}) => {
  const [portfolio, setPortfolio] = useState({
    project: init?.project._id || "",
    design: init?.design._id || "",
    metadata: init?.metadata || "",
    priority: init?.priority || "",
    isShowcased: init?.isShowcased || false,
  });

  const [canSubmit, setCanSubmit] = useState(false);

  function handleUpdate(key, value) {
    setPortfolio((prev) => ({ ...prev, [key]: value }));
  }

  function generateSelectListOptions(list = []) {
    const obj = {};
    list.forEach((el) => {
      obj[el.title] = el._id;
    });
    return obj;
  }

  function handleSubmit(e) {
    e.preventDefault();
    getData({
      portfolio: init
        ? { ...portfolio, _id: init._id, user: init.user }
        : portfolio,
      method: init ? "patch" : "post",
    });
  }

  useEffect(() => {
    const temp = { ...portfolio };
    delete temp.isShowcased;
    setCanSubmit(() => Object.values(temp).every(Boolean));
  }, [portfolio]);

  return (
    <div className="container max-w-5xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 my-4"
      >
        {/* project field , design field, priority */}
        <SelectInput
          init={portfolio.project}
          setValue={(v) => handleUpdate("project", v)}
          name="project"
          list={generateSelectListOptions(availableProjects)}
        />
        <SelectInput
          init={portfolio.design}
          setValue={(v) => handleUpdate("design", v)}
          name="design"
          list={generateSelectListOptions(availableDesigns)}
        />
        <SelectInput
          init={portfolio.priority}
          setValue={(v) => handleUpdate("priority", parseInt(v))}
          name="priority"
          list={{
            low: 1,
            medium: 2,
            high: 3,
          }}
        />
        {/* metadata */}
        <section className="w-full grid col-span-full place-items-center">
          <StringInput
            name="metadata"
            value={portfolio.metadata}
            setValue={(v) => handleUpdate("metadata", v)}
            placeholder="Project metadata for portfolio"
          />
        </section>

        <section className="w-full flex flex-col gap-2">
          <span className="content--sub capitalize font-bold">Status</span>
          <label htmlFor="showcased" className="flex items-center gap-2">
            {portfolio.isShowcased ? (
              <>
                <ImCheckboxChecked className="text-secondary" />
                <small className="font-bold text-secondary content--sub">
                  Showcased
                </small>
              </>
            ) : (
              <>
                <ImCheckboxUnchecked className="text-primary" />
                <small className="font-bold text-primary content--sub">
                  Not showcased
                </small>
              </>
            )}
          </label>
          <input
            type="checkbox"
            id="showcased"
            value={portfolio.isShowcased}
            className="hidden"
            onChange={() => handleUpdate("isShowcased", !portfolio.isShowcased)}
          />
        </section>

        <section className="grid w-full grid-cols-1 md:grid-cols-2 gap-4"></section>
        {canSubmit && (
          <div className="w-max mr-auto my-10 col-span-full">
            <CTA
              btnMode={true}
              btnType="submit"
              label={(init ? "Edit " : "Add ") + "portfolio"}
              isDarkMode={isDarkMode}
              isActive={true}
              cb={() => null}
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default PortfolioForm;
