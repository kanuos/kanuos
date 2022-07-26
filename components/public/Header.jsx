export const PublicHeader = ({
  data,
  adminMode = false,
  searchMode = false,
  searchText,
  handleSearch,
}) => {
  const { title, desc, count, type } = data;

  return (
    <header className="flex flex-col items-start mb-10 gap-y-2">
      {adminMode && (
        <small className="content--sub font-bold -mb-4 text-secondary">
          Admin Mode
        </small>
      )}
      <h1 className="heading--primary">{title}</h1>
      <p className="content--secondary my-6">{desc}</p>
      {searchMode ? (
        <>
          <strong className="heading--sub capitalize">
            total {type} : {count}
          </strong>
          <input
            type="search"
            className={`w-full will-change-transform transition-all px-3 py-2.5 border-2 rounded-full bg-transparent opacity-70 focus:opacity-100 scrollbar-none outline-none focus:outline-none mt-4 mb-10 border-current content--secondary font-bold placeholder:font-normal ${
              Boolean(searchText.trim())
                ? "border-solid focus:border-secondary"
                : "border-dashed focus:border-solid"
            } `}
            value={searchText}
            placeholder={`Search ${type} by title...`}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </>
      ) : (
        <p className="heading--sub mb-10">
          Sorry! No{" "}
          <span className="text-primary font-bold uppercase">{type}</span> are
          public now.
        </p>
      )}
    </header>
  );
};
