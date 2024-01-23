import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

import NavigationWrapper from './navigation/NavigationWrapper';

const App = (): React.JSX.Element => {
  return (
    <SafeAreaView>
      <View style={styles.body}>
        <NavigationWrapper />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    display: 'flex',
    height: '100%',
  },
});

export default App;
