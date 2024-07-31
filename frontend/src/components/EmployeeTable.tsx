import React, { useMemo, useEffect, useState } from 'react';
// import { useTable, useSortBy, usePagination } from '@tanstack/react-table';

import { Employee } from '../models/employee';
import agent from '../api/agent';


const EmployeeTable: React.FC = () => {
  const [data, setData] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // axios.get<Employee[]>('http://localhost:4567/api/v1/employees')
    //   .then(response => {
    //     setData(response.data);
    //     setLoading(false);
    //   })
    //   .catch(error => {
    //     setError(error.message);
    //     setLoading(false);
    //   });
    agent.Employees.getEmployees().then((employees) => {
      setData(employees);
      setLoading(false);
    }).catch((error) => {
      setError(error.message);
    })
  }, []);
  console.log(data)
  const columns = useMemo(
    () => [
      {
        Header: 'First Name',
        accessor: 'first_name',
      },
      {
        Header: 'Last Name',
        accessor: 'last_name',
      },
      {
        Header: 'Age',
        accessor: 'age',
      },
      {
        Header: 'Position',
        accessor: 'position',
      },
      {
        Header: 'Department Name',
        accessor: 'department_name',
      },
    ],
    []
  );

  // const {
  //   getTableProps,
  //   getTableBodyProps,
  //   headerGroups,
  //   page,
  //   nextPage,
  //   previousPage,
  //   canNextPage,
  //   canPreviousPage,
  //   prepareRow,
  // } = useTable(
  //   {
  //     columns,
  //     data,
  //     initialState: { pageIndex: 0, pageSize: 10 }, // Set initial page size
  //   },
  //   useSortBy,
  //   usePagination
  // );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4">

      {/* <table {...getTableProps()} className="min-w-full bg-white">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="px-4 py-2 text-left bg-gray-100"
                >
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} className="px-4 py-2 border-t">
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
      </div> */}
    </div>
  );
};

export default EmployeeTable;