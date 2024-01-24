import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import styled from 'styled-components';

import OrderDetailsItem from './OrderDetailsItem';
import ScreenView from '../../components/ScreenView';
import TestIds from '../../testUtils/testIds';
import { Customer } from '../../types/Customer';
import { Order } from '../../types/Order';
import { formatCurrency } from '../../utils/currency';

interface OrderDetailsProps {
  order: Order;
  customer: Customer;
}

const OrderDetails = ({
  order: { orderId, totalPrice, taxFree, status, timestamp, items },
  customer: { customerId, customerName, email, phone, address },
}: OrderDetailsProps): React.JSX.Element => {
  return (
    <ScreenView>
      <Body>
        <View>
          <HeaderCard>
            <Label isBold isLabelInverted>{`Order ID: ${orderId}`}</Label>
            <Label isLabelInverted>{`Status: ${status.toUpperCase()}`}</Label>
          </HeaderCard>
          <Card>
            <Label isBold>Customer Details</Label>
            <Label testID={TestIds.CUSTOMER_ID}>{`ID: ${customerId}`}</Label>
            <Label
              testID={TestIds.CUSTOMER_NAME}
            >{`Name: ${customerName}`}</Label>
            <Label
              testID={TestIds.CUSTOMER_ADDRESS}
            >{`Address: ${address}`}</Label>
            <Label testID={TestIds.CUSTOMER_EMAIL}>{`Email: ${email}`}</Label>
            <Label testID={TestIds.CUSTOMER_PHONE}>{`Phone: ${phone}`}</Label>
          </Card>
          <Card>
            {items.map((item) => (
              <OrderDetailsItem key={`${orderId}-${item.itemId}`} {...item} />
            ))}
          </Card>
          <TotalCard>
            <Total>Total Price:</Total>
            <Total testID={TestIds.ORDER_DETAILS_TOTAL_PRICE}>
              {formatCurrency(totalPrice)}
            </Total>
          </TotalCard>
          <Card>
            <Label
              testID={TestIds.ORDER_DETAILS_TAX_FREE}
            >{`Tax Free: ${taxFree ? 'Yes' : 'No'}`}</Label>
            <Label
              testID={TestIds.ORDER_DETAILS_TIMESTAMP}
            >{`Timestamp: ${timestamp}`}</Label>
          </Card>
        </View>
      </Body>
    </ScreenView>
  );
};

const Body = styled(ScrollView)`
  background-color: ${({ theme }) => theme.color.mainBg};
`;

const Card = styled(View)`
  padding: 16px 24px;
  margin-bottom: 8px;
  background-color: #ffffff;
`;

const HeaderCard = styled(Card)`
  background-color: ${({ theme }) => theme.color.primary};
  gap: 12px;
`;

const Label = styled(Text)<{ isBold?: boolean; isLabelInverted?: boolean }>`
  font-size: ${({ theme }) => theme.fontSize.medium};
  font-weight: ${({ isBold }) => (isBold ? 'bold' : 'normal')};
  color: ${({ theme, isLabelInverted }) =>
    isLabelInverted ? theme.color.labelInvert : theme.color.label};
`;

const TotalCard = styled(Card)`
  flex-direction: row;
  justify-content: space-between;
`;

const Total = styled(Text)`
  padding: 8px 0px;
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSize.large};
  color: ${({ theme }) => theme.color.primary};
`;
export default OrderDetails;
