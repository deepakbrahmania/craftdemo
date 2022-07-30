import API from "../../common/api";

export const fetchTransactions = (props) =>
    API.get('/transactions', { props })
        .then(data => data);