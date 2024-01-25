import React from 'react';
import { FlatList, Text, View } from 'react-native';
import styled from 'styled-components';

import OrderItem from './OrderItem';
import ScreenView from '../../components/ScreenView';
import { TestIds } from '../../testUtils';
import { OrderId, OrderWithCustomerInfo, CustomerId } from '../../types';
import { formatCurrency } from '../../helpers';

interface OrdersProps {
  list: OrderWithCustomerInfo[];
  handleItemPress: (orderId: OrderId, customerId: CustomerId) => void;
  totalPendingEarnings: number;
  totalConfirmedEarnings: number;
}

const Orders = ({
  list,
  handleItemPress,
  totalPendingEarnings,
  totalConfirmedEarnings,
}: OrdersProps): React.JSX.Element => {
  return (
    <ScreenView>
      <Title>Order Portal</Title>
      <OverviewContainer>
        <EarningsContainer>
          <Text>Confirmed Earnings</Text>
          <EarningsLabel testID={TestIds.ORDERS_CONFIRMED_EARNINGS}>
            {formatCurrency(totalConfirmedEarnings)}
          </EarningsLabel>
        </EarningsContainer>
        <EarningsContainer>
          <Text>Pending Earnings</Text>
          <EarningsLabel testID={TestIds.ORDERS_PENDING_EARNINGS}>
            {formatCurrency(totalPendingEarnings)}
          </EarningsLabel>
        </EarningsContainer>
      </OverviewContainer>

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

const OverviewContainer = styled(View)`
  display: flex;
  flex-direction: row;
  margin: 0px 8px 8px 8px;
  gap: 16px;
  justify-content: center;
`;

const EarningsContainer = styled(View)`
  flex: 1;
  background: #fff;
  padding: 16px;
  border-radius: 8px;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 4;
`;

const EarningsLabel = styled(Text)`
  font-size: ${({ theme }) => theme.fontSize.large};
  margin-top: 8px;
  font-weight: bold;
  color: ${({ theme }) => theme.color.label};
`;

export default Orders;
