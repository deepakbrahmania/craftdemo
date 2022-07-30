import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllTags,
  getTagsStatus,
  selectAllTags,
} from "../../features/tags/tagSlice";
import classNames from "classnames";
import styles from "./Tags.module.css";
import { AddTags } from "../../features/tags/AddTags";
import { Table } from "../../common/table/Table";
import { Button } from "../../common/button/Button";

export const Tags = () => {
  const tags = useSelector(selectAllTags);
  const [tagsStatus, tagsError] = useSelector(getTagsStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    if (tagsStatus === "idle") {
      dispatch(fetchAllTags());
    }
  }, [tagsStatus, dispatch]);

  let tagsContent;
  if (tagsStatus === "pending") {
    tagsContent = <div>Loading Tags...</div>;
  } else if (tagsStatus === "failure") {
    tagsContent = (
      <div>
        <h4>Failure Occurred</h4>
        <div>
          Reason <code>{tagsError}</code>
        </div>
      </div>
    );
  } else {
    tagsContent = (
      <Table
        headers={{"tag_name":"Tag", "tag_fullName": "Name"}}
        data={tags}
        renderActions={() => (
          <div>
            <Button text={"Delete"} onClick={() => {}} />
            <Button text={"Update"} onClick={() => {}} />
          </div>
        )}
      />
    );
  }
  return (
    <div>
    <h2 className="text-center">Tags Summary</h2>
    <div className="row flex-col">
      <div className="col">
        <AddTags />
      </div>
      <div className="col">{tagsContent}</div>
    </div>
  </div>
  );
};
