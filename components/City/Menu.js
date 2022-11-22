import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TextInput, Button } from "react-native";

export default function Menu({ navigation }) {
  const submit = (newCity) => {
    navigation.navigate({
      name: "City",
      params: { city: newCity.nativeEvent.text },
      merge: true,
    });
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}> Recherchez une nouvelle ville </Text>
        <TextInput
          style={styles.input}
          placeholder="Entrez le nom d'une ville"
          onEndEditing={(newCity) => submit(newCity)}
        />
      </View>
      <View style={styles.liste}>
        <Text>Liste ville ici </Text>
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
  title: {
    fontSize: 30,
    marginTop: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  liste: {
    marginTop: 20,
  },
});
