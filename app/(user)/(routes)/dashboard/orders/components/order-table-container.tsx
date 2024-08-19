'use client';

import { useTable } from '@/hooks/use-table';
import { SearchInput } from '@/components/search/search';
import { NoOrders } from '@/components/errors-response';
import { Columns } from './columns';
import { TableWrapper } from './table';
import { OrderItem } from '@/utils/types';

interface OrderTableContainerProps {
  orders: OrderItem[];
}

export const OrderTableContainer: React.FC<OrderTableContainerProps> = ({
  orders,
}) => {
  const columns = Columns();
  const table = useTable(orders, columns);

  return (
    <div className="mt-6">
      <div className="w-full rounded-md overflow-hidden">
        <div className="bg-gray-100 p-2 border-b">
          <SearchInput />
        </div>
        {table.getRowModel().rows.length > 0 && <TableWrapper table={table} />}
        {!table.getRowModel().rows.length && <NoOrders />}
      </div>
    </div>
  );
};
