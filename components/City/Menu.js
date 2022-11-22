import { Text, View, StyleSheet, TextInput } from "react-native";
import CityOverView from "./CityOverview";
const storageData = require("./storage.json");

export default function Menu({ navigation }) {
  const submit = (newCity) => {
    navigation.navigate({
      name: "City",
      params: { city: newCity.nativeEvent.text },
      merge: true,
    });
  };
  return (
    <View>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Entrez une nouvelle ville"
          onEndEditing={(newCity) => submit(newCity)}
        />
      </View>
      <Text style={styles.divider}> ──────── Saved Cities ────────</Text>
      <View>
        {storageData.cities.map((city) => (
          <CityOverView city={city} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E8AA42",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 2,
    padding: 10,
    borderRadius: 50,
    backgroundColor: "white",
  },
  divider: {
    alignSelf: "center",
    marginTop: 10,
  },
});
