import { MdOutlineAdminPanelSettings } from "react-icons/md";
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
        <p className="flex items-center justify-start gap-1 text-primary">
          <MdOutlineAdminPanelSettings />
          <small className="heading--sub font-bold">Admin Mode</small>
        </p>
      )}
      <h1 className="heading--primary">{title}</h1>
      <p className="content--secondary mb-8">{desc}</p>
      {searchMode && (
        <StringInput
          value={searchText}
          split={true}
          name={`Total ${type} : ${count}`}
          placeholder={`Search ${type} by title`}
          setValue={handleSearch}
        />
      )}
    </header>
  );
};
