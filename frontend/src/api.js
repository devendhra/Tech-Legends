import axios from "axios";

const API_BASE = "http://localhost:8000";

export const analyzeText = async (textList) => {
  const response = await axios.post(`${API_BASE}/analyze-text`, {
    user_id: "user-1",
    feedbacks: textList
  });
  return response.data;
};

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await axios.post(`${API_BASE}/upload-file?user_id=user-1`, formData);
  return response.data;
};