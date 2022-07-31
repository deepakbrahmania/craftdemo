import API from "../../common/api";

export const fetchTransactions = (props) =>
  API.get("/transactions", { props }).then((data) => data);

export const putTransaction = (props) =>
  API.put("/transactions/new", { ...props }).then((data) => data);

export const updateExistingTransaction = (props) =>
  API.post(`/transactions/${props.transaction_id}/update`, { ...props }).then(
    (data) => data
  );

export const deleteTransaction = (props) =>
  API.delete(`/transactions/${props.transaction_id}/delete`).then(
    (data) => data
  );
