import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { add } from "./tagSlice";
import { Button } from "../../common/button/Button";
import { Modal } from "../../common/modal/modal";
import { Input } from "../../common/input/Input";

export const AddTags = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tagName, setTagName] = useState("");
  const [tagDesc, setTagDesc] = useState("");
  const dispatch = useDispatch();

  return (
    <div>
      <Button text={"Add Tag"} primary onClick={() => setIsOpen(!isOpen)} />
      <Modal
        isOpen={isOpen}
        title={"Add New Tag"}
        reset={() => setIsOpen(false)}
        onSubmit={() => dispatch(add(tagName, tagDesc))}
      >
        <div>
          <div className={"section"}>
            <div className={"label"}>Tag Title</div>
            <div className={"field"}>
              <Input
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
