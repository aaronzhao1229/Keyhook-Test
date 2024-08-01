
import { ColumnFiltersState } from '@tanstack/react-table';
interface Props {
  columnFilters: ColumnFiltersState,
  setColumnFilters: (columnFilters: ColumnFiltersState) => void
}


export const Filter = ({columnFilters, setColumnFilters}: Props) => {
  const firstName = columnFilters.value
  // const firstName = columnFilters.find(column => column.id === 'first_name');
  // const onFilterChange = (id, value) => setColumnFilters(prev => {prev.filter(f => f.id !== id).concat({ id, value })});
  const onFilterChange = (id, value) => setColumnFilters({id, value});
  return <input
        type="text"
        id='name'
        // value={globalFilter || ''}
        // value={firstName || ''}
        onChange={e => onFilterChange('first_name', e.target.value)}
        placeholder="Search..."
        className="mb-4 p-2 border rounded w-full"
        />
}