import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createNewAccount, removeAccount, updateCurrentAccount } from "../accountSlice";
import { Modal } from "../../../common/modal/modal";
import { Button } from "../../../common/button/Button";
import { Input } from "../../../common/input/Input";
import styles from "./ModifyAccounts.module.css";

export const ModifyAccounts = ({ account, action }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [balance, setBalance] = useState(0);
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");

  const isNewAccount = !account;
  const isDelete = action === "delete";
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isNewAccount) {
      setBalance(account.account_balance || 0);
      setAccountName(account.account_name || "");
      setAccountNumber(account.account_number || "");
    }
    return () => {
      setBalance(0);
      setAccountName("");
      setAccountNumber("");
    };
  }, [isNewAccount, account]);

  const getTextAndAction = (action) => {
    switch (action) {
      case "delete":
        return ["Delete Account", removeAccount];
      case "update":
        return ["Update Account", updateCurrentAccount];
      default:
        return ["Add Account", createNewAccount];
    }
  };
  let [displayText, submitAction] = getTextAndAction(action);

  return (
    <div>
      <Button
        text={displayText}
        primary={isNewAccount}
        onClick={() => setIsOpen(!isOpen)}
      />
      <Modal
        isOpen={isOpen}
        title={displayText}
        reset={() => setIsOpen(false)}
        onSubmit={() => {
          let body = {
            account_name: accountName,
            account_number: accountNumber,
            account_type: "bank",
            account_balance: Number.parseInt(balance),
            last_updated: Date.now(),
          };
          if (!isNewAccount) {
            body["account_id"] = account.account_id;
          }
          dispatch(submitAction(body));
          setIsOpen(!isOpen);
        }}
      >
        <div className={"section"}>
          <div className={"label"}>Account Name</div>
          <div className={"field"}>
            <Input
              isDisabled={!isNewAccount}
              value={accountName}
              type={"text"}
              onUpdate={(val) => setAccountName(val)}
            />
          </div>
        </div>
        <div className="section">
          <div className="label">Current Balance</div>
          <div className="field">
            <Input
              isDisabled={!isNewAccount && isDelete}
              value={balance}
              type={"number"}
              onUpdate={(val) => setBalance(val)}
            />
          </div>
        </div>
        <div className={"section"}>
          <div className={"label"}>Account Number (last 4 digit)</div>
          <div className={"field"}>
            <Input
              value={accountNumber}
              isDisabled={!isNewAccount}
              type={"text"}
              onUpdate={(val) => setAccountNumber(val)}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};
