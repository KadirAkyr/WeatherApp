import { Text, View, StyleSheet, TextInput, ScrollView } from "react-native";
import CityOverView from "./CityOverview";
const storageData = require("./storage.json");
import React from "react";

export default function Menu({ navigation }) {
  const [text, onChangeText] = React.useState("Useless Text");

  const submit = () => {
    //Enlever les espaces avant et après le mot et tout mettre en minuscule
    const city = text.trim().toLocaleLowerCase();
    try {
      navigation.navigate({
        name: "City",
        params: { city: city },
        merge: true,
      });
    } catch (e) {
      console.log("Erreur dans Menu.js " + e);
    }
  };
  return (
    <View>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Entrez une nouvelle ville"
          value={text}
          onChangeText={onChangeText}
          clearTextOnFocus={true}
          onEndEditing={() => submit()}
        />
      </View>
      <Text style={styles.divider}> ───── Saved Cities ─────</Text>
      <ScrollView>
        {storageData.cities.map((city) => (
          <CityOverView key={city} city={city} navigation={navigation} />
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
    fontSize: 20,
  },
});
