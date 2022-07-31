import API from "../../common/api";

export const fetchTrends = (props) =>
  API.get("/trends", { ...props }).then((data) => data);
