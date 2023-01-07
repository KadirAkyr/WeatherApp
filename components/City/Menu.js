import { Text, View, StyleSheet, TextInput, ScrollView } from "react-native";
import CityOverView from "./CityOverview";
const storageData = require("./storage.json");

export default function Menu({ navigation }) {
  const submit = (newCity) => {
    // Si storage data contient pas la ville écit on l'ajoute au tableau sinon on ne fait rien.
    if (!storageData.cities.includes(newCity.nativeEvent.text)) {
      storageData.cities.push(newCity.nativeEvent.text);
    }

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
          autoCorrect={false}
          onEndEditing={(newCity) => submit(newCity)}
        />
      </View>
      <Text style={styles.divider}> ──────── Saved Cities ────────</Text>
      <ScrollView>
        {storageData.cities.map((city) => (
          <CityOverView key={city} city={city} />
        ))}
      </ScrollView>
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
