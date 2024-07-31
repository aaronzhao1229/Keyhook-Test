import React, { useMemo, useEffect, useState } from 'react';
import { useReactTable, createColumnHelper,  getCoreRowModel, flexRender } from '@tanstack/react-table';

import { apiResponse, Employee } from '../models/employee';
import agent from '../api/agent';

// const fallbackData: Employee[] = [];
const EmployeeTable: React.FC = () => {
  const [data, setData] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    agent.Employees.getEmployees().then((employeesData) => {
      const employees  = employeesData.data.map((employee : apiResponse) => {
        return employee.attributes
      })
      setData(employees);
      setLoading(false);
    }).catch((error) => {
      setError(error.message);
    })
  }, []);
  console.log(data)

  // use columnHelper to define columns
  // const columnHelper = createColumnHelper<Employee>();
  
  //  const columns = useMemo(
  //   () => [
  //     columnHelper.accessor('first_name', {
  //       cell: (info) => info.getValue(),
  //       header: () => 'First Name',
  //       size: 20,
  //     }),
  //     columnHelper.accessor('last_name', {
  //       cell: (info) => info.getValue(),
  //       header: () => 'Last Name'
  //     }),
  //     columnHelper.accessor('age', {
  //       cell: (info) => info.getValue(),
  //       header: () => 'Age'
  //     }),
  //     columnHelper.accessor('position', {
  //       cell: (info) => info.getValue(),
  //       header: () => 'Position'
  //     }),
  //     columnHelper.accessor('department_name', {
  //       cell: (info) => info.getValue(),
  //       header: () => 'Department'
  //     }),
  //   ],
  //   [columnHelper]
  // );

   //  const columns = useMemo(
  //   () => [
  //     columnHelper.accessor('first_name', {
  //       cell: (info) => info.getValue(),
  //       header: () => 'First Name',
  //       size: 20,
  //     }),
  //     columnHelper.accessor('last_name', {
  //       cell: (info) => info.getValue(),
  //       header: () => 'Last Name'
  //     }),
  //     columnHelper.accessor('age', {
  //       cell: (info) => info.getValue(),
  //       header: () => 'Age'
  //     }),
  //     columnHelper.accessor('position', {
  //       cell: (info) => info.getValue(),
  //       header: () => 'Position'
  //     }),
  //     columnHelper.accessor('department_name', {
  //       cell: (info) => info.getValue(),
  //       header: () => 'Department'
  //     }),
  //   ],
  //   [columnHelper]
  // );
  
  //  const columns = useMemo(
  //   () => [
  //     columnHelper.accessor('first_name', {
  //       cell: (info) => info.getValue(),
  //       header: () => 'First Name',
  //       size: 20,
  //     }),
  //     columnHelper.accessor('last_name', {
  //       cell: (info) => info.getValue(),
  //       header: () => 'Last Name'
  //     }),
  //     columnHelper.accessor('age', {
  //       cell: (info) => info.getValue(),
  //       header: () => 'Age'
  //     }),
  //     columnHelper.accessor('position', {
  //       cell: (info) => info.getValue(),
  //       header: () => 'Position'
  //     }),
  //     columnHelper.accessor('department_name', {
  //       cell: (info) => info.getValue(),
  //       header: () => 'Department'
  //     }),
  //   ],
  //   [columnHelper]
  // );

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
      },
    ],
    []
  );
  
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),

     })

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  console.log(table.getHeaderGroups())
  return (
    <div className="p-4">
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