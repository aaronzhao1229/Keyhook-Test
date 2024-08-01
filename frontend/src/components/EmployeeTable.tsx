import React, { useMemo, useEffect, useState } from 'react';
import { useReactTable, getCoreRowModel, flexRender, getSortedRowModel, SortingState, getPaginationRowModel, PaginationState } from '@tanstack/react-table';

import { apiResponse, Employee, EmployeeParams } from '../models/employee';
import agent from '../api/agent';
import { Filter } from './Filter';
import { getAxiosParams } from '../api/helper';
import { ArrowsUpDownIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';


const EmployeeTable: React.FC = () => {
  const [data, setData] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 20 })
  
  const [employeePramas, setEmployeePramas] = useState<EmployeeParams>({include: 'department'});


  const fetchEmployees = async (params: EmployeeParams) => {
      const axiosParams = getAxiosParams(params);
      return agent.Employees.getEmployees(axiosParams)
        .then((employeesData) => {
          const employees = employeesData.data.map((employee: apiResponse) => employee.attributes);
          setData(employees);
          return employees
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
      sorting,
      pagination
    },
    getCoreRowModel: getCoreRowModel(),
    // getSortedRowModel: getSortedRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount:50,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
     })

  useEffect(() => {
    if (table.getState().sorting.length > 0) {
      const sortId = table.getState().sorting[0].desc ? '-' + table.getState().sorting[0].id : table.getState().sorting[0].id
      setEmployeePramas(prev => ({...prev, sort: sortId}))
      fetchEmployees({...employeePramas, sort: sortId})
    }
    else {
      const {sort, ...newValues} = employeePramas
      setEmployeePramas(newValues)
      fetchEmployees(newValues)
    }
    }, [table.getState().sorting]);

  useEffect(() => {
    const pageIndex = table.getState().pagination.pageIndex + 1
    if (pageIndex !== employeePramas['page[number]']) {
      console.log(table.getState().pagination.pageIndex + 1)
      setEmployeePramas(prev => ({...prev, 'page[number]': pageIndex}))
      fetchEmployees({...employeePramas, 'page[number]': pageIndex})
    }
    }, [table.getState().pagination.pageIndex]);
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  
  return (
    <div className="p-4 w-full flex flex-col">
      <Filter employeePramas={employeePramas} handleFilterChange={handleFilterChange}/>
      <table className='table-auto border-collapse border border-slate-400'>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className='border border-slate-300'>
                  <div className='flex items-center justify-center gap-2'>
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
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className='border border-slate-300'>
                  <div className='flex items-center justify-center'>{flexRender(cell.column.columnDef.cell, cell.getContext())}</div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <p>
        Page 
        {table.getState().pagination.pageIndex + 1} of 
        {table.getPageCount()}
        </p>
        <button onClick={table.previousPage} disabled={!table.getCanPreviousPage()}><ChevronLeftIcon width={20}/></button>
        <button onClick={table.nextPage} disabled={!table.getCanNextPage()}><ChevronRightIcon width={20}/></button>
      </div>
      
    </div>
  );
};

export default EmployeeTable;