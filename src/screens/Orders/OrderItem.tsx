import React, { useCallback, useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';

import { TestIds } from '../../testUtils';
import {
  OrderId,
  OrderStatus,
  OrderWithCustomerInfo,
  CustomerId,
} from '../../types';

interface OrderItemProps {
  item: OrderWithCustomerInfo;
  handleItemPress: (orderId: OrderId, customerId: CustomerId) => void;
}

const OrderItem = ({
  item: { orderId, customerName, customerId, status },
  handleItemPress,
}: OrderItemProps): React.JSX.Element => {
  const onPress = useCallback(() => {
    handleItemPress(orderId, customerId);
  }, [handleItemPress, orderId, customerId]);

  const isOpen = useMemo(() => status === OrderStatus.OPEN, [status]);

  return (
    <Card activeOpacity={0.6} onPress={onPress} testID={TestIds.ORDER_ITEMS}>
      <Body>
        <OrderIcon>
          <OrderIdentifier>{`# ${orderId}`}</OrderIdentifier>
        </OrderIcon>
        <Details>
          <Text>{`${customerName} (${customerId})`}</Text>
          <Status isOpen={isOpen}>{status.toUpperCase()}</Status>
        </Details>
      </Body>
    </Card>
  );
};

const Card = styled(TouchableOpacity)`
  background-color: #fff;
  border-radius: 8px;
  margin: 4px 8px;
  padding: 16px;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 4;
`;

const Body = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

const OrderIcon = styled(View)`
  background-color: ${({ theme }) => theme.color.primary};
  width: 50px;
  height: 50px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`;

const OrderIdentifier = styled(Text)`
  ${({ theme }) => `
    color:${theme.color.labelInvert};
    font-size: ${theme.fontSize.medium};
  `}
`;

const Details = styled(View)`
  gap: 4px;
`;

const Status = styled(Text)<{ isOpen: boolean }>`
  color: ${({ isOpen }) => (isOpen ? 'green' : 'red')};
`;

export default OrderItem;
