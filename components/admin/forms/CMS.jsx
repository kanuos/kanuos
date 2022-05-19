import { useState } from "react";
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
      placeholder: "Full name",
      split: true,
    },
    {
      name: "about",
      type: "string",
      placeholder: "Full name",
      split: false,
    },
    {
      name: "adminLabel",
      type: "string",
      placeholder: "Full name",
      split: false,
    },
    {
      name: "skills",
      type: "markdown",
      placeholder: "Full name",
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
};

const CMSForm = ({
  type = "profile",
  init,
  heading = "",
  isDarkMode,
  getFormData,
}) => {
  const INIT = {};
  FORM_FIELDS[type].forEach(
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
            <section
              key={name}
              className={`${
                split ? "" : "col-span-full"
              } w-full flex flex-col items-start gap-2`}
            >
              <label
                htmlFor={name}
                className="content--sub capitalize font-semibold"
              >
                {name}
              </label>

              {type === "string" && (
                <StringInput
                  placeholder={placeholder}
                  value={currentState[name]}
                  setValue={(p) =>
                    setCurrentState((prev) => ({ ...prev, [name]: p }))
                  }
                  split={true}
                />
              )}

              {type === "markdown" && (
                <MarkdownInput
                  placeholder={placeholder}
                  value={currentState[name]}
                  setValue={(p) =>
                    setCurrentState((prev) => ({ ...prev, [name]: p }))
                  }
                  split={false}
                />
              )}

              {type === "array" && (
                <div className="pl-4 my-4 w-full border-l-4 border-secondary border-double">
                  <ArrayInput
                    value={currentState[name]}
                    layout={layout}
                    isDarkMode={isDarkMode}
                    getArrayItem={(data) => addItemToList(data, name)}
                    deleteArrayItem={(data) => deleteItemFromList(data, name)}
                    split={false}
                  />
                </div>
              )}
            </section>
          );
        })}

        <div className="w-max mx-auto">
          <CTA
            btnMode={true}
            btnType="submit"
            label="Save changes"
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
