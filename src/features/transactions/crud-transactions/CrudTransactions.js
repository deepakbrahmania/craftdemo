  import React, { useEffect, useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { add, putNewTransaction, removeTransaction, updateTransaction } from "../transactionSlice";
  import { Modal } from "../../../common/modal/modal";
  import {
    selectAllAccounts,
    updateCurrentAccount,
  } from "../../accounts/accountSlice";
  import { Button } from "../../../common/button/Button";
  import { selectAllTags } from "../../tags/tagSlice";
  import { Input } from "../../../common/input/Input";
  import styles from "./CrudTransactions.module.css";
  import { SelectBox } from "../../../common/select/SelectBox";
  import { expenseType } from "../../../constants";
  import { toLocaleDateTimeString } from "../../../common/helpers";
import { updateExistingTransaction } from "../transactionAPI";

  export const AddTransaction = ({ transaction, actionTye }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [amount, setAmount] = useState(0);
    const [account, setAccount] = useState();
    const [tag, setTag] = useState("");
    const [type, setType] = useState("debited"); // either a spend or an income
    const [excludeExpense, setExcludeExpense] = useState(false);
    const [time, setTime] = useState(new Date().getTime());

    const accounts = useSelector(selectAllAccounts);
    const tags = useSelector(selectAllTags);

    const isNewTransaction = !transaction;
    const isDelete = actionTye === "delete";

    useEffect(() => {
      if (!isNewTransaction) {
        setAmount(transaction.amount || 0);
        setAccount(transaction.account);
        setTag(transaction.tag_id || "");
        setType(transaction.type.toLowerCase());
        setExcludeExpense(!transaction.expense);
        setTime(transaction.timestamp);
      }
      return () => {
        setAmount(0);
        setAccount();
        setTag("");
        setType("debited");
        setExcludeExpense(false);
        setTime(new Date().getTime());
      };
    }, [isNewTransaction, transaction]);

    const dispatch = useDispatch();

    const getTextAndAction = (action) => {
      switch (action) {
        case "delete":
          return ["Delete Transaction", removeTransaction];
        case "update":
          return ["Update Transaction", updateTransaction];
        default:
          return ["Add Transaction", putNewTransaction];
      }
    };
    let [displayText, submitAction] = getTextAndAction(actionTye);
    return (
      <div>
        <Button
          text={displayText}
          primary={isNewTransaction}
          onClick={() => setIsOpen(!isOpen)}
        />
        <Modal
          isOpen={isOpen}
          title={displayText}
          reset={() => setIsOpen(false)}
          onSubmit={() => {
            let body = {
              account: account,
              amount: amount,
              timestamp: new Date(time).getTime(),
              tag_id: tag,
              type: type,
              expense : !excludeExpense,
            };
            if (!isNewTransaction) {
              body["transaction_id"] = transaction.transaction_id;
            }
            dispatch(submitAction(body));
            setIsOpen(!isOpen);
          }}
        >
          <div className={"section"}>
            <div className={"label"}>Select Account</div>
            <div className={"field"}>
              <SelectBox
                selected={account}
                valKey={"account_id"}
                nameKey={"account_name"}
                isDisabled={!isNewTransaction}
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
                onUpdate={(val) => setAmount(parseInt(val))}
              />
            </div>
          </div>
          <div className="section">
            <div className="label">Select Tag</div>
            <div className="field">
              <SelectBox
                selected={tag}
                valKey={"tag_id"}
                isDisabled={isDelete}
                nameKey={"tag_fullName"}
                options={tags}
                onChange={(val) => setTag(val)}
              />
            </div>
          </div>
          <div className="section">
            <div className="label">Time</div>
            <div className="field">
              <Input
                value={toLocaleDateTimeString(new Date(parseInt(time)))}
                isDisabled={isDelete}
                type="date"
                onUpdate={(val) => {
                  console.log(new Date(val).getTime());
                  setTime(new Date(val).getTime());
                }}
              />
            </div>
          </div>
          <div className="section">
            <div className="label">Expense Type</div>
            <div className="field">
              <SelectBox
                selected={type}
                nameKey={"type"}
                valKey={"type"}
                options={expenseType}
                isDisabled={isDelete}
                renderOption={(option) => option.label}
                onChange={(val) => setType(val.toLowerCase())}
              />
            </div>
          </div>
          <div className="section">
            <div className="label">Exclude Expense</div>
            <div className="field">
              <Input
                type="checkbox"
                value={excludeExpense}
                isDisabled={isDelete}
                onUpdate={() => setExcludeExpense(!excludeExpense)}
              />
            </div>
          </div>
        </Modal>
      </div>
    );
  };
