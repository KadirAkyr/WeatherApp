import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

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
  }, [dataForecasts]);

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
