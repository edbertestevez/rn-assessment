import { observer } from 'mobx-react-lite';
import React from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import styled from 'styled-components';

import OrderDetailsItem from './OrderDetailsItem';
import ScreenView from '../../components/ScreenView';
import { TestIds } from '../../testUtils';
import { Customer, Order } from '../../types';
import { formatCurrency } from '../../utils/currency';

interface OrderDetailsProps {
  order: Order;
  customer: Customer;
  onCloseOrder: () => void;
  onPrepareOrder: () => void;
  isClosing: boolean;
  isPreparing: boolean;
  isOpen: boolean;
}

const OrderDetails = ({
  order: { orderId, totalPrice, taxFree, status, timestamp, items },
  customer: { customerId, customerName, email, phone, address },
  onCloseOrder,
  onPrepareOrder,
  isClosing,
  isPreparing,
  isOpen,
}: OrderDetailsProps): React.JSX.Element => {
  return (
    <ScreenView>
      <Body>
        <View>
          <HeaderCard isOpen={isOpen} testID={TestIds.ORDER_DETAILS_HEADER}>
            <View>
              <Label isBold isLabelInverted>{`Order ID: ${orderId}`}</Label>
              <Label isLabelInverted>{`Status: ${status.toUpperCase()}`}</Label>
            </View>

            {isOpen && (
              <PrepareOrderButton
                testID={TestIds.ORDER_DETAILS_PREPARE_ORDER_BUTTON}
                disabled={isPreparing}
                activeOpacity={0.6}
                onPress={onPrepareOrder}
              >
                <Label
                  testID={TestIds.ORDER_DETAILS_PREPARE_ORDER_BUTTON_LABEL}
                  isLabelInverted
                >{`${isPreparing ? 'Preparing...' : 'Prepare Order'}`}</Label>
              </PrepareOrderButton>
            )}
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

        {isOpen && (
          <CloseOrderButton
            onPress={onCloseOrder}
            activeOpacity={0.6}
            testID={TestIds.ORDER_DETAILS_CLOSE_ORDER_BUTTON}
          >
            <Label isBold isLabelInverted>
              {isClosing ? 'Processing. . .' : 'Close Order'}
            </Label>
          </CloseOrderButton>
        )}
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

const HeaderCard = styled(Card)<{ isOpen: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${({ theme, isOpen }) =>
    isOpen ? theme.color.primary : theme.color.secondary};
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

const CloseOrderButton = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.color.secondary};
  margin: 16px 24px;
  height: 54px;
  align-items: center;
  justify-content: center;
`;

const PrepareOrderButton = styled(TouchableOpacity)<{ disabled: boolean }>`
  background-color: ${({ theme, disabled }) =>
    disabled ? 'transparent' : theme.color.secondary};
  height: 40px;
  padding: 0px 16px;
  align-items: center;
  justify-content: center;
`;

export default observer(OrderDetails);
