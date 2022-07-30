import api from "../../common/api";

export const getTotalBudget = (props) => {
  return api.get("/budget", {
    props,
  });
};
