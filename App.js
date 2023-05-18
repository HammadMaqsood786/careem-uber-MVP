import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigator from './config/navigation';
// import { Provider } from 'react-redux';
// import store from './store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { store, persistor } from './store';
// import { PersistGate } from 'redux-persist/integration/react';

export default function App() {
  return (

    <SafeAreaProvider >
      {/* <Provider store={store} > */}
      {/* <PersistGate loading={null} persistor={persistor} > */}
      <View style={styles.container}>
        <Navigator />
        <StatusBar
          style='auto'
          backgroundColor="grey"
        />
      </View>
      {/* </PersistGate> */}
      {/* </Provider> */}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },

});
