import { CTA } from "../../portfolio/CTA";

export const ArrayInput = ({
  children,
  parentState,
  currentState,
  isDarkMode,
  getArrayItem,
  deleteArrayItem,
  editIndex = null,
  getEditData,
  name = "",
}) => {
  return (
    <section
      className={`col-span-full w-full flex flex-col items-start gap-2 p-4 border-2 border-opacity-25 rounded-md`}
    >
      <label htmlFor={name} className="content--sub capitalize font-semibold">
        {name}
      </label>
      {parentState?.length > 0 && (
        <details className="p-4 my-4 last-of-type:mb-0 bg-secondary bg-opacity-20 shadow-inner rounded-md w-full">
          <ul className="flex flex-col">
            {parentState.map((items, i) => (
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
                    cb={() => deleteArrayItem(i, name)}
                    btnMode={true}
                    label="Delete"
                    isDarkMode={isDarkMode}
                  />
                </ul>
              </li>
            ))}
          </ul>
          <summary className="content--sub font-semibold">
            {name} array : [{parentState.length}]
          </summary>
        </details>
      )}

      <div className="flex flex-col items-stretch gap-6 my-2 w-full">
        {children}
      </div>
      {Object.values(currentState).every(Boolean) && (
        <div className="w-max">
          <CTA
            isDarkMode={isDarkMode}
            label={`Add to list`}
            btnMode={true}
            cb={() => getArrayItem(name, currentState, editIndex)}
          />
        </div>
      )}
    </section>
  );
};
