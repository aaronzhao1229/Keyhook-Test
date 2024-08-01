import axios, { AxiosError, AxiosResponse } from "axios"

axios.defaults.baseURL = "http://localhost:4567/api/v1/"
const responseBody = (response: AxiosResponse) => response.data

const requests = {
  // URLSearchParams is not needed to be imported. It allows us to pass the params as query strings to our request. In our Axios get requests, it can take some configuration, and one of the configuration options is to send up a params object and it can be of type URL search parameters
    get: (url: string, params?: URLSearchParams) => axios.get(url, {params}).then(responseBody),
   
}

const Employees = {
  getEmployees: (params: URLSearchParams) =>  
   requests.get(`employees`, params),
    
}

const agent = {
 Employees
}

export default agent