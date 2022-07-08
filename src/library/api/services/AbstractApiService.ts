import axios, { AxiosInstance } from 'axios';

export const backend = axios.create({
  baseURL: 'https://c1491/Evaluacion_Institucional'
})

export abstract class AbstractAPIService {
  protected client!: AxiosInstance;
  
  constructor() {
    this.client = backend;
  }
}