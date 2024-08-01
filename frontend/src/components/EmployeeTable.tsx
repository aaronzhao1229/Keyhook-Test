import React, { useMemo, useEffect, useState } from 'react';
import { useReactTable, getCoreRowModel, flexRender, getSortedRowModel, SortingState } from '@tanstack/react-table';

import { apiResponse, Employee, EmployeeParams } from '../models/employee';
import agent from '../api/agent';
import { Filter } from './Filter';
import { getAxiosParams } from '../api/helper';
import { ArrowsUpDownIcon, BarsArrowDownIcon, BarsArrowUpIcon } from '@heroicons/react/24/outline';


const EmployeeTable: React.FC = () => {
  const [data, setData] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sorting, setSorting] = useState<SortingState>([])
  
  const [employeePramas, setEmployeePramas] = useState<EmployeeParams>({include: 'department'});


  const fetchEmployees = (params: EmployeeParams) => {
      const axiosParams = getAxiosParams(params);
      agent.Employees.getEmployees(axiosParams)
        .then((employeesData) => {
          const employees = employeesData.data.map((employee: apiResponse) => employee.attributes);
          setData(employees);
        })
        .catch((error) => {
          setError(error.message);
        });
    };
  
  const handleFilterChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setEmployeePramas(prev => ({...prev, 'filter[name]': e.target.value}))
    fetchEmployees({...employeePramas, 'filter[name]': e.target.value})
  }

  

  useEffect(() => {
    fetchEmployees({include: 'department'})
    setLoading(false)
  }, []);

  console.log(data)

  

    const columns = useMemo(
    () => [
      {
        accessorKey: 'first_name',
        header: 'First Name',
        cell: (props) => <p>{props.getValue()}</p>,
      },
      {
        accessorKey: 'last_name',
        header: 'Last Name',
        cell: (props) => <p>{props.getValue()}</p>,
      },
      {
        accessorKey: 'age',
        header: 'Age',
        cell: (props) => <p>{props.getValue()}</p>,
      },
      {
        accessorKey: 'position',
        header: 'Position',
        cell: (props) => <p>{props.getValue()}</p>,
      },
      {
        accessorKey: 'department_name',
        header: 'Department',
        cell: (props) => <p>{props.getValue()}</p>,
        enableSorting: false
      },
    ],
    []
  );
  
  const table = useReactTable({
    data,
    columns,
    state:{
      sorting
    },
   
    getCoreRowModel: getCoreRowModel(),
    // getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
     })

  useEffect(() => {
    if (table.getState().sorting.length > 0) {
      const sortId = table.getState().sorting[0].desc ? '-' + table.getState().sorting[0].id : table.getState().sorting[0].id
      setEmployeePramas(prev => ({...prev, sort: sortId}))
      fetchEmployees({...employeePramas, sort: sortId})
    }
    else {
      const {sort, ...newValues} = employeePramas
      console.log(newValues)
      setEmployeePramas(newValues)
      fetchEmployees(newValues)
    }
    }, [table.getState().sorting]);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  
  return (
    <div className="p-4">
      <Filter employeePramas={employeePramas} handleFilterChange={handleFilterChange}/>
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getCanSort() && <ArrowsUpDownIcon width={20} onClick={header.column.getToggleSortingHandler()
                      }/>}
                     {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}

                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
       
      </table>
    </div>
  );
};

export default EmployeeTable;