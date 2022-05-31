import { CTA } from "../../portfolio/CTA";

export const ObjectInput = ({
  isDarkMode,
  getObjectData = null,
  name = "",
  parentState,
  children,
}) => {
  return (
    <section
      className={`col-span-full w-full flex flex-col items-start gap-2 p-4 border-2 border-opacity-25 rounded-md`}
    >
      <label htmlFor={name} className="content--sub capitalize font-semibold">
        {name}
      </label>
      <div className="flex flex-col items-stretch gap-6 my-2 w-full">
        {children}
      </div>

      {!!getObjectData && Object.values(parentState).every(Boolean) && (
        <div className="w-max" key={Object.values(parentState)}>
          <CTA
            isDarkMode={isDarkMode}
            label={`Save ${name}`}
            btnMode={true}
            cb={() => getObjectData(name, parentState)}
          />
        </div>
      )}
    </section>
  );
};
