import classNames from "classnames";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PieChart } from "../../common/charts/pie";
import { UpdateBudget } from "../../components/budget/update-budget/UpdateBudget";
import {
  fetchBudget,
  getBudget,
  getBudgetStatus,
} from "../../features/budget/budgetSlice";
import {
  fetchAllTags,
  getTagsStatus,
  selectTagEntities,
} from "../../features/tags/tagSlice";

import styles from "./Budget.module.css";

export const Budget = (props) => {
  const [budgetStatus, budgetError] = useSelector(getBudgetStatus);
  const budgetData = useSelector(getBudget);

  const tags = useSelector(selectTagEntities);
  const [tagsStatus, tagsError] = useSelector(getTagsStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    if (budgetStatus === "idle") {
      dispatch(fetchBudget());
    }
  }, [budgetStatus, dispatch]);

  useEffect(() => {
    if (tagsStatus === "idle") {
      dispatch(fetchAllTags());
    }
  }, [tagsStatus, dispatch]);

  let budgetSummaryContent;
  let data;

  if (budgetStatus === "pending" || tagsStatus === "pending") {
    budgetSummaryContent = <div className="col">Loading...</div>;
  } else if (budgetStatus === "failure" || tagsStatus === "failure") {
    budgetSummaryContent = (
      <div className="col">
        <h4>Failure Occurred</h4>
        <div>
          Reason <code>{budgetError || tagsError}</code>
        </div>
      </div>
    );
  } else if (budgetData.tags.length > 0 && Object.keys(tags).length > 0) {
    data = budgetData.tags.map((tag) => [
      tags[tag.tag_id].tag_fullName,
      Number.parseInt(tag.assigned),
    ]);
    data.unshift(["Tags", "Budget Allocated"]);
    budgetSummaryContent = (
      <>
        <div className="col">
          <h2>Summary</h2>
          <PieChart data={data} options={{ title: "Tags" }} />
        </div>
        <div className="col">
          <UpdateBudget
            budget={budgetData}
            tags={tags}
            onAdd={() => {}}
            onUpdate={() => {}}
            onDelete={() => {}}
          />
        </div>
      </>
    );
  } else {
    budgetSummaryContent = <div className="row">No Data Found</div>;
  }

  return [
    <div className="row">{budgetSummaryContent}</div>,
    <div className="row">
      <div className={classNames(styles.dataWrapper, {})}>
        Current Spend:{" "}
        <span
          className={classNames({
            [styles.maxedOut]: budgetData.assigned - budgetData.spend < 0,
            [styles.withInLimit]: budgetData.assigned - budgetData.spend >= 0,
          })}
        >
          {budgetData.spend}
        </span>
      </div>
      <div className={styles.dataWrapper}>
        Budget Remaining:
        <span
          className={classNames({
            [styles.maxedOut]: budgetData.assigned - budgetData.spend < 0,
            [styles.withInLimit]: budgetData.assigned - budgetData.spend >= 0,
          })}
        >
          {budgetData.assigned - budgetData.spend}
        </span>
      </div>
    </div>,
  ];
};
