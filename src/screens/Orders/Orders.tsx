import React from 'react';
import { FlatList } from 'react-native';

import OrderItem from './OrderItem';
import ScreenView from '../../components/ScreenView';
import { OrderId, OrderWithCustomerInfo } from '../../types/Order';

type OrdersProps = {
  list: OrderWithCustomerInfo[];
  handleItemPress: (orderId: OrderId) => void;
};

const Orders = ({ list, handleItemPress }: OrdersProps): React.JSX.Element => {
  return (
    <ScreenView>
      <FlatList<OrderWithCustomerInfo>
        data={list}
        renderItem={(item) => (
          <OrderItem {...item} handleItemPress={handleItemPress} />
        )}
      />
    </ScreenView>
  );
};

export default Orders;
