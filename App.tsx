import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import { Home } from './src/screens/Home';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Home />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
