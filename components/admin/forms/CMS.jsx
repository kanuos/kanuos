import { useState, Fragment } from "react";
import { CTA } from "../../portfolio/CTA";
import { ArrayInput } from "../inputs/ArrayInput";
import { MarkdownInput } from "../inputs/Markdown";
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

    {
      name: "techStack",
      type: "array",
      layout: [
        {
          name: "heading",
          type: "string",
          placeholder: "Tech stack heading",
          split: false,
          isArray: false,
        },
        {
          name: "text",
          type: "markdown",
          placeholder: "Description about stack",
          split: false,
          isArray: false,
        },
      ],
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
  isDarkMode,
  getFormData,
  btnLabel = "Save Changes",
}) => {
  const INIT = {};
  FORM_FIELDS[type]?.forEach(
    ({ name, isArray }) => (INIT[name] = isArray ? [] : "")
  );
  const [currentState, setCurrentState] = useState({ ...INIT, ...init });

  function addItemToList({ data, editMode, index }, name) {
    if (!editMode) {
      setCurrentState((prev) => ({
        ...prev,
        [name]: [...prev[name], data],
      }));
    } else {
      setCurrentState((prev) => ({
        ...prev,
        [name]: prev[name].map((el, i) => {
          if (i === index) {
            return data;
          }
          return el;
        }),
      }));
    }
  }

  function deleteItemFromList({ data, index }, name) {
    setCurrentState((prev) => ({
      ...prev,
      [name]: prev[name].filter((el, i) => i !== index && !Object.is(data, el)),
    }));
  }

  function handleFormSubmission(e) {
    e.preventDefault();
    getFormData(currentState);
  }

  return (
    <div className="container max-w-prose mx-auto">
      <h1 className="heading--main capitalize mr-auto pt-4">{heading}</h1>
      <form
        onSubmit={handleFormSubmission}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10"
      >
        {FORM_FIELDS[type]?.map((field) => {
          const { name, type, split, placeholder, layout } = field;
          return (
            <Fragment key={name}>
              {type === "string" && (
                <StringInput
                  name={name}
                  placeholder={placeholder}
                  value={currentState[name]}
                  setValue={(p) =>
                    setCurrentState((prev) => ({ ...prev, [name]: p }))
                  }
                  split={split}
                />
              )}

              {type === "markdown" && (
                <MarkdownInput
                  name={name}
                  placeholder={placeholder}
                  value={currentState[name]}
                  setValue={(p) =>
                    setCurrentState((prev) => ({ ...prev, [name]: p }))
                  }
                  split={split}
                />
              )}

              {type === "array" && (
                <ArrayInput
                  name={name}
                  value={currentState[name]}
                  layout={layout}
                  isDarkMode={isDarkMode}
                  getArrayItem={(data) => addItemToList(data, name)}
                  deleteArrayItem={(data) => deleteItemFromList(data, name)}
                  split={true}
                />
              )}
            </Fragment>
          );
        })}

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
