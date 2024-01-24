import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components';

import { TestIds } from '../../testUtils';
import { OrderItem } from '../../types/Order';
import { formatCurrency } from '../../utils/currency';

interface OrderDetailsItemProp extends OrderItem {}

const OrderDetailsItem = ({
  itemId,
  itemName,
  quantity,
  price,
}: OrderDetailsItemProp): React.JSX.Element => {
  return (
    <ItemCard testID={TestIds.ORDER_DETAILS_ITEMS}>
      <ItemName>{`${itemName} (${itemId})`}</ItemName>
      <QuantityPrice>
        <Text>{`${quantity}x`}</Text>
        <Text>{formatCurrency(price)}</Text>
      </QuantityPrice>
    </ItemCard>
  );
};

const ItemName = styled(Text)`
  font-size: ${({ theme }) => theme.fontSize.medium};
  color: ${({ theme }) => theme.color.label};
`;
const ItemCard = styled(View)`
  background-color: #fff;
  border-radius: 8px;
  padding: 8px 0px;
  border-bottom-color: #efefef;
  border-bottom-width: 2px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const QuantityPrice = styled(View)`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  text-align: right;
`;

export default OrderDetailsItem;
