import { Table } from '@tanstack/react-table';

import { OrderItem } from '@/utils/types';
import { TableHeader } from './table-header';
import { TableRow } from './table-row';
import { OrderInfo } from './order-info';

interface TableProps {
  table: Table<OrderItem>;
}

export const TableWrapper: React.FC<TableProps> = ({ table }) => (
  <>
    <table className="min-w-full">
      <thead className="bg-gray-100">
        {table.getHeaderGroups().map(({ id, headers }) => (
          <TableHeader key={id} headers={headers} />
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} row={row} />
        ))}
      </tbody>
    </table>
    <OrderInfo />
  </>
);
