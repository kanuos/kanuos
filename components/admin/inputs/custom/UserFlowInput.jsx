import { useState, useEffect, useCallback } from "react";

import { ImCross, ImCheckmark } from "react-icons/im";
import { CTA } from "../../../portfolio/CTA";
import { ArrayInput } from "../ArrayInput";

import { ImageInput } from "../ImageInput";
import { MarkdownInput } from "../Markdown";
import { StringInput } from "../String";

const UserFlowInput = ({ isDarkMode, parentState, setParentArray }) => {
  // user flow input is an array of objects
  // object shape => { title, about, images }
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [images, setImages] = useState([]);
  const [canSubmit, setCanSubmit] = useState(false);
  const [editStepIndex, setEditStepIndex] = useState(NaN);

  useEffect(() => {
    setCanSubmit(() =>
      Boolean(title.trim().length * about.trim().length * images.length)
    );
  }, [title, about, images]);

  const addImageToArray = useCallback(function (url) {
    setImages((prev) => [...new Set([...prev, url])]);
  }, []);

  const deleteImage = useCallback((index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }, []);

  function handleAddUserFlowStep() {
    if (isNaN(editStepIndex)) {
      setParentArray([
        ...parentState,
        {
          title,
          about,
          images,
        },
      ]);
    } else {
      // edit Mode ON
      setParentArray(
        parentState.map((el, k) => {
          if (k === editStepIndex) {
            return {
              title,
              about,
              images,
            };
          }
          return el;
        })
      );
    }
    resetSteps();
  }

  function getEditItem(_, i) {
    setEditStepIndex(() => i);
    const item = parentState[i];
    if (!item) return;

    setTitle(item.title);
    setAbout(item.about);
    setImages(item.images);
  }

  function deleteStep(index) {
    if (!confirm("Confirm delete userFlowStep?")) return;
    setParentArray(parentState.filter((_, i) => i !== index));
  }

  function resetSteps() {
    setAbout("");
    setTitle("");
    setImages([]);
    setEditStepIndex(NaN);
  }

  return (
    <ArrayInput
      name="user flow state"
      currentState={[]}
      parentState={parentState}
      arrayType="userFlow"
      editIndex={editStepIndex}
      getArrayItem={() => null}
      deleteArrayItem={deleteStep}
      getEditData={getEditItem}
    >
      <div className="mt-6 flex flex-col items-start justify-start gap-4">
        <StringInput
          name="title"
          value={title}
          setValue={(v) => setTitle(v)}
          placeholder="Design Page title"
          split={true}
        />

        <MarkdownInput
          name="about"
          value={about}
          setValue={(v) => setAbout(v)}
          placeholder="Design Page description"
        />

        <ArrayInput
          parentState={images}
          currentState={""}
          isDarkMode={isDarkMode}
          name="images"
          arrayType="userflow.images"
          getArrayItem={() => null}
          deleteArrayItem={deleteImage}
          getEditData={() => null}
          editIndex={NaN}
        >
          <div className="my-2 w-full">
            <ImageInput
              key={parentState?.length}
              setValue={addImageToArray}
              placeholder={`Page image #${images.length}`}
              isDarkMode={isDarkMode}
            />
          </div>
        </ArrayInput>
      </div>
      {canSubmit && (
        <div className="w-max">
          <CTA
            isDarkMode={isDarkMode}
            cb={handleAddUserFlowStep}
            btnMode={true}
            btnType="button"
            label="Add flow to state"
          />
        </div>
      )}
    </ArrayInput>
  );
};

export default UserFlowInput;
