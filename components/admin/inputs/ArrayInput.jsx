import { CTA } from "../../portfolio/CTA";
import { ImCheckmark, ImCross } from "react-icons/im";

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
  arrayType,
}) => {
  return (
    <details
      className={`col-span-full w-full flex flex-col items-start gap-2 p-4 border-2 border-opacity-25 rounded-md ${
        parentState?.length > 0 ? "border-secondary" : "border-primary"
      }`}
    >
      <summary className={`w-full flex items-center justify-between`}>
        <label htmlFor={name} className="content--sub capitalize font-bold">
          {name}
        </label>
        {parentState?.length > 0 ? (
          <ImCheckmark className="text-secondary cursor-pointer opacity-50 hover:opacity-100 transition-all" />
        ) : (
          <ImCross className="text-primary cursor-pointer opacity-50 hover:opacity-100 transition-all" />
        )}
      </summary>

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
                <p className="content--sub my-6 break-words">
                  {JSON.stringify(items, null, 8)}
                </p>
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
          <summary className="content--sub font-bold">
            {name} array : [{parentState.length}]
          </summary>
        </details>
      )}

      <div className="flex flex-col items-stretch gap-6 my-2 w-full">
        {children}
      </div>
      {Object.values(currentState).map(Boolean).every(Boolean) &&
        arrayType === name && (
          <div key={JSON.stringify({ currentState, name })} className="w-max">
            <CTA
              isDarkMode={isDarkMode}
              label={`Add to list`}
              btnMode={true}
              cb={() => getArrayItem(name, currentState, editIndex)}
            />
          </div>
        )}
    </details>
  );
};
