import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTag, removeTag, updateExistingTag } from "./tagSlice";
import { Button } from "../../common/button/Button";
import { Modal } from "../../common/modal/modal";
import { Input } from "../../common/input/Input";

export const AddTags = ({ actionType, tag}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tagName, setTagName] = useState("");
  const [tagDesc, setTagDesc] = useState("");

  const isNewTag = !tag;
  const isDelete = actionType === "delete";

  useEffect(() => {
    if (!isNewTag) {
      setTagName(tag.tag_name)
      setTagDesc(tag.tag_fullName)
    }
    return () => {
      setTagName("")
      setTagDesc("")
    };
  }, [isNewTag, tag]);

  const dispatch = useDispatch();

  const getTextAndAction = (action) => {
    switch (action) {
      case "delete":
        return ["Delete Tag", removeTag];
      case "update":
        return ["Update Tag", updateExistingTag];
      default:
        return ["Add Tag", addTag];
    }
  };
  let [displayText, submitAction] = getTextAndAction(actionType);

  return (
    <div>
      <Button text={displayText} onClick={() => setIsOpen(!isOpen)} image={displayText} />
      <Modal
        isOpen={isOpen}
        title={displayText}
        reset={() => setIsOpen(false)}
        onSubmit={() => {
          let body = {
            tag_name: tagName, tag_fullName: tagDesc 
          };
          if (!isNewTag) {
            body["tag_id"] = tag.tag_id;
          }
          dispatch(submitAction(body));
          setIsOpen(!isOpen);
          // dispatch(addTag({ tag_name: tagName, tag_fullName: tagDesc }));
          // setIsOpen(false);
        }}
      >
        <div>
          <div className={"section"}>
            <div className={"label"}>Tag Title</div>
            <div className={"field"}>
              <Input
                isDisabled={isDelete || !isNewTag}
                type={"text"}
                value={tagName}
                onUpdate={(val) => setTagName(val)}
              />
            </div>
          </div>
          <div className={"section"}>
            <div className={"label"}>Tag Name</div>
            <div className={"field"}>
              <Input
                type={"text"}
                isDisabled={isDelete}
                value={tagDesc}
                onUpdate={(val) => setTagDesc(val)}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
