
import { EmployeeParams } from "../models/employee"
interface Props {
  employeePramas: EmployeeParams, 
  handleFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

export const Filter = ({employeePramas, handleFilterChange}: Props) => {
  return  <input
              type="text"
              id='filter[name]'
              value={employeePramas["filter[name]"] || ''}
              onChange={handleFilterChange}
              placeholder={`Search name...`}
              className="mb-4 p-2 w-96 border rounded"
              />
       
}