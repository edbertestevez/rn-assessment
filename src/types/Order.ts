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

export type OrderId = number;

export type Order = {
  orderId: OrderId;
  customerId: number;
  items: OrderItem[];
  totalPrice: number;
  taxFree: boolean;
  status: OrderStatus;
  timestamp: string;
};
