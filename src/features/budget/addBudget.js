import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../common/button/Button";
import { Input } from "../../common/input/Input";
import { Modal } from "../../common/modal/modal";
import { SelectBox } from "../../common/select/SelectBox";
import { selectAllTags } from "../tags/tagSlice";
import {
  getBudget,
  putNewTotalBudget,
  updateCurrentBudget,
} from "./budgetSlice";

export const AddBudgetTags = ({ actionType, tag }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tagId, setTagId] = useState("");
  const [amount, setAmount] = useState(0);

  const budget = useSelector(getBudget);
  const tags = useSelector(selectAllTags);

  const totalCategoryBudget = budget.tags.reduce(
    (current, tag) => current + tag.assigned,
    0
  );

  const getTextAndAction = (action) => {
    switch (action) {
      case "delete":
        return ["Delete Tag", updateCurrentBudget];
      case "update":
        return ["Update Tag", updateCurrentBudget];
      default:
        return ["Add Tag", updateCurrentBudget];
    }
  };
  let [displayText, submitAction] = getTextAndAction(actionType);

  const isNewTag = !tag;
  const isDelete = actionType === "delete";

  useEffect(() => {
    if (!isNewTag) {
      setTagId(tag.tag_id);
      setAmount(tag.assigned);
    }
    return () => {
      setTagId("");
      setAmount(0);
    };
  }, [isNewTag, tag]);

  const dispatch = useDispatch();
  return (
    <div>
      <Button text={displayText} onClick={() => setIsOpen(!isOpen)} image={displayText}/>
      <Modal
        isOpen={isOpen}
        title={displayText}
        reset={() => setIsOpen(false)}
        onSubmit={() => {
          let tag = { tag_id: tagId, assigned: amount };
          let body = { ...budget };
          if (isDelete) {
            body.tags = body.tags.filter((ele) => ele.tag_id !== tag.tag_id);
          } else if (!isNewTag) {
            body.tags = body.tags.map((ele) =>
              ele.tag_id === tag.tag_id ? tag : ele
            );
          } else {
            body.tags = [...body.tags, tag];
          }
          dispatch(submitAction(body));
          setIsOpen(false);
        }}
      >
        <div>
          <div className={"section"}>
            <div className={"label"}>Tag Name</div>
            <div className={"field"}>
              <SelectBox
                valKey={"tag_id"}
                nameKey={"tag_fullName"}
                isDisabled={isDelete || !isNewTag}
                options={tags}
                onChange={(val) => setTagId(val)}
              />
            </div>
          </div>
          <div className={"section"}>
            <div className={"label"}>Set Amount</div>
            <div className={"field"}>
              <Input
                type={"number"}
                value={amount}
                isDisabled={isDelete}
                onUpdate={(val) => setAmount(parseInt(val) || 0)}
              />
            </div>
          </div>
          {amount > totalCategoryBudget && (
            <div className="error text-center">
              WARNING: Amount should be less than total budget
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};
