import api from "../../common/api"

export const fetchTags = () => {
    return api.get('/tags');
}