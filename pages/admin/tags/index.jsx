// DISPLAY ADMIN PAGES
//  NOTES CMS
import dynamic from "next/dynamic";
import axios from "axios";
import { useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import { StringField } from "../../../components/admin/InputField";
import { getAllTags } from "../../../database/tags";
import { ADMIN_ACCOUNT } from "../../../utils";
import { API_ROUTES } from "../../../utils/admin";
import { isAdminMiddleware } from "../../../utils/authLib";
import PublicLayout from "../../../components/Layouts/PublicLayout";

const JoinLine = dynamic(() =>
  import("../../../components/public/DescHeader").then((m) => m.JoinLine)
);

const TagsAdminPage = ({ allTags }) => {
  const [current, setCurrent] = useState("");
  const [tags, setTags] = useState(allTags ? JSON.parse(allTags) : []);

  async function handleAddTag() {
    try {
      const newTag = current.trim().toLowerCase();
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
      setCurrent("");
    } catch (error) {
      alert(error);
    }
  }

  async function handleDelete(t) {
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
  }

  return (
    <PublicLayout metaTitle="ADMIN | Tags Management">
      <div className="w-full max-w-4xl px-8 py-20 mx-auto">
        <h1 className="font-special text-3xl md:text-4xl capitalize">
          tag management ({tags.length})
        </h1>
        <section className="flex flex-col w-full items-stretch my-8">
          <StringField
            name="tag"
            value={current}
            setValue={({ _, v }) => setCurrent(v)}
          />
          <div className="ml-4">
            <JoinLine />
          </div>
          <button
            onClick={handleAddTag}
            className="capitalize text-xs w-max  mt-4 rounded flex items-center justify-center relative overflow-hidden cursor-pointer"
          >
            <span className="py-1.5 px-6 block z-10 peer hover:text-light transition-all hover:shadow-xl border-2 border-dark font-semibold">
              Add Tag
            </span>
            <span className="py-1.5 px-6 block bg-dark transition-all hover:shadow-xl border-2 border-dark absolute top-0 left-0 h-full w-full translate-y-full peer-hover:translate-y-0 z-0 duration-300"></span>
          </button>
        </section>

        <ul className="flex flex-wrap gap-4 items-center justify-start w-full pt-4 border-t">
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
      </div>
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
