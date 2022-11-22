import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TextInput, Button } from "react-native";
import axios from "axios";
import Constants from "expo-constants";

import CurrentWeather from "../Home/CurrentWeather";
import Forecasts from "../Home/Forecasts";

// URL pour fetch les données
const API_URL = (city) =>
  `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=2a8fb0bcdd810f17dd9981361e9e9eb0&lang=fr&units=metric`;

export default function CityWeather({ navigation, route }) {
  const [data, setData] = useState(null);

  const getWeather = async () => {
    try {
      const response = await axios.get(API_URL(route.params?.city));
      setData(response.data);
    } catch (e) {
      console.log("Erreur dans getWeather" + e);
    }
  };

  useState(() => {
    getWeather();
  }, []);
  if (data) {
    return (
      <View style={styles.container}>
        <Text>Data from Menu : {route.params?.city}</Text>
        <CurrentWeather data={data} />
        <Forecasts data={data} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFE5B4",
    // paddingTop: Constants.statusBarHeight,
    padding: 8,
  },
});
