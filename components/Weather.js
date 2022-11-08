import React, { useState } from "react";
import { Text, View, StyleSheet, Image } from "react-native";

export default function weather({ forecast }) {
  const getIcon = (icon) => `http://openweathermap.org/img/wn/${icon}@2x.png`;
  return (
    <View style={styles.container}>
      <Text> {forecast.hour}h </Text>
      <Image
        source={{
          uri: getIcon(forecast.icon),
        }}
        style={styles.img}
      />
      <Text style={styles.temp}> {forecast.temp} °C </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E8AA42",
    height: 140,
    width: 70,
    paddingVertical: 6,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    borderRadius: 50,
  },
  img: {
    width: 50,
    height: 50,
  },
  temp: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
