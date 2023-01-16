import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Button,
} from "react-native";
import Constants from "expo-constants";
import axios from "axios";
import CurrentWeather from "./CurrentWeather";
import Forecasts from "./Forecasts";
import * as Location from "expo-location";
import { uniqueId } from "lodash";

// URL pour fetch les données
const API_URL = (lat, lon) =>
  `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=2a8fb0bcdd810f17dd9981361e9e9eb0&lang=fr&units=metric`;

export default function Home({ navigation, route }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    // Demander l'autorisation pour accéder à la localisation
    const getCoordiantes = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }
      const userLocation = await Location.getCurrentPositionAsync();
      getWeather(userLocation);
    };
    getCoordiantes();
    //10800000 = 3 heures
    setInterval(() => getCoordiantes(), 10800000);
  }, []);

  // Réaliser la requête pour avoir les données
  const getWeather = async (location) => {
    try {
      const response = await axios.get(
        API_URL(location.coords.latitude, location.coords.longitude)
      );
      setData(response.data);
      setLoading(false);
    } catch (e) {
      console.log("Erreur dans getWeather" + e);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  if (data) {
    return (
      <SafeAreaView style={styles.container}>
        <CurrentWeather key={data} dataCurrent={data} />
        <Forecasts key={"uniqueKey"} dataForecasts={data} />
        <Button
          title="Go to Menu"
          onPress={() => navigation.navigate("Menu")}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#FFE5B4",
    padding: 8,
  },
});
