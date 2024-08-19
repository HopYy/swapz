import Link from 'next/link';
import { PencilLine } from 'lucide-react';

import { Button } from '@/components/ui/button-component';

interface EditProductProps {
  id: string;
}

export const EditProduct: React.FC<EditProductProps> = ({ id }) => (
  <Link href={`/edit/${id}`} className="w-full">
    <Button className="flex justify-center items-center gap-2">
      <PencilLine size={20} color="white" />
      <span className="text-white text-sm font-semibold tracking-wide">
        Edit product
      </span>
    </Button>
  </Link>
);
