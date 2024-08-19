import Visa from '@/assets/checkout cards/visa.svg';
import Mastercard from '@/assets/checkout cards/mastercard.svg';
import DinersClub from '@/assets/checkout cards/diners-club.svg';
import UnionPay from '@/assets/checkout cards/unionpay.svg';
import JapanCreditBureau from '@/assets/checkout cards/japan-credit-bureau.svg';
import EftPosAustralia from '@/assets/checkout cards/eftpos-australia.svg';
import AmericanExpress from '@/assets/checkout cards/american-express.svg';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

export const CheckoutCards = () => {
  return (
    <div className="border rounded-lg">
      <ScrollArea className="p-2">
        <div className="flex justify-center items-center gap-4">
          <Visa />
          <Mastercard />
          <AmericanExpress />
          <DinersClub />
          <UnionPay />
          <JapanCreditBureau />
          <EftPosAustralia />
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};
