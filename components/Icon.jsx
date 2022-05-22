import React from 'react';
import LottieView from 'lottie-react-native';

const getIcon = (icon, height) => {
    icon = icon?.replace(/-/g, "_").toUpperCase()

    if (icon === "SNOW"){ 
      return (<LottieView source={require("../assets/icons/snow.json")} autoPlay loop style={{ height: height, alignSelf: "center" }} />)}
     else if (icon === "CLEAR_DAY"){
      return (<LottieView source={require("../assets/icons/sunny.json")} autoPlay loop style={{ height: height, alignSelf: "center" }} />)}
     else if (icon === "CLEAR_NIGHT"){
      return (<LottieView source={require("../assets/icons/night.json")} autoPlay loop style={{ height: height, alignSelf: "center" }} />)}
     else if (icon === "PARTLY_CLOUDY_DAY"){
      return (<LottieView source={require("../assets/icons/partly-cloudy-day.json")} autoPlay loop style={{ height: height, alignSelf: "center" }} />)}
     else if (icon === "PARTLY_CLOUDY_NIGHT"){
      return (<LottieView source={require("../assets/icons/partly-cloudy-night.json")} autoPlay loop style={{ height: height, alignSelf: "center" }} />)}
    else if (icon === "CLOUDY"){
      return (<LottieView source={require("../assets/icons/cloudy.json")} autoPlay loop style={{ height: height, alignSelf: "center" }} />)}
    else if (icon === "RAIN"){
      return (<LottieView source={require("../assets/icons/light-rain.json")} autoPlay loop style={{ height: height, alignSelf: "center" }} />)}
    else if (icon === "SLEET"){
      return (<LottieView source={require("../assets/icons/sleet.json")} autoPlay loop style={{ height: height, alignSelf: "center" }} />)}
    else if (icon === "SNOW"){
      return (<LottieView source={require("../assets/icons/snow.json")} autoPlay loop style={{ height: height, alignSelf: "center" }} />)}
    else if (icon === "WIND"){
      return (<LottieView source={require("../assets/icons/windy.json")} autoPlay loop style={{ height: height, alignSelf: "center" }} />)}
    else if (icon === "FOG"){
      return (<LottieView source={require("../assets/icons/fog.json")} autoPlay loop style={{ height: height, alignSelf: "center" }} />)}
    else if (icon === "THUNDER"){
      return (<LottieView source={require("../assets/icons/thunder-only.json")} autoPlay loop style={{ height: height, alignSelf: "center" }} />)}
    else if (icon === "RAIN-SNOW-SHOWERS-NIGHT"){
      return (<LottieView source={require("../assets/icons/night-snow.json")} autoPlay loop style={{ height: height, alignSelf: "center" }} />)}
    else if (icon === "RAIN-SNOW-SHOWERS-DAY"){
      return (<LottieView source={require("../assets/icons/snow-day.json")} autoPlay loop style={{ height: height, alignSelf: "center" }} />)}
    else if (icon === "RAIN-SNOW"){
      return (<LottieView source={require("../assets/icons/snow.json")} autoPlay loop style={{ height: height, alignSelf: "center" }} />)}
    else if (icon === "SHOWERS-DAY"){
      return (<LottieView source={require("../assets/icons/day-rain.json")} autoPlay loop style={{ height: height, alignSelf: "center" }} />)}
    else if (icon === "SHOWERS-NIGHT"){
      return (<LottieView source={require("../assets/icons/night-rain.json")} autoPlay loop style={{ height: height, alignSelf: "center" }} />)}
    else if (icon === "SNOW-SHOWERS-NIGHT"){
      return (<LottieView source={require("../assets/icons/night-snow.json")} autoPlay loop style={{ height: height, alignSelf: "center" }} />)}
    else if (icon === "SNOW-SHOWERS-DAY"){
      return (<LottieView source={require("../assets/icons/snow-day.json")} autoPlay loop style={{ height: height, alignSelf: "center" }} />)}
    else if (icon === "THUNDER-RAIN"){
      return (<LottieView source={require("../assets/icons/thunder.json")} autoPlay loop style={{ height: height, alignSelf: "center" }} />)}
    else if (icon === "THUNDER-SHOWERS-DAY"){
      return (<LottieView source={require("../assets/icons/thunder.json")} autoPlay loop style={{ height: height, alignSelf: "center" }} />)}
    else if (icon === "THUNDER-SHOWERS-NIGHT"){
      return (<LottieView source={require("../assets/icons/thunder.json")} autoPlay loop style={{ height: height, alignSelf: "center" }} />)}
 }

 export default getIcon