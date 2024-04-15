import { Row, flexRender } from "@tanstack/react-table"

import { OrderItem } from "@/utils/types"
import { cn } from "@/utils/cn"
import { useOrder } from "@/hooks/use-get-order"

interface TableRowProps {
    row: Row<OrderItem>
}

export const TableRow: React.FC<TableRowProps> = ({ row }) => {
    const setOrder = useOrder((state) => state.setOrder)

    return (
        <tr 
            key={row.id} 
            className="border-b cursor-pointer w-min" 
            onClick={() => {
                setOrder(row.original)
            }}
        >
            {row.getVisibleCells().map((cell, index) => (
                <td className={cn((index === 0 || index === 1) && "max-xl:hidden")} key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
            ))}
        </tr>
    )
}
