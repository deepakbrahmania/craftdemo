import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../common/button/Button";
import { Notification } from "../../common/notification/Notification";
import { relativeTimeFromNow } from "../../common/helpers";
import { Table } from "../../common/table/Table";
import {
  clearUpdates,
  fetchAllAccounts,
  getAccountStatus,
  getUpdateStatus,
  removeAccount,
  selectAllAccounts,
} from "../../features/accounts/accountSlice";
import { ModifyAccounts } from "../../features/accounts/modify-accounts/ModifyAccounts";
import styles from "./Accounts.module.css";

export const Accounts = (props) => {
  const accounts = useSelector(selectAllAccounts);
  const [accountStatus, accountError] = useSelector(getAccountStatus);
  const newUpdates = useSelector(getUpdateStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(accounts, accountStatus, accountError);
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
        renderActions={(row) => (
          <div className="row">
            <div className="col">
              <ModifyAccounts account={row} action="update" />
            </div>
            <div className="col">
              <ModifyAccounts account={row} action={"delete"} />
            </div>
          </div>
        )}
      />
    );
  }
  return (
    <div>
      <h2 className="text-center">Accounts Summary </h2>
      {newUpdates && newUpdates.length > 0 && (
        <Notification
          dismissable
          onRequestClose={() => dispatch(clearUpdates())}
          type={"info"}
        >
          {newUpdates}
        </Notification>
      )}
      <div className="row flex-col">
        <div className="col">
          <ModifyAccounts />
        </div>
        <div className="col">{accountContent}</div>
      </div>
    </div>
  );
};
