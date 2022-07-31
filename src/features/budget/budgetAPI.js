import API from "../../common/api";

export const getTotalBudget = (props) => {
  return API.get("/budget", {
    props,
  });
};
export const putTotalBudget = (props) =>
  API.put("/budget/new", { props }).then((data) => data);

export const updateTotalBudget = (props) =>
  API.post(`/budget/update`, { props }).then(
    (data) => data
  );

export const deleteBudget = (props) =>
  API.delete(`/budget/delete`).then(
    (data) => data
  );

