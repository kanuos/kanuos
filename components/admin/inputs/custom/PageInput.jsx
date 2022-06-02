import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

import { STEP_TYPE } from "../../../../utils";
import { SelectInput } from "../SelectInput";

const CTA = dynamic(() => import("../../../portfolio/CTA").then((m) => m.CTA));
const ArrayInput = dynamic(() =>
  import("../ArrayInput").then((m) => m.ArrayInput)
);
const ImageInput = dynamic(() =>
  import("../ImageInput").then((m) => m.ImageInput)
);
const MarkdownInput = dynamic(() =>
  import("../Markdown").then((m) => m.MarkdownInput)
);
const ObjectInput = dynamic(() =>
  import("../ObjectInput").then((m) => m.ObjectInput)
);

const PageInput = ({ isDarkMode, initState = [], getPage }) => {
  // state for inputs
  const [state, setState] = useState("");

  const [editIndex, setEditIndex] = useState(NaN);
  const [keyType, setKeyType] = useState("");
  const [canSubmit, setCanSubmit] = useState(false);

  function handleAddPage() {
    if (!isNaN(editIndex)) {
      // edit mode
      getPage(
        initState.map((el, k) => {
          if (k === editIndex) {
            return {
              key: keyType,
              value: state,
            };
          }
          return el;
        })
      );
    } else {
      // Add new item to array state
      getPage([...initState, { key: keyType, value: state }]);
    }

    setKeyType("");
    setEditIndex(NaN);
    setState("");
  }

  function handleDeleteStep(index) {
    if (!confirm("Confirm delete?")) return;
    getPage(initState.filter((_, k) => k !== index));
  }

  function handleEditStep(data, index) {
    setKeyType(data.key);
    setEditIndex(() => index);
    setState(data.value);
  }

  useEffect(() => {
    if (typeof state === "object") {
      setCanSubmit(Object.entries(state).map(Boolean).every(Boolean));
      return;
    }
    if (typeof state === "string") {
      setCanSubmit(Boolean(state));
      return;
    }
  }, [state]);

  useEffect(() => {
    // when the step key changes reset the state and editIndex
    setEditIndex(false);
    setState("");
  }, [keyType]);

  return (
    <ArrayInput
      name="Pages"
      currentState={[]}
      parentState={initState}
      arrayType="page"
      editIndex={editIndex}
      deleteArrayItem={handleDeleteStep}
      getEditData={handleEditStep}
    >
      <div className="w-full border-l-2 border-primary pl-4">
        <SelectInput
          key={keyType}
          init={keyType}
          setValue={(v) => setKeyType(v)}
          name="Key"
          list={STEP_TYPE}
        />
        <div className="flex flex-col items-start justify-start gap-4">
          {["markdown", "heading"].includes(keyType) && (
            <MarkdownInput
              name={keyType}
              key={keyType}
              value={state}
              setValue={(v) => setState(v)}
              placeholder="Markdown step"
            />
          )}

          {keyType === "image" && (
            <ImageInput
              name={keyType}
              key={keyType}
              value={state}
              setValue={(v) => setState(v)}
              placeholder="Image step"
              isDarkMode={isDarkMode}
            />
          )}

          {keyType === "code" && (
            <ObjectInput
              key={keyType}
              parentState={state}
              isDarkMode={isDarkMode}
              getObjectData={function () {
                console.log(arguments);
              }}
              name={keyType}
            >
              <MarkdownInput
                name="language"
                placeholder="Code language eg. JSX, Python etc"
                value={state.language || ""}
                setValue={(v) =>
                  setState((prev) => ({
                    ...prev,
                    language: v,
                  }))
                }
                split={true}
              />

              <MarkdownInput
                name="file"
                placeholder="File Name"
                value={state.file || ""}
                setValue={(v) =>
                  setState((prev) => ({
                    ...prev,
                    file: v,
                  }))
                }
                split={true}
              />
              <MarkdownInput
                name="code"
                placeholder="Code block"
                value={state.code || ""}
                setValue={(v) =>
                  setState((prev) => ({
                    ...prev,
                    code: v,
                  }))
                }
                split={false}
              />
            </ObjectInput>
          )}
        </div>
      </div>
      {canSubmit && (
        <div className="w-max">
          <CTA
            isDarkMode={isDarkMode}
            cb={handleAddPage}
            btnMode={true}
            btnType="button"
            label="Add step"
          />
        </div>
      )}
    </ArrayInput>
  );
};

export default PageInput;

// getArrayItem, deleteArrayItem, editIndex, getEditData, name, }
