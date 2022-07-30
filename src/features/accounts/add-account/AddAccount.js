import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAccount } from "../accountSlice";
import { Modal } from "../../../common/modal/modal";
import { Button } from "../../../common/button/Button";
import { Input } from "../../../common/input/Input";
import { SelectBox } from "../../../common/select/SelectBox";
import styles from "./AddAccount.module.css";

export const AddAccount = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [balance, setBalance] = useState(0);
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");

  // const tags = useSelector(selectAllTags);

  const dispatch = useDispatch();

  return (
    <div>
      <Button text={"Add Account"} primary onClick={() => setIsOpen(!isOpen)} />
      <Modal
        isOpen={isOpen}
        title={"Add Account"}
        reset={() => setIsOpen(false)}
        onSubmit={() =>
          dispatch(
            addAccount({
              account_name: accountName,
              account_number: accountNumber,
              account_type: "bank",
              account_balance: balance,
            })
          )
        }
      >
        <div className={"section"}>
          <div className={"label"}>Account Name</div>
          <div className={"field"}>
            <Input
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
              type={"text"}
              onUpdate={(val) => setAccountNumber(val)}
            />
          </div>
        </div>
       
      </Modal>
    </div>
  );
};
