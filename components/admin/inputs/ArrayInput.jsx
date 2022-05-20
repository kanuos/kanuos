import { useState } from "react";
import { CTA } from "../../portfolio/CTA";
import { MarkdownInput } from "./Markdown";
import { StringInput } from "./String";

export const ArrayInput = ({
  layout,
  value,
  isDarkMode,
  getArrayItem,
  deleteArrayItem,
  name = "",
  split = false,
}) => {
  const INIT = {};
  layout.map((el) => (INIT[el.name] = ""));
  const [currentState, setCurrentState] = useState(INIT);
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  function handleAddToArray() {
    // validate the current state
    const allEmpty = Object.values(currentState).every(
      (el) => !Boolean(el.trim())
    );
    if (allEmpty) {
      alert("Empty state");
      return;
    }
    getArrayItem({ data: currentState, editMode, index: editIndex });
    setCurrentState(INIT);
    setEditIndex(null);
    setEditMode(false);
  }

  function getEditData(entry, i) {
    setCurrentState({ ...entry });
    setEditMode(true);
    setEditIndex(i);
  }

  function handleDeleteItem(i) {
    if (!confirm("Delete entry?")) return;
    deleteArrayItem({ data: value[i], index: i });
  }

  return (
    <section
      className={`col-span-full w-full flex flex-col items-start gap-2 p-4 border-2 rounded-md border-opacity-25`}
    >
      <label htmlFor={name} className="content--sub capitalize font-semibold">
        {name}
      </label>

      {value.length > 0 && (
        <details className="p-4 my-4 last-of-type:mb-0 bg-secondary bg-opacity-20 shadow-inner rounded-md w-full">
          <ul className="flex flex-col">
            {value.map((items, i) => (
              <li
                key={i}
                className={`list-item w-full ${
                  i === editIndex
                    ? "opacity-50 cursor-not-allowed line-through"
                    : "opacity-100"
                }`}
              >
                <p className="content--sub my-6">{JSON.stringify(items)}</p>
                <ul className="flex items-center mb-4 w-full gap-4">
                  <CTA
                    cb={() => getEditData(items, i)}
                    btnMode={true}
                    label="Edit"
                    isDarkMode={isDarkMode}
                  />
                  <CTA
                    cb={() => handleDeleteItem(i)}
                    btnMode={true}
                    label="Delete"
                    isDarkMode={isDarkMode}
                  />
                </ul>
              </li>
            ))}
          </ul>
          <summary className="content--sub">
            {name} array : [{value.length}]
          </summary>
        </details>
      )}

      <div className="flex flex-col items-stretch gap-6 my-2 w-full">
        {layout.map((field, i) => {
          const { type, name, placeholder } = field;
          return (
            <section
              key={i}
              className={`col-span-full w-full flex flex-col items-start gap-2`}
            >
              {type === "string" && (
                <StringInput
                  name={name}
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
                  name={name}
                  placeholder={placeholder}
                  value={currentState[name]}
                  setValue={(p) =>
                    setCurrentState((prev) => ({ ...prev, [name]: p }))
                  }
                  split={false}
                />
              )}
            </section>
          );
        })}
      </div>
      {Object.values(currentState).every(Boolean) && (
        <div className="w-max">
          <CTA
            isDarkMode={isDarkMode}
            label="Add Chapter"
            btnMode={true}
            cb={handleAddToArray}
          />
        </div>
      )}
    </section>
  );
};
