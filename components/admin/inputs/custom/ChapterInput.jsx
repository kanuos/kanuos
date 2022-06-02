import { useState, useEffect } from "react";
import { ArrayInput } from "../ArrayInput";
import { StringInput } from "../String";
import PageInput from "./PageInput";
import { CTA } from "../../../portfolio/CTA";

const ChapterInput = ({ isDarkMode, initState = [], getChapter }) => {
  const [heading, setHeading] = useState("");
  const [steps, setSteps] = useState([]);
  const [editIndex, setEditIndex] = useState(NaN);

  function handleAddPage() {
    const chapterData = isNaN(editIndex)
      ? [...initState, { heading, steps }]
      : initState.map((el, k) => {
          if (k === editIndex) {
            return { heading, steps };
          }
          return el;
        });

    getChapter(chapterData);
    setHeading("");
    setSteps([]);
    setEditIndex(NaN);
  }

  function handleDeleteStep(index) {
    if (!confirm("Confirm delete ")) return;
    const chapterData = initState.filter((_, k) => index !== k);
    getChapter(chapterData);
  }

  function getEditData(data, index) {
    setEditIndex(index);
    setHeading(data.heading);
    setSteps(data.steps);
  }

  return (
    <ArrayInput
      parentState={initState}
      currentState={[]}
      editIndex={editIndex}
      name="Project Chapter"
      isDarkMode={isDarkMode}
      getEditData={getEditData}
      deleteArrayItem={handleDeleteStep}
    >
      <div className="my-4 w-full flex flex-col items-stretch gap-4">
        <StringInput
          name="heading"
          value={heading}
          setValue={(v) => setHeading(v)}
          split={true}
          placeholder="Chapter Heading goes here"
        />
        <PageInput
          isDarkMode={isDarkMode}
          initState={steps}
          getPage={(p) => setSteps(p)}
        />
      </div>
      {Boolean(heading.trim().length * steps.length) && (
        <div className="w-max">
          <CTA
            isDarkMode={isDarkMode}
            cb={handleAddPage}
            btnMode={true}
            btnType="button"
            label="Add steps to Chapter"
          />
        </div>
      )}
    </ArrayInput>
  );
};

export default ChapterInput;
