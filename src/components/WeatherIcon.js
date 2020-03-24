import React, { Component } from "react";

import WeatherIcon1 from "react-native-vector-icons/Feather";
import WeatherIcon2 from "react-native-vector-icons/MaterialCommunityIcons";

import { WEATHER_ICON_STYLE_1 } from "../utils/const";

export class WeatherIcon extends Component {
  weatherIconMap1 = {
    "01d": "sun", // clear
    "01n": "moon",
    "02d": "cloud", // partly cloudy
    "02n": "cloud",
    "03d": "cloud", // scattered clouds
    "03n": "cloud",
    "04d": "cloud", // broken clouds
    "04n": "cloud",
    "09d": "cloud-rain", // showers
    "09n": "cloud-rain",
    "10d": "cloud-rain", // rain
    "10n": "cloud-rain",
    "11d": "cloud-lightning", // thunderstorm
    "11n": "cloud-lightning",
    "13d": "cloud-snow", // snow
    "13n": "cloud-snow",
    "50d": "cloud-drizzle", // mist/rain
    "50n": "cloud-drizzle"
  };

  weatherIconMap2 = {
    "01d": "weather-sunny", // clear
    "01n": "weather-night",
    "02d": "weather-partlycloudy", // partly cloudy
    "02n": "weather-partlycloudy",
    "03d": "weather-cloudy", // scattered clouds
    "03n": "weather-cloudy",
    "04d": "weather-cloudy", // broken clouds
    "04n": "weather-cloudy",
    "09d": "weather-rainy", // showers
    "09n": "weather-rainy",
    "10d": "weather-pouring", // rain
    "10n": "weather-pouring",
    "11d": "weather-lightning", // thunderstorm
    "11n": "weather-lightning",
    "13d": "weather-snowy", // snow
    "13n": "weather-snowy",
    "50d": "weather-fog", // mist/rain
    "50n": "weather-fog"
  };

  render() {
    const {
      props: { name, color, size, type },
      weatherIconMap1,
      weatherIconMap2
    } = this;

    return type == WEATHER_ICON_STYLE_1 ? (
      <WeatherIcon1 name={weatherIconMap1[name]} color={color} size={size} />
    ) : (
      <WeatherIcon2 name={weatherIconMap2[name]} color={color} size={size} />
    );
  }
}
