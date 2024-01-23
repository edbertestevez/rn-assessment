import React, { useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';

import { Order, OrderId } from '../../types/Order';

interface IOrderItem {
  item: Order;
  handleItemPress: (orderId: OrderId) => void;
}

const OrderItem = ({
  item: { customerId, orderId, status },
  handleItemPress,
}: IOrderItem): React.JSX.Element => {
  const onPress = useCallback(() => {
    handleItemPress(orderId);
  }, [handleItemPress, orderId]);

  return (
    <Card activeOpacity={0.6} onPress={onPress}>
      <Body>
        <OrderIcon>
          <OrderIdentifier>{`# ${orderId}`}</OrderIdentifier>
        </OrderIcon>
        <Details>
          <Text>{`Customer: ${customerId}`}</Text>
          <Text>{status.toUpperCase()}</Text>
        </Details>
      </Body>
    </Card>
  );
};

const Card = styled(TouchableOpacity)`
  background-color: #fff;
  border-radius: 8px;
  margin: 8px;
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

export default OrderItem;
