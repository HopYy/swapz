import { useEffect } from 'react';

import { ModalOrderItem } from '@/components/modals/modal-order-product';
import { useToggleModal } from '@/hooks/use-toggle-modal';
import { useOrder } from '@/hooks/use-get-order';

export const OrderInfo = () => {
  const isOpen = useToggleModal((state) => state.isOpen);
  const open = useToggleModal((state) => state.open);
  const close = useToggleModal((state) => state.close);
  const order = useOrder((state) => state.order);
  const setOrder = useOrder((state) => state.setOrder);

  useEffect(() => {
    if (order) {
      open();
    } else {
      close();
    }
  }, [order, close, open]);

  useEffect(() => {
    if (!isOpen) {
      setOrder(undefined);
    }
  }, [isOpen, setOrder]);

  if (!isOpen && !order) {
    return null;
  }

  if (order && isOpen) {
    return <ModalOrderItem orderItem={order} />;
  }
};
