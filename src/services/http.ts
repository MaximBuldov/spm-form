import axios from 'axios';

export const $api = axios.create({
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true,
  baseURL: 'https://smartpeoplemoving.com'
});
