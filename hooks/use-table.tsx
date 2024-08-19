'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  ColumnDef,
} from '@tanstack/react-table';

import { OrderItem } from '@/utils/types';

export const useTable = (
  orders: OrderItem[],
  columns: ColumnDef<OrderItem, any>[]
) => {
  const searchParams = useSearchParams();
  const [globalFilter, setGlobalFilter] = useState<string | null>('');

  useEffect(() => {
    setGlobalFilter(searchParams.get('query') || '');
  }, [searchParams]);

  const table = useReactTable({
    columns,
    data: orders,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return table;
};
