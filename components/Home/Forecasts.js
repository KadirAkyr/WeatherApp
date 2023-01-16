import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import * as Notifications from "expo-notifications";

import Weather from "./Weather";

export default function Forecasts({ dataForecasts }) {
  const [forecasts, setForecasts] = useState([]);
  useEffect(() => {
    const forecastsData = dataForecasts.list.map((f) => {
      const dt = new Date(f.dt * 1000);
      return {
        date: dt,
        hour: dt.getHours(),
        temp: Math.round(f.main.temp),
        icon: f.weather[0].icon,
        name: format(dt, "EEEE", { locale: fr }),
        pressure: Math.round(f.main.pressure),
        windSpeed: f.wind.speed,
      };
    });
    let newForecastsData = forecastsData
      .map((forecast) => {
        return forecast.name;
      })
      .filter((day, index, self) => {
        // return true
        return self.indexOf(day) === index;
      })
      .map((day) => {
        // {day: name, dataForecasts: [forecast, forecast]}
        return {
          day,
          data: forecastsData.filter((forecast) => forecast.name === day),
        };
      });

    setForecasts(newForecastsData);

    const sendAlerte = () => {
      //Initialiser les valeurs
      const pressure = newForecastsData[0].data[0].pressure;
      const windSpeed = newForecastsData[0].data[0].windSpeed;
      const temp = newForecastsData[0].data[0].temp;
      //Faire les comparaisons avec les normes trouvé sur internet
      if (temp >= 40) {
        sendNotificationAlerte("temp", temp);
      }
      if (windSpeed >= 20) {
        sendNotificationAlerte("windSpeed", windSpeed);
      }
      if (pressure <= 1010) {
        sendNotificationAlerte("pressure", pressure);
      }
    };
    sendAlerte();
  }, [dataForecasts]);

  const sendNotificationAlerte = (key, value) => {
    let title;
    let body;
    switch (key) {
      case "temp":
        (title = "Alerte Forte Chaleur"),
          (body = "Attention il fait " + value + "°C" + " aujourd'hui");
        break;
      case "windSpeed":
        (title = "Alerte Vent Violent"),
          (body =
            "Attention des violents coups de vent sont attendus aujourd'hui avec une vitesse de " +
            value +
            "m/s");
        break;
      case "pressure":
        (title = "Alerte Pression Basse"),
          (body =
            "Attention risque de temps mauvais et précipitaions fréquentes");
        break;
      default:
        break;
    }
    Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
      },
      trigger: null,
    });
  };

  // {day: name, data: [forecast, forecast]}
  return (
    <ScrollView
      horizontal
      showsVerticalScrollIndicator={false}
      style={styles.scrollView}
    >
      {forecasts.map((f) => (
        <View>
          <Text style={styles.day}>{f.day.toUpperCase()}</Text>
          <View style={styles.container}>
            {f.data.map((w) => (
              <Weather key={w.id} forecast={w} />
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    width: "100%",
    height: "35%",
  },
  container: {
    flexDirection: "row",
    marginLeft: 5,
    marginRight: 20,
  },
  day: {
    fontSize: 16,
    fontWeight: "bold",
    paddingLeft: 10,
  },
});
