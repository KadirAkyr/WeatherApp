import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";

export default function Menu() {
  const [city, setCity] = useState(null);

  //   useEffect(() => {
  //     console.log(city);
  //   }, [city]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Recherchez une nouvelle ville </Text>
      <TextInput
        style={styles.input}
        placeholder="Entrez le nom d'une ville"
        value={city}
        onEndEditing={setCity}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E8AA42",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
