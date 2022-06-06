import { StringInput } from "../admin/inputs/String";

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
          <StringInput
            value={searchText}
            setValue={handleSearch}
            placeholder={`Search ${type} by title.`}
            split={true}
          />
        </>
      ) : (
        <p className="heading--sub">
          Sorry! No <span className="text-primary uppercase">{type}</span> are
          public now.
        </p>
      )}
    </header>
  );
};
