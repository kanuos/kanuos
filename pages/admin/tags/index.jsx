// DISPLAY ADMIN PAGES
//  NOTES CMS
import axios from "axios";
import { useState, useContext, useCallback } from "react";
import { getAllTags } from "../../../database/tags";
import { ADMIN_ACCOUNT } from "../../../utils";
import { API_ROUTES } from "../../../utils/admin";
import { isAdminMiddleware } from "../../../utils/authLib";
import PublicLayout from "../../../components/Layouts/PublicLayout";
import { ThemeContext } from "../../../contexts/ThemeContext";
import CMSForm from "../../../components/admin/forms/CMS";
import { Tag } from "../../../components/public/Tag";

const TagsAdminPage = ({ allTags }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const [tags, setTags] = useState(allTags ? JSON.parse(allTags) : []);

  const handleAddTag = useCallback(async function (newTag) {
    try {
      newTag = newTag?.tag?.trim().toLowerCase();
      if (!Boolean(newTag)) throw "Tag cannot be empty";

      const existingTag = tags.filter((tag) => tag.tag === newTag);
      if (existingTag.length > 0) throw "Tag already exists";

      const { tag } = (
        await axios({
          method: "POST",
          url: API_ROUTES.tags,
          data: {
            tag: newTag,
          },
        })
      ).data;

      if (!tag) throw "Invalid";
      setTags((prev) => [...prev, tag]);
    } catch (error) {
      alert(error);
    }
  });

  const handleDelete = useCallback(async function (t) {
    try {
      let permission = confirm("Are you sure you want to delete tag?");
      if (!permission) throw "Delettion cancelled";
      const { tag } = (
        await axios({
          url: `${API_ROUTES.tags}?tag=${t._id}`,
          method: "DELETE",
        })
      ).data;

      setTags((prev) =>
        prev.filter((t) => t._id !== tag._id && t.tag !== tag.tag)
      );
    } catch (error) {
      alert(error);
    }
  });

  return (
    <PublicLayout metaTitle="ADMIN | Tags Management" navType="admin">
      <div className="w-full max-w-4xl p-8 mx-auto">
        <CMSForm
          key={tags.length}
          heading="Tag management"
          type="tag"
          init={{}}
          btnLabel="Add Tag"
          isDarkMode={isDarkMode}
          getFormData={handleAddTag}
        />
        <div className="block max-w-prose container mx-auto w-full">
          <p className="content--sub">Total tags : {tags.length}</p>
          <div className="flex flex-wrap gap-4 items-center justify-start w-full my-4">
            {tags
              .sort((a, b) => a._id - b._id)
              .map((t) => (
                <div key={t._id} className="w-max">
                  <Tag tag={t} cb={() => handleDelete(t)} />
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* <div className="w-full max-w-4xl px-8 pt-20 mx-auto">
        <h1 className="heading--main">Tag mgmt ({tags.length})</h1>
        <div className="my-6">
          <StringField
            name="tag"
            value={current}
            setValue={({ _, v }) => setCurrent(v)}
          />
        </div>
        <CTA
          btnMode={true}
          label="Add Tag"
          cb={handleAddTag}
          isDarkMode={isDarkMode}
        />

        <ul className="flex flex-wrap gap-4 items-center justify-start w-full">
          {tags
            .sort((a, b) => a._id - b._id)
            .map((t) => (
              <li
                key={t._id}
                className="text-sm py-1 px-2 border bg-light border-current font-semibold rounded-md uppercase inline-flex items-center justify-between gap-x-4 transition-all hover:bg-dark hover:text-light text-dark hover:shadow-lg group"
              >
                <small className="mr-4">{t.tag}</small>
                <button
                  onClick={() => handleDelete(t)}
                  className="text-primary group-hover:opacity-100 opacity-0 hover:scale-125"
                >
                  <IoCloseCircleSharp />
                </button>
              </li>
            ))}
        </ul>
      </div> */}
    </PublicLayout>
  );
};

export default TagsAdminPage;

export async function getServerSideProps({ req, res }) {
  let allTags;
  try {
    const { loggedAsAdmin } = await isAdminMiddleware(req, res);
    if (!loggedAsAdmin) {
      return {
        redirect: {
          destination: ADMIN_ACCOUNT,
          permanent: false,
        },
      };
    }
    allTags = await getAllTags();
    return {
      props: {
        allTags: JSON.stringify(allTags),
      },
    };
  } catch (error) {
    allTags = [];
    return {
      props: {
        allTags: JSON.stringify(allTags),
      },
    };
  }
}
