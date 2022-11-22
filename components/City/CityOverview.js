import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TextInput, Button } from "react-native";
import { Card } from "react-native-paper";

export default function CityOverView({ navigation, city }) {
  const submit = () => {
    console.log(city);
    navigation.navigate({
      name: "City",
      params: { city: city },
      merge: true,
    });
  };
  return (
    <Card onPress={() => submit()} style={styles.card}>
      <Card.Title title={city} style={styles.city} />
      <Card.Cover
        style={styles.cover}
        source={{
          uri: `https://source.unsplash.com/random/350x200/?${city}`,
        }}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 15,
  },
  city: {
    position: "absolute",
    zIndex: 1,
    top: 0,
    left: 10,
  },
  cover: {
    alignSelf: "center",
    width: 350,
    height: 150,
    borderWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});
