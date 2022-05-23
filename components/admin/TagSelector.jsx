import { useRouter } from "next/router";
import { ADMIN_URLS } from "../../utils";
import { CTA } from "../portfolio/CTA";
import { Tag } from "../public/Tag";

export const TagSelector = ({
  handleTag,
  selectedTags,
  next,
  allTags,
  prev,
}) => {
  const router = useRouter();
  if (allTags.length === 0) {
    router.replace(ADMIN_URLS.tags.url);
    return <></>;
  }
  return (
    <div className="section h-full w-full flex items-start justify-center">
      <section className="flex flex-col items-start gap-y-2  w-full max-w-2xl">
        <h1 className="heading--main">Select Tags</h1>
        <p className="content--main">
          Total selected tags : {selectedTags.length}
        </p>
        <div className="flex flex-wrap gap-4 items-center justify-start mt-4 mb-10">
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

        <ul className="flex items-center justify-start gap-x-8">
          <li>{prev && <CTA label="← Prev" cb={prev} btnMode={true} />}</li>
          <li>
            {selectedTags.length > 0 && (
              <CTA label="Next →" cb={next} btnMode={true} />
            )}
          </li>
        </ul>
      </section>
    </div>
  );
};
