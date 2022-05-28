import { useState, Fragment, useCallback, useEffect } from "react";
import { CTA } from "../../portfolio/CTA";
import { MarkdownInput } from "../inputs/Markdown";
import { ArrayInput } from "../inputs/ArrayInput";
import { StringInput } from "../inputs/String";
import { ImageInput } from "../inputs/ImageInput";
import { ObjectInput } from "../inputs/ObjectInput";

// dynamic
import UserFlowInput from "../inputs/custom/UserFlowInput";
import PageInput from "../inputs/custom/PageInput";
import ChapterInput from "../inputs/custom/ChapterInput";

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
  const INIT = {};
  layout?.forEach(({ name, type }) => {
    if (type === "object") {
      INIT[name] = {};
      return;
    }
    if (["array", "userFlow"].includes(type)) {
      INIT[name] = [];
      return;
    }
    INIT[name] = "";
  });
  const [currentState, setCurrentState] = useState({
    ...INIT,
    ...init,
  });
  const [arrayStep, setArrayStep] = useState({});
  const [arrayType, setArrayType] = useState("");
  const [editIndex, setEditIndex] = useState(NaN);

  function handleFormSubmission(e) {
    e.preventDefault();
    getFormData(currentState);
  }

  useEffect(() => {
    if (type !== "content" || !storageKey) return;
    if (!Object.values(currentState).some(Boolean)) return;
    sessionStorage.setItem(storageKey, JSON.stringify(currentState));
  }, [type, currentState, storageKey]);

  useEffect(() => {
    if (!arrayType) return;
    setArrayStep(() => ({}));
  }, [arrayType]);

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

  return (
    <div className="container max-w-prose mx-auto">
      <h1
        className={`${
          ["profile", "content"].includes(type)
            ? "heading--secondary border-t mt-2.5 text-primary"
            : "heading--main"
        } capitalize mr-auto pt-4`}
      >
        {heading}
      </h1>
      <form
        onSubmit={handleFormSubmission}
        className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${
          ["profile", "content"].includes(type) ? "my-4" : "my-10"
        }`}
      >
        {layout.map(({ name, type, placeholder, layout, split }) => (
          <Fragment key={name}>
            {type === "string" && (
              <StringInput
                split={split}
                name={name}
                placeholder={placeholder}
                value={currentState[name]}
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
                value={currentState[name]}
                setValue={(v) =>
                  setCurrentState((prev) => ({ ...prev, [name]: v }))
                }
              />
            )}
            {type === "image" && (
              <ImageInput
                name={name}
                placeholder={placeholder}
                value={currentState[name]}
                setValue={(v) =>
                  setCurrentState((prev) => ({ ...prev, [name]: v }))
                }
                isDarkMode={isDarkMode}
              />
            )}
            {type === "array" && (
              <ArrayInput
                editIndex={editIndex}
                parentState={currentState[name]}
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
                            setArrayStep((prev) => ({ ...prev, [el.name]: v }));
                          }}
                          split={el.split}
                        />
                      )}
                      {el.type === "image" && (
                        <ImageInput
                          key={JSON.stringify(arrayStep)}
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
                          isDarkMode={isDarkMode}
                        />
                      )}
                      {el.type === "markdown" && (
                        <MarkdownInput
                          name={el.name}
                          placeholder={el.placeholder}
                          value={arrayStep[el.name]}
                          setValue={(v) => {
                            setArrayType(() => name);
                            setArrayStep((prev) => ({ ...prev, [el.name]: v }));
                          }}
                          split={el.split}
                        />
                      )}
                      {type === "object" && (
                        <ObjectInput
                          key={name}
                          parentState={currentState[name]}
                          isDarkMode={isDarkMode}
                          getObjectData={(d) => console.log(d)}
                          name={name}
                        >
                          {layout.map((el, k) => {
                            return (
                              <Fragment key={k}>
                                {el.type === "string" && (
                                  <StringInput
                                    name={el.name}
                                    placeholder={el.placeholder}
                                    value={currentState[name][el.name]}
                                    setValue={(v) =>
                                      setCurrentState((prev) => ({
                                        ...prev,
                                        [name]: {
                                          [el.name]: v,
                                        },
                                      }))
                                    }
                                    split={el.split}
                                  />
                                )}
                                {el.type === "markdown" && (
                                  <MarkdownInput
                                    name={el.name}
                                    placeholder={el.placeholder}
                                    value={currentState[name][el.name]}
                                    setValue={(v) =>
                                      console.log(
                                        name,
                                        currentState,
                                        currentState[name],
                                        currentState[name][el.name],
                                        v
                                      )
                                    }
                                    split={el.split}
                                  />
                                )}
                              </Fragment>
                            );
                          })}
                        </ObjectInput>
                      )}
                    </Fragment>
                  );
                })}
              </ArrayInput>
            )}
            {type === "userFlow" && (
              <UserFlowInput
                key={currentState[name]?.length}
                isDarkMode={isDarkMode}
                parentState={currentState[name]}
                setParentArray={(v) =>
                  setCurrentState((prev) => ({
                    ...prev,
                    [name]: v,
                  }))
                }
              />
            )}
            {type === "page" && (
              <PageInput
                isDarkMode={isDarkMode}
                parentArray={currentState[name]}
                setParentArray={(v) =>
                  setCurrentState((prev) => ({
                    ...prev,
                    [name]: v,
                  }))
                }
              />
            )}
            {type === "chapter" && (
              <ChapterInput
                isDarkMode={isDarkMode}
                parentArray={currentState[name]}
                setParentArray={(v) =>
                  setCurrentState((prev) => ({
                    ...prev,
                    [name]: v,
                  }))
                }
              />
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
