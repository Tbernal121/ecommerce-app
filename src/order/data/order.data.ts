import { OrderStatusEnum } from '../enum/order-status.enum';

export const orderSeedData = [
  {
    id: 'e9c74a41-c1f2-4860-be53-85b3fa03ff35',
    status: OrderStatusEnum.PENDING,
    totalPrice: 0, // This should be the sum of the products' price * quantity in the order. There is a form to auto calculate it when the order is created
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
