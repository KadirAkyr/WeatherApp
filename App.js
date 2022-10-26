import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import axios from 'axios';
import CurrentWeather from './components/CurrentWeather';

const API_URL = (lat, lon) =>
  `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=2a8fb0bcdd810f17dd9981361e9e9eb0&lang=fr&units=metric`;

export default function App() {
  // useState pour stocker la localisation et en l'initialisant à null
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  // useEffect permet de lancer la fonction codée dans les {}, à chaque fois que les variables dans les [] changent.
  // s'il n y a rien dans [] useState se lance une fois au démarrage de l'application.
  useEffect(() => {
    // Demander l'autorisation pour accéder à la localisation du téléphone
    const getCoordiantes = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }
      const userLocation = await Location.getCurrentPositionAsync();
      getWeather(userLocation);
    };
    getCoordiantes();
  }, []);

  // Réaliser la requête pour avoir les données
  const getWeather = async (location) => {
    try {
      const response = await axios.get(
        API_URL(location.coords.latitude, location.coords.longitude)
      );
      setData(response.data)
      setLoading(false)

    } catch (e) {
      console.log("Erreur dans getWeather" + e);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CurrentWeather data={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#303030',
    padding: 8,
  },
});
