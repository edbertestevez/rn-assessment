import React from 'react';
import { FlatList } from 'react-native';

import OrderItem from './OrderItem';
import ScreenView from '../../components/ScreenView';
import { Order, OrderId } from '../../types/Order';

type OrdersProps = {
  data: Order[];
  handleItemPress: (orderId: OrderId) => void;
};

const Orders = ({ data, handleItemPress }: OrdersProps): React.JSX.Element => {
  return (
    <ScreenView>
      <FlatList<Order>
        data={data}
        renderItem={(item) => (
          <OrderItem {...item} handleItemPress={handleItemPress} />
        )}
      />
    </ScreenView>
  );
};

export default Orders;
