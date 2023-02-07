import React, { useEffect, useState } from "react";
const storageData = require("./storage.json");
import { View, StyleSheet, Text, SafeAreaView, Alert } from "react-native";
import axios from "axios";

import CurrentWeather from "../Home/CurrentWeather";
import Forecasts from "../Home/Forecasts";

// URL pour fetch les données
const API_URL = (city) =>
  `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=2a8fb0bcdd810f17dd9981361e9e9eb0&lang=fr&units=metric`;

export default function CityWeather({ route }) {
  const [data, setData] = useState(null);
  const [erreur, setErreur] = useState(false);

  const getWeather = async () => {
    try {
      const response = await axios.get(API_URL(route.params?.city));
      setData(response.data);
      // Si storage data contient pas la ville écit on l'ajoute au tableau sinon on ne fait rien.
      if (!storageData.cities.includes(route.params?.city)) {
        createTwoButtonAlert(route.params?.city);
      }
    } catch (e) {
      console.log("Erreur dans getWeather" + e);
      setErreur(true);
    }
  };

  const createTwoButtonAlert = () =>
    Alert.alert(
      "Nouvelle ville",
      "Ajouter la nouvelle ville dans votre liste de ville favoris ?",
      [
        {
          text: "Non",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Oui",
          onPress: () => {
            storageData.cities.push(route.params?.city);
            console.log("City ajoutée " + route.params?.city);
          },
        },
      ]
    );

  useEffect(() => {
    getWeather();
  }, []);
  if (data) {
    return (
      <View style={styles.container}>
        <CurrentWeather dataCurrent={data} />
        <Forecasts key={data} dataForecasts={data} />
      </View>
    );
  }
  if (erreur) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Ville introuvable ! </Text>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFE5B4",
    padding: 8,
  },
  text: {
    fontSize: 26,
    fontWeight: "500",
    color: "#130D33",
  },
});
