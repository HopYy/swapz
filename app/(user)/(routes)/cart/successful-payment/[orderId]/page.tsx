import { Check, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function successfulPayment() {
  return (
    <div className="flex-1 pt-3">
      <div className="max-w-[1280px] h-screen mx-auto flex flex-col justify-center items-center">
        <div className="p-2 border-2 border-green-700 rounded-full w-fit">
          <Check color="green" />
        </div>
        <h1 className="text-xl font-semibold text-center">
          Payment successful
        </h1>
        <p className="text-sm text-gray-500 text-center">
          Congratulations! Your order has been successfully processed. Thank you
          for choosing Swapz for your purchase. We appreciate your business.
          <br />
          Thank you again for shopping with us. We hope you enjoy your new
          products!
        </p>
        <Link href="/" className="flex items-center gap-2 my-4">
          <span className="text-md">Continue</span>
          <ChevronRight size={20} />
        </Link>
      </div>
    </div>
  );
}
