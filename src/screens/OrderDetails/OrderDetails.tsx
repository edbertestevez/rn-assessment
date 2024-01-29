import { observer } from 'mobx-react-lite';
import React from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import styled from 'styled-components';

import OrderDetailsItem from './OrderDetailsItem';
import ScreenView from '../../components/ScreenView';
import { formatCurrency } from '../../helpers/currency';
import { TestIds } from '../../testUtils';
import { Customer, Order } from '../../types';

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
              <Label
                isBold
                isLabelInverted
                center
              >{`Order ID: ${orderId}`}</Label>
              <Label
                center
                isLabelInverted
                testID={TestIds.ORDER_DETAILS_STATUS}
              >{`Status: ${status.toUpperCase()}`}</Label>
            </View>

            {isOpen && (
              <Row>
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

                <CloseOrderButton
                  onPress={onCloseOrder}
                  activeOpacity={0.6}
                  testID={TestIds.ORDER_DETAILS_CLOSE_ORDER_BUTTON}
                >
                  <Label isLabelInverted>
                    {isClosing ? 'Processing. . .' : 'Close Order'}
                  </Label>
                </CloseOrderButton>
              </Row>
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
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme, isOpen }) =>
    isOpen ? theme.color.primary : theme.color.secondary};
  gap: 16px;
`;

const Label = styled(Text)<{
  isBold?: boolean;
  isLabelInverted?: boolean;
  center?: boolean;
}>`
  font-size: ${({ theme }) => theme.fontSize.medium};
  font-weight: ${({ isBold }) => (isBold ? 'bold' : 'normal')};
  color: ${({ theme, isLabelInverted }) =>
    isLabelInverted ? theme.color.labelInvert : theme.color.label};
  text-align: ${({ center }) => (center ? 'center' : 'left')};
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

const PrepareOrderButton = styled(TouchableOpacity)<{ disabled?: boolean }>`
  background-color: ${({ theme, disabled }) =>
    disabled ? 'transparent' : theme.color.secondary};
  height: 40px;
  padding: 0px 16px;
  align-items: center;
  justify-content: center;
`;

const CloseOrderButton = styled(PrepareOrderButton)`
  background-color: ${({ disabled }) => (disabled ? 'transparent' : '#ab0505')};
`;

const Row = styled(View)`
  flex-direction: row;
  gap: 16px;
  justify-content: center;
`;

export default observer(OrderDetails);
