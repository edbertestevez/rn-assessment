export type OrderItem = {
  itemId: number;
  itemName: string;
  quantity: number;
  price: number;
};

export enum OrderStatus {
  OPEN = 'open',
  CLOSE = 'close',
}

export type Order = {
  orderId: number;
  customerId: number;
  items: OrderItem[];
  totalPrice: number;
  taxFree: boolean;
  status: OrderStatus;
  timestamp: string;
};
