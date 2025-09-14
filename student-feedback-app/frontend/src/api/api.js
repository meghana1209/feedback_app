// API utility functions
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/feedback';

export const getFeedback = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const addFeedback = async (feedback) => {
  const res = await axios.post(API_URL, feedback);
  return res.data;
};
