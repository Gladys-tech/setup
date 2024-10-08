import axios from 'axios';

export const API_BASE_URL = ' http://localhost:8000';
// only use it when u are pushing to github.
//  export const API_BASE_URL = ' https://api.yubu.ponjieducare.com';

export const httpApi = axios.create({
  baseURL: API_BASE_URL
});
