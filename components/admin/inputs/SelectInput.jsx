export const SelectInput = ({
  init = "",
  setValue,
  name = "",
  list = {},
  sampleSpace = [],
  editMode = false,
}) => {
  const allList = {};
  sampleSpace.forEach((el) => {
    allList[el.title] = el._id;
  });

  const entries =
    init && sampleSpace.length > 0
      ? Object.entries(allList)
      : Object.entries(list);

  return entries.length === 0 ? (
    <></>
  ) : (
    <section className="w-full flex flex-col items-stretch my-2 gap-2">
      <label htmlFor={name} className="capitalize font-bold content--sub">
        {name}
      </label>
      <select
        disabled={editMode}
        id={name}
        onChange={(e) => setValue(e.target.value)}
        className="w-full p-2 border-2 rounded-md block capitalize"
        value={init}
      >
        <option defaultValue="" className="p-1 block w-full capitalize">
          Select {name}
        </option>
        {entries.map(([k, v]) => (
          <option value={v} key={k} className="p-1 block w-full capitalize">
            {k}
          </option>
        ))}
      </select>
    </section>
  );
};
