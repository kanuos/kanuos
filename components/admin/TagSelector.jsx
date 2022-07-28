import { Tag } from "../public/Tag";

export const TagSelector = ({ handleTag, selectedTags, allTags }) => {
  return (
    <div className="flex flex-wrap gap-4 items-center justify-start pt-8 pb-4 w-full">
      {allTags.map((t) => {
        let isPresent = Boolean(
          selectedTags.find((selected) => selected._id === t._id)
        );
        return (
          <div className="w-max" key={t._id}>
            <Tag tag={t} cb={() => handleTag(t)} isActive={isPresent} />
          </div>
        );
      })}
    </div>
  );
};
