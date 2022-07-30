import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../transactionSlice";
import { Modal } from "../../../common/modal/modal";
import { selectAllAccounts } from "../../accounts/accountSlice";
import { Button } from "../../../common/button/Button";
import { selectAllTags } from "../../tags/tagSlice";
import { Input } from "../../../common/input/Input";
import styles from "./AddTransaction.module.css";
import { SelectBox } from "../../../common/select/SelectBox";
import { expenseType } from "../../../constants";

export const AddTransaction = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const [account, setAccount] = useState("");
  const [tag, setTag] = useState("");
  const [type, setType] = useState("debit"); // either a spend or an income
  const [isExpense, setIsExpense] = useState(false);
  const [time, setTime] = useState(Date.now());

  const accounts = useSelector(selectAllAccounts);
  const tags = useSelector(selectAllTags);

  const dispatch = useDispatch();

  console.log(accounts, tags);
  return (
    <div>
      <Button
        text={"Add Transaction"}
        primary
        onClick={() => setIsOpen(!isOpen)}
      />
      <Modal
        isOpen={isOpen}
        title={"Add Transaction"}
        reset={() => setIsOpen(false)}
        onSubmit={() =>
          dispatch(
            add({
              account,
              amount,
              timestamp: time,
              tag_id: tag,
              type,
              expense: isExpense,
            })
          )
        }
      >
        <div className={"section"}>
          <div className={"label"}>Select Account</div>
          <div className={"field"}>
            <SelectBox
              selected={account}
              valKey={"account_id"}
              nameKey={"account_name"}
              options={accounts}
              renderOption={(account) =>
                account.account_number
                  ? `${account.account_name} - ${account.account_number}`
                  : `${account.account_name}`
              }
              onChange={(val) => setAccount(val)}
            />
          </div>
        </div>
        <div className={"section"}>
          <div className={"label"}>Amount</div>
          <div className={"field"}>
            <Input
              value={amount}
              type={"number"}
              onUpdate={(val) => setAmount(val)}
            />
          </div>
        </div>
        <div className="section">
          <div className="label">Select Tag</div>
          <div className="field">
            <SelectBox
              selected={tag}
              valKey={"tag_id"}
              nameKey={"tag_fullName"}
              options={tags}
              onChange={(val) => setTag(val)}
            />
          </div>
        </div>
        <div className="section">
          <div className="label">Time</div>
          <div className="field">
            <Input value={time} type="datetime-local" onUpdate={(val) => setTime(val)} />
          </div>
        </div>
        <div className="section">
          <div className="label">Expense Type</div>
          <div className="field">
          <SelectBox
              selected={type}
              nameKey={"type"}
              options={expenseType}
              renderOption={(option)=> <span>{option.label}</span>}
              onChange={(val) => setTag(val)}
            />
          </div>
        </div>
        <div className="section">
          <div className="label">Exclude Expense</div>
          <div className="field">
            <Input type="checkbox" value={isExpense} onUpdate={() => setIsExpense(!isExpense)} />
          </div>
        </div>
      </Modal>
    </div>
  );
};
