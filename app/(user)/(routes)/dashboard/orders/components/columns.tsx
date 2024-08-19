import { format } from 'date-fns';
import { createColumnHelper } from '@tanstack/react-table';

import { cn } from '@/utils/cn';
import { OrderItem } from '@/utils/types';
import { ProductImages } from '@/components/ui/product-images';

export const Columns = () => {
  const columnHelper = createColumnHelper<OrderItem>();

  const columns = [
    columnHelper.accessor('product.title', {
      id: 'product',
      header: 'Product',
      cell: (info: any) => <ProductColumn info={info} />,
    }),
    columnHelper.accessor('order.createdAt', {
      id: 'date',
      header: 'Purchase Date',
      cell: (info: any) => <Date info={info} />,
    }),
    columnHelper.accessor(
      (row) => `${row.order.firstName} ${row.order.lastName}`,
      {
        id: 'customer',
        header: 'Customer',
        cell: (info: any) => <Customer info={info} />,
      }
    ),
    columnHelper.accessor('order.isPaid', {
      id: 'status',
      header: 'Status',
      cell: (info: any) => <Status info={info} />,
    }),
    columnHelper.accessor('product.price', {
      id: 'price',
      header: 'Price',
      cell: (info: any) => <Price info={info} />,
    }),
  ];

  return columns;
};

const ProductColumn = ({ info }: { info: any }) => (
  <div className="max-w-[30vw] flex items-center gap-4 overflow-hidden p-2 max-xl:hidden">
    <ProductImages
      sold={false}
      url={info.row.original.product.images[0].url}
      className="w-14 shrink-0"
    />
    <h1 className="overflow-hidden overflow-ellipsis whitespace-nowrap">
      {info.getValue()}
    </h1>
  </div>
);

const Date = ({ info }: { info: any }) => (
  <div className="p-2 lg:p-3 max-xl:hidden">
    <h1 className="text-md text-gray-500 overflow-hidden overflow-ellipsis whitespace-nowrap">
      {format(info.getValue(), 'dd MMM, h:mma')}
    </h1>
  </div>
);

const Status = ({ info }: { info: any }) => (
  <div className="flex items-center gap-2 p-2 lg:p-3">
    <div
      className={cn(
        'w-2 h-2 rounded-full',
        info.getValue() ? 'bg-green-600' : 'bg-red-600'
      )}
    />
    <span className="text-gray-500 font-medium">
      {info.getValue() ? 'Paid' : 'Canceled'}
    </span>
  </div>
);

const Customer = ({ info }: { info: any }) => (
  <div className="p-2 lg:p-3">
    <h1 className="text-md text-gray-500 overflow-hidden overflow-ellipsis whitespace-nowrap">
      {info.getValue()}
    </h1>
  </div>
);

const Price = ({ info }: { info: any }) => (
  <div className="flex gap-2 p-2 lg:p-3">
    <span className="font-semibold">$</span>
    <h1 className="text-gray-700 text-md font-semibold overflow-hidden overflow-ellipsis whitespace-nowrap">
      {info.getValue()}
    </h1>
  </div>
);
