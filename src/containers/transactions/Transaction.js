import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { timeStampConverter } from "../../common/helpers";
import { Table } from "../../common/table/Table";
import { TransactionMap } from "../../constants";
import {
  getAllTransactions,
  getTransactionStatus,
  fetchAllTransactions,
} from "../../features/transactions/transactionSlice";
import classNames from "classnames";
import styles from "./Transaction.module.css";
import {
  fetchAllAccounts,
  getAccountStatus,
  selectAccountEntities,
} from "../../features/accounts/accountSlice";
import { fetchAllTags, selectTagEntities } from "../../features/tags/tagSlice";
import { AddTransaction } from "../../features/transactions/crud-transactions/CrudTransactions";

export const Transaction = (props) => {
  const transactions = useSelector(getAllTransactions);
  const accounts = useSelector(selectAccountEntities);
  const allTags = useSelector(selectTagEntities);
  const dispatch = useDispatch();

  const [accountStatus, accountError] = useSelector(getAccountStatus);
  const [transactionStatus, transactionError] =
    useSelector(getTransactionStatus);
  const [tagStatus, tagsError] = useSelector(getTransactionStatus);

  useEffect(() => {
    if (transactionStatus === "idle") {
      dispatch(fetchAllTransactions());
    }
  }, [transactionStatus, dispatch]);

  useEffect(() => {
    if (accountStatus === "idle") {
      dispatch(fetchAllAccounts());
    }
  }, [accountStatus, dispatch]);

  useEffect(() => {
    if (tagStatus === "idle") {
      dispatch(fetchAllTags());
    }
  }, [tagStatus, dispatch]);

  const renderExpense = (amount, isExpense, type) => {
    return (
      <span
        className={classNames({
          [styles.debited]: isExpense && type === "debited",
          [styles.credited]: isExpense && type === "credited",
          [styles.notExpense]: !isExpense,
        })}
      >
        {amount}
      </span>
    );
  };
  let content;

  if (!transactions || transactions.length === 0) {
    content = <div>No Transactions Found</div>;
  } else if (
    accountStatus === "pending" ||
    transactionStatus === "pending" ||
    tagStatus === "pending"
  ) {
    content = <div>Loading.....</div>;
  } else if (
    accountStatus === "failed" ||
    transactionStatus === "failed" ||
    tagsError === "failed"
  ) {
    content = (
      <div>
        <h4>Failure Occurred</h4>
        <div>
          Reason
          <p>
            <code>{accountError || transactionError}</code>
          </p>
        </div>
      </div>
    );
  } else {
    content = (
      <Table
        headers={TransactionMap}
        data={transactions}
        renderElement={(key, value, row) => {
          if (key === "timestamp") {
            return timeStampConverter(value);
          } else if (key === "amount") {
            return renderExpense(value, row["expense"], row["type"]);
          } else if (key === "account") {
            return accounts[value]
              ? accounts[value].account_name || accounts[value].account_type
              : "";
          } else if (key === "tag_id") {
            return allTags[value] ? allTags[value].tag_fullName : "";
          }
          return value;
        }}
        renderActions={(row) => (
          <div>
            <AddTransaction actionTye={"update"} transaction={row}/>
            <AddTransaction actionTye={"delete"} transaction={row}/>
          </div>
        )}
      />
    );
  }
  return (
    <div>
      <h2 className="text-center">Transaction Dashboard</h2>
      <div className="row flex-col">
        <div className="col">
          <AddTransaction />
        </div>
        <div className="col">{content}</div>
      </div>
    </div>
  );
};
