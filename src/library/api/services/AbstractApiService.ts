import axios, { AxiosInstance } from 'axios';

export const backend = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})

export abstract class AbstractAPIService {
  protected client!: AxiosInstance;
  
  constructor() {
    this.client = backend;
  }
}