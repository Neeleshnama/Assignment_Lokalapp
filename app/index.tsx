import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from '../components/navaigation/AppNavigator';
export default function Page() {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        {/* <Text style={styles.title}>Hello Anurag</Text>
        <Text style={styles.subtitle}>This is the first page of your app.</Text> */}
        {/* <NavigationContainer> */}
      <AppNavigator />
    {/* </NavigationContainer> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 44,
    
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 1900,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
