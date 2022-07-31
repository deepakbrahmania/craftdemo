import React from "react";
import styles from "./UpdateBudget.module.css";
import classNames from "classnames";
import { AddBudgetTags } from "../../../features/budget/addBudget";
import { Input } from "../../../common/input/Input";
import { Button } from "../../../common/button/Button";

export const UpdateBudget = ({ budget, tags}) => {
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
            isDisabled
              type="number"
              value={tag.assigned}
            />
          </div>
          <div className={styles.action}>
            <AddBudgetTags actionType={"update"} tag={tag} />
            <AddBudgetTags actionType={"delete"} tag={tag}/>
            {/* <Button text={"X"} onClick={() => onDelete(tag.tag_id)} / > */}
          </div>
        </div>
      ))}
      <AddBudgetTags />
      
    </div>
  );
};
