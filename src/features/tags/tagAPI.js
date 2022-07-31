import API from "../../common/api"

export const fetchTags = () => {
    return API.get('/tags');
}
export const putTag = (props) =>
  API.put("/tags/new", { ...props }).then((data) => data);

export const updateTag = (props) =>
  API.post(`/tags/${props.tag_id}/update`, {...props }).then(
    (data) => data
  );

export const deleteTag = (props) =>
  API.delete(`/tags/${props.tag_id}/delete`).then(
    (data) => data
  );