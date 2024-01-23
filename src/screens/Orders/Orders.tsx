import React from 'react';
import { FlatList } from 'react-native';

import OrderItem from './OrderItem';
import ScreenView from '../../components/ScreenView';
import { Order } from '../../types/Order';

type OrdersProps = {
  data: Order[];
};

const Orders = ({ data }: OrdersProps): React.JSX.Element => {
  return (
    <ScreenView>
      <FlatList<Order> data={data} renderItem={OrderItem} />
    </ScreenView>
  );
};

export default Orders;
