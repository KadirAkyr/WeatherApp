import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

async function test () {
const key = '5fb8cd825541450a8d694345221210'
  return fetch(`http://api.weatherapi.com/v1/current.json?key=${key}&q=London&aqi=nojson`)
  .then((response) => response.json())
  .then((json) => {
    console.log(json)
    return json;
  })
  .catch((error) => {
    console.error(error);
  });
}

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text onPress={test}>Hello!</Text>
      <StatusBar style="auto" />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
});