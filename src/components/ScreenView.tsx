import { View } from 'react-native';
import styled from 'styled-components';

const ScreenView = styled(View)`
  background-color: ${({ theme }) => theme.color.mainBg};
  height: 100%;
`;

export default ScreenView;
