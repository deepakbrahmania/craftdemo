import api from "../../common/api"

export const fetchAccounts = () => {
    return api.get('/accounts');
}