
import axios from "axios";

export const analyzeFeedback = (data) => {
  return axios.post("http://127.0.0.1:5000/lyze-batch", data);
};
    