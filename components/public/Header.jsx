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
        <small className="content--sub font-semibold -mb-4 text-secondary">
          Admin Mode
        </small>
      )}
      <h1 className="heading--main">{title}</h1>
      <p className="content--main my-6">{desc}</p>
      {searchMode ? (
        <>
          <strong className="heading--sub capitalize">
            total {type} : {count}
          </strong>
          <input
            type="search"
            className={`w-full focus:shadow-xl will-change-transform transition-all p-3 border-2 border-current rounded-md content--secondary bg-transparent scrollbar-none outline-none focus:outline-none mt-4 mb-10 ${
              Boolean(searchText.trim())
                ? "focus:border-secondary border-current"
                : "focus:border-primary"
            } `}
            value={searchText}
            placeholder={`Search ${type} by title...`}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </>
      ) : (
        <p className="heading--sub mb-10">
          Sorry! No <span className="text-primary uppercase">{type}</span> are
          public now.
        </p>
      )}
    </header>
  );
};
