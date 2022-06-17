import { useState, Fragment, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";

import { CTA } from "../../portfolio/CTA";

// dynamic imports of components
const MarkdownInput = dynamic(() =>
  import("../inputs/Markdown").then((m) => m.MarkdownInput)
);
const ArrayInput = dynamic(() =>
  import("../inputs/ArrayInput").then((m) => m.ArrayInput)
);
const StringInput = dynamic(() =>
  import("../inputs/String").then((m) => m.StringInput)
);
const ImageInput = dynamic(() =>
  import("../inputs/ImageInput").then((m) => m.ImageInput)
);

const CMSForm = ({
  type = "profile",
  storageKey = null,
  init,
  heading = "",
  layout = [],
  isDarkMode,
  getFormData,
  btnLabel = "Save Changes",
}) => {
  const [currentState, setCurrentState] = useState(null);
  const [arrayStep, setArrayStep] = useState({});
  const [arrayType, setArrayType] = useState("");
  const [editIndex, setEditIndex] = useState(NaN);

  function handleFormSubmission(e) {
    e.preventDefault();
    getFormData(currentState);
  }

  const generateInitStateFromLayout = useCallback(
    function () {
      const INIT = {};
      layout?.forEach(({ name, type }) => {
        if (type === "object") {
          INIT[name] = {};
          return;
        }
        if (["array", "userFlow", "page", "chapter"].includes(type)) {
          INIT[name] = [];
          return;
        }
        INIT[name] = "";
      });
      return { ...INIT, ...init };
    },
    [layout, init]
  );

  useEffect(() => {
    if (type !== "content" || !storageKey || !currentState) return;
    if (!Object.values(currentState).some(Boolean)) return;
    sessionStorage.setItem(storageKey, JSON.stringify(currentState));
  }, [type, currentState, storageKey]);

  useEffect(() => {
    if (!arrayType) return;
    setArrayStep(() => ({}));
  }, [arrayType]);

  useEffect(() => {
    setCurrentState(() => generateInitStateFromLayout());
  }, [layout, generateInitStateFromLayout]);

  const getArrayItem = useCallback(
    (name, newEl, index) => {
      // 1. get the allowed keys from layout
      const allowedKeys = layout
        .find((el) => el.name === name)
        ?.layout.map((el) => el.name)
        .sort();

      const incomingKeys = Object.keys(newEl).sort();
      // check if the incoming element conforms to current layout

      if (JSON.stringify(allowedKeys) !== JSON.stringify(incomingKeys)) {
        setArrayStep(() => ({}));
        alert("Invalid keys or empty entry");
        return;
      }

      // check if incoming item is not empty
      const isValidEntry = Object.values(newEl).every(Boolean);
      if (!isValidEntry) {
        alert(`Fields of ${name} ie ${allowedKeys} cannot be empty`);
        return;
      }

      // validate the incoming data
      setCurrentState((prev) => ({
        ...prev,
        [name]: !isNaN(index)
          ? prev[name].map((el, k) => (index === k ? newEl : el))
          : [...(prev[name] || []), newEl],
      }));
      setArrayStep(() => ({}));
      setEditIndex(() => NaN);
    },
    [layout]
  );

  const getArrayEditData = useCallback((item, index) => {
    setEditIndex(() => index);
    setArrayStep(() => ({ ...item }));
  }, []);

  const deleteArrayData = useCallback((index, name) => {
    if (!confirm("Confirm delete?")) return;
    setCurrentState((prev) => ({
      ...prev,
      [name]: prev[name].filter((el, k) => k !== index && el),
    }));
  }, []);

  if (layout.length === 0 || !currentState) return <></>;

  return (
    <div className="container max-w-4xl mx-auto">
      <h1
        className={`${
          ["profile", "content"].includes(type)
            ? "heading--secondary border-t mt-2.5"
            : "heading--main"
        } capitalize mr-auto pt-4`}
      >
        {heading}
      </h1>
      <form
        key={JSON.stringify(layout)}
        onSubmit={handleFormSubmission}
        className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${
          ["profile", "content"].includes(type) ? "my-4" : "my-10"
        }`}
      >
        {currentState &&
          layout.map(({ name, type, placeholder, layout, split, options }) => (
            <Fragment key={name}>
              {type === "string" && (
                <StringInput
                  split={split}
                  name={name}
                  placeholder={placeholder}
                  value={currentState?.[name]}
                  setValue={(v) =>
                    setCurrentState((prev) => ({ ...prev, [name]: v }))
                  }
                />
              )}
              {type === "markdown" && (
                <MarkdownInput
                  split={split}
                  name={name}
                  placeholder={placeholder}
                  value={currentState?.[name]}
                  setValue={(v) =>
                    setCurrentState((prev) => ({ ...prev, [name]: v }))
                  }
                />
              )}
              {type === "image" && (
                <ImageInput
                  name={name}
                  placeholder={placeholder}
                  value={currentState?.[name]}
                  setValue={(v) =>
                    setCurrentState((prev) => ({ ...prev, [name]: v }))
                  }
                  isDarkMode={isDarkMode}
                />
              )}

              {type === "array" && (
                <ArrayInput
                  editIndex={editIndex}
                  parentState={currentState?.[name]}
                  isDarkMode={isDarkMode}
                  getArrayItem={getArrayItem}
                  arrayType={arrayType}
                  getEditData={getArrayEditData}
                  currentState={arrayStep}
                  deleteArrayItem={deleteArrayData}
                  name={name}
                >
                  {layout.map((el, k) => {
                    return (
                      <Fragment key={k}>
                        {el.type === "string" && (
                          <StringInput
                            name={el.name}
                            placeholder={el.placeholder}
                            value={arrayStep[el.name]}
                            setValue={(v) => {
                              setArrayType(() => name);
                              setArrayStep((prev) => ({
                                ...prev,
                                [el.name]: v,
                              }));
                            }}
                            split={el.split}
                          />
                        )}
                        {el.type === "markdown" && (
                          <MarkdownInput
                            name={el.name}
                            placeholder={el.placeholder}
                            value={arrayStep[el.name]}
                            setValue={(v) => {
                              setArrayType(() => name);
                              setArrayStep((prev) => ({
                                ...prev,
                                [el.name]: v,
                              }));
                            }}
                            split={el.split}
                          />
                        )}
                      </Fragment>
                    );
                  })}
                </ArrayInput>
              )}
            </Fragment>
          ))}
        <div className="w-max mr-auto my-10 col-span-full">
          <CTA
            btnMode={true}
            btnType="submit"
            label={btnLabel}
            isDarkMode={isDarkMode}
            isActive={true}
            cb={() => null}
          />
        </div>
      </form>
    </div>
  );
};

export default CMSForm;
