import API from "../../common/api"

export const fetchAccounts = () => {
    return API.get('/accounts');
}
export const putAccount = (props) =>
  API.put("/accounts/new", { ...props }).then((data) => data);

export const updateAccount = (props) =>
  API.post(`/accounts/${props.account_id}/update`, { ...props }).then(
    (data) => data
  );

export const deleteAccount = (props) =>
  API.delete(`/accounts/${props.account_id}/delete`).then(
    (data) => data
  );