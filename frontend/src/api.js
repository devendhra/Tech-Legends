
import axios from "axios";

export const analyzeFeedback = (data) => {
  return axios.post("http://127.0.0.1:8000/analyze-feedback", data);
};
