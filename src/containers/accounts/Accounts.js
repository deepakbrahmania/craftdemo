import classNames from "classnames";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../common/button/Button";
import { relativeTimeFromNow } from "../../common/helpers";
import { Table } from "../../common/table/Table";
import {
  fetchAllAccounts,
  getAccountStatus,
  selectAllAccounts,
} from "../../features/accounts/accountSlice";
import { AddAccount } from "../../features/accounts/add-account/AddAccount";
import styles from "./Accounts.module.css";

export const Accounts = (props) => {
  const accounts = useSelector(selectAllAccounts);
  const [accountStatus, accountError] = useSelector(getAccountStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    if (accountStatus === "idle") {
      dispatch(fetchAllAccounts());
    }
  }, [accountStatus, dispatch]);

  let accountContent;
  if (accountStatus === "pending") {
    accountContent = <div>Loading Tags...</div>;
  } else if (accountStatus === "failure") {
    accountContent = (
      <div>
        <h4>Failure Occurred</h4>
        <div>
          Reason <code>{accountError}</code>
        </div>
      </div>
    );
  } else {
    accountContent = (
      <Table
        headers={{
          account_name: "Account",
          account_number: "Account Number",
          account_type: "Type",
          account_balance: "Balance",
          last_updated: "Last Updated",
        }}
        data={accounts}
        renderElement={(key, val) => {
          if (key === "last_updated") return relativeTimeFromNow(val);
          return val || "-";
        }}
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
      <h2 className="text-center">Accounts Summary </h2>
      <div className="row flex-col">
        <div className="col">
          <AddAccount />
        </div>
        <div className="col">{accountContent}</div>
      </div>
    </div>
  );
};
