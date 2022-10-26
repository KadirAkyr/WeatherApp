import { isSameDay } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

const getIcon = (icon) => `http://openweathermap.org/img/wn/${icon}@2x.png`

export default function CurrentWeather({data}) {

const [currentWeather, setCurrentWeather] = useState(null)

useEffect(() => {
    const currentW = data.list.filter(forecast => {
        const today = new Date().getTime() + Math.abs(data.city.timezone * 1000)
        const forecastDate = new Date(forecast.dt * 1000)
        return isSameDay(today, forecastDate)
    } )
    setCurrentWeather(currentW[0])

}, [data])
    return(
        <>
            <Text style={styles.city}>{data?.city?.name}</Text>
            <Image 
            source={{ 
                uri: getIcon(currentWeather?.weather[0].icon),
            }}
            style= {styles.img}
            />
            <Text style={styles.temp}>{Math.round(currentWeather?.main.temp)} °C</Text>
            <Text style={styles.desc}>{currentWeather?.weather[0].description}</Text>
        </>
    )
}

const styles = StyleSheet.create({
    city: {
    },
temp: {

},
desc: {

},
img:{
    width: 150,
    height: 150
}
})