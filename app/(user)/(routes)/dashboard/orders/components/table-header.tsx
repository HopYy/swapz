import { Header, flexRender } from "@tanstack/react-table"

import { cn } from "@/utils/cn"
import { OrderItem } from "@/utils/types"

interface TableHeaderProps {
    headers: Header<OrderItem, unknown>[]
}

export const TableHeader: React.FC<TableHeaderProps> = ({ headers }) => (
    <tr>
        {headers.map((header) => (
            <th 
                key={header.id} 
                className={cn("p-3 text-start", 
                (header.id === "product" || header.id === "date") && "hidden xl:table-cell")}
            >
                {flexRender(header.column.columnDef.header, header.getContext())}
            </th>
        ))}
    </tr>
)