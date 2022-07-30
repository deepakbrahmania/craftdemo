import React from "react";
import styles from "./UpdateBudget.module.css";
import classNames from "classnames";
import { AddBudgetTags } from "../../../features/budget/addBudget";
import { Input } from "../../../common/input/Input";
import { Button } from "../../../common/button/Button";

export const UpdateBudget = ({ budget, tags, onUpdate, onDelete }) => {
  return (
    <div className={classNames(styles.budgetContainer)}>
      <h2>
        Categories 
      </h2>
      {budget.tags.map((tag) => (
        <div key={tag.tag_id} className={styles.row}>
          <div className={styles.label}>{tags[tag.tag_id].tag_fullName}</div>
          <div className={styles.input}>
            <Input
              type="number"
              value={tag.assigned}
              onChange={(e) => onUpdate(tag.tag_id, e.target.value)}
            />
          </div>
          <div className={styles.action}>
            <Button text={"X"} onClick={() => onDelete(tag.tag_id)} / >
          </div>
        </div>
      ))}
      <AddBudgetTags />
    </div>
  );
};
