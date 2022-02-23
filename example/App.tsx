/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import InAppNotification from 'react-native-in-app-notification';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <InAppNotification>
      <SafeAreaView style={[styles.container, backgroundStyle]}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      </SafeAreaView>
    </InAppNotification>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
