import React from 'react';
import { FlatList, Text } from 'react-native';
import styled from 'styled-components';

import OrderItem from './OrderItem';
import ScreenView from '../../components/ScreenView';
import { CustomerId } from '../../types/Customer';
import { OrderId, OrderWithCustomerInfo } from '../../types/Order';

interface OrdersProps {
  list: OrderWithCustomerInfo[];
  handleItemPress: (orderId: OrderId, customerId: CustomerId) => void;
}

const Orders = ({ list, handleItemPress }: OrdersProps): React.JSX.Element => {
  return (
    <ScreenView>
      <Title>Order Portal</Title>
      <FlatList<OrderWithCustomerInfo>
        data={list}
        renderItem={(item) => (
          <OrderItem {...item} handleItemPress={handleItemPress} />
        )}
      />
    </ScreenView>
  );
};

const Title = styled(Text)`
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSize.title};
  text-align: center;
  margin: 24px;
  color: ${({ theme }) => theme.color.primary};
`;

export default Orders;
