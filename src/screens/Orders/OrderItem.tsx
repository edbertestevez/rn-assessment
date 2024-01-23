import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';

import { Order } from '../../types/Order';

interface IOrderItem {
  item: Order;
}

const OrderItem = ({
  item: { customerId, orderId, status },
}: IOrderItem): React.JSX.Element => {
  return (
    <Card activeOpacity={0.6}>
      <Body>
        <OrderIcon>
          <OrderId>{`# ${orderId}`}</OrderId>
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

const OrderId = styled(Text)`
  ${({ theme }) => `
    color:${theme.color.labelInvert};
    font-size: ${theme.fontSize.medium};
  `}
`;

const Details = styled(View)`
  gap: 4px;
`;

export default OrderItem;
