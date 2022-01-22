import axios from 'axios';

const claroClient = axios.create({
  baseURL: process.env.REACT_APP_CLARO_SERVICE_BASE_URL,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
//   timeout: 6000,
});

export default claroClient;