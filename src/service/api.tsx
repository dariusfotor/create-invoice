import axios from 'axios';
import { API } from './url';

export const getCountriesApi = async () => {
  return axios.get(API.Countries);
};
