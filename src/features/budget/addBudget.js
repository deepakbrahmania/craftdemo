import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../common/button/Button";
import { Input } from "../../common/input/Input";
import { Modal } from "../../common/modal/modal";
import { SelectBox } from "../../common/select/SelectBox";
import { selectAllTags } from "../tags/tagSlice";
import { addCategory, getBudget } from "./budgetSlice";

export const AddBudgetTags = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tagId, setTagId] = useState("");
  const [amount, setAmount] = useState(0);

  const budget = useSelector(getBudget);
  const tags = useSelector(selectAllTags);

  const totalCategoryBudget = budget.tags.reduce(
    (current, tag) => current + tag.assigned,
    0
  );

  const dispatch = useDispatch();

  return (
    <div>
      <Button text={"Add Tag"} primary onClick={() => setIsOpen(!isOpen)} />
      <Modal
        isOpen={isOpen}
        title={"Add Budget Category"}
        reset={() => setIsOpen(false)}
        onSubmit={() => dispatch(addCategory(tagId, amount))}
      >
        <div>
          <div className={"section"}>
            <div className={"label"}>Tag Name</div>
            <div className={"field"}>
              <SelectBox
                valKey={"tag_id"}
                nameKey={"tag_fullName"}
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
                onUpdate={(val) => setAmount(parseInt(val) || 0)}
              />
            </div>
          </div>
          {amount > totalCategoryBudget && (
                <div className="error text-center">WARNING: Amount should be less than total budget</div>
              )}
        </div>
      </Modal>
    </div>
  );
};
