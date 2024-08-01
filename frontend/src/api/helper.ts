import { EmployeeParams } from "../models/employee"

export function getAxiosParams(employeeParams: EmployeeParams) {
  const params = new URLSearchParams()
  if (employeeParams["filter[name]"]) params.append('filter[name]', employeeParams["filter[name]"])
  return params
}