import { useState, Fragment, useCallback } from "react";
import { CTA } from "../../portfolio/CTA";
import { MarkdownInput } from "../inputs/Markdown";
import { ArrayInput } from "../inputs/ArrayInput";
import { StringInput } from "../inputs/String";

const FORM_FIELDS = {
  profile: [
    {
      name: "fullName",
      type: "string",
      placeholder: "Full name",
      split: true,
    },
    {
      name: "email",
      type: "string",
      placeholder: "Public Email ID",
      split: true,
    },
    {
      name: "about",
      type: "string",
      placeholder: "Profile description",
      split: false,
    },
    {
      name: "adminLabel",
      type: "string",
      placeholder: "Admin label",
      split: false,
    },
    {
      name: "skills",
      type: "markdown",
      placeholder: "Skillset in words",
      split: false,
    },
  ],
  account: [
    {
      name: "email",
      type: "string",
      placeholder: "ADMIN email ID",
      split: false,
    },
    {
      name: "password",
      type: "string",
      placeholder: "ADMIN password",
      split: false,
    },
  ],
  reset: [
    {
      name: "email",
      type: "string",
      placeholder: "ADMIN email ID",
      split: false,
    },
    {
      name: "password",
      type: "string",
      placeholder: "ADMIN password",
      split: false,
    },
    {
      name: "secret",
      type: "string",
      placeholder: "ADMIN secret code",
      split: false,
    },
  ],
  tag: [
    {
      name: "tag",
      type: "string",
      placeholder: "Eg. React",
      split: false,
    },
  ],
};

const CMSForm = ({
  type = "profile",
  init,
  heading = "",
  layout = [],
  isDarkMode,
  getFormData,
  btnLabel = "Save Changes",
}) => {
  const INIT = {};
  FORM_FIELDS[type]?.forEach(
    ({ name, isArray }) => (INIT[name] = isArray ? [] : "")
  );
  const [currentState, setCurrentState] = useState({ ...INIT, ...init });
  const [arrayStep, setArrayStep] = useState({});
  const [editIndex, setEditIndex] = useState(NaN);

  function handleFormSubmission(e) {
    e.preventDefault();
    console.log({ currentState });
    getFormData(currentState);
  }

  const getArrayItem = useCallback((name, newEl, index) => {
    setCurrentState((prev) => ({
      ...prev,
      [name]: !isNaN(index)
        ? prev[name].map((el, k) => (index === k ? newEl : el))
        : [...(prev[name] || []), newEl],
    }));
    setArrayStep(() => ({}));
    setEditIndex(() => NaN);
  }, []);

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
      <h1 className="heading--main capitalize mr-auto pt-4">{heading}</h1>
      <form
        onSubmit={handleFormSubmission}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10"
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
            {type === "array" && (
              <ArrayInput
                key={name}
                editIndex={editIndex}
                parentState={currentState[name]}
                isDarkMode={isDarkMode}
                getArrayItem={getArrayItem}
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
                          setValue={(v) =>
                            setArrayStep((prev) => ({ ...prev, [el.name]: v }))
                          }
                        />
                      )}
                      {el.type === "markdown" && (
                        <MarkdownInput
                          name={el.name}
                          placeholder={el.placeholder}
                          value={arrayStep[el.name]}
                          setValue={(v) =>
                            setArrayStep((prev) => ({ ...prev, [el.name]: v }))
                          }
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
