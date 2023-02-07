import { Text, View, StyleSheet, TextInput, ScrollView } from "react-native";
import CityOverView from "./CityOverview";
const storageData = require("./storage.json");
import React from "react";

export default function Menu({ navigation }) {
  const [text, onChangeText] = React.useState("Entrez une nouvelle ville");

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
  if (storageData.cities.length > 0) {
    return (
      <View>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
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
  } else {
    return (
      <View>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={onChangeText}
            clearTextOnFocus={true}
            onEndEditing={() => submit()}
          />
        </View>
        <View>
          <Text style={styles.text}>Pas de ville dans vos favoris ! </Text>
        </View>
      </View>
    );
  }
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
  text: {
    fontSize: 26,
    fontWeight: "500",
    color: "#130D33",
    alignSelf: "center",
    marginTop: 50,
  },
});
