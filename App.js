import axios from "axios";
import React, { useState, useEffect, createContext } from "react";
import { View, LogBox, StatusBar as Status, RefreshControl, ScrollView, StyleSheet } from "react-native";
import * as Location from 'expo-location';
import * as NavigationBar from 'expo-navigation-bar';

import Daily from "./components/Daily";
import Hourly from "./components/Hourly";
import SunTime from "./components/SunTime";
import Primary from "./components/Primary";
import Other from "./components/Other";
import Current from "./components/Current";
import Overview from "./components/Overview";
import Header from "./components/Header";
import { getAirQualityIndex, getPollen, getWeather } from "./api/API";

LogBox.ignoreAllLogs(true);
LogBox.ignoreLogs(["Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: object. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."])

export const ContextDataAPI = createContext({
  data: [],
  blckColor: "#171717",
  brdrColor: "#5c5b5b",
  blockBorderColor: "#5c5b5b"
})

const App = () => {

  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  const [data, setData] = useState([])
  const [city, setCity] = useState("Niš")
  const [country, setCountry] = useState("Serbia")
  const [updated, setUpdated] = useState(`${days[new Date().getDay()].substring(0, 3)}, ${new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours()}:${new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()}`)
  const [max, setMax] = useState(0)
  const [min, setMin] = useState(0)
  const [feel, setFeel] = useState(0)
  const [currentTemp, setCurrentTemp] = useState(0)
  const [daily, setDaily] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const [lat, setLat] = useState("43.316872")
  const [lon, setLon] = useState("21.894501")
  const [AQI, setAQI] = useState(1)
  const [pollen, setPollen] = useState("Low")

  const [bgColor, setBgColor] = useState("#000")
  const [blckColor, setBlckColor] = useState("#171717")
  const [brdrColor, setBrdrColor] = useState("#5c5b5b")
  const [blockBorderColor, setBlockBorderColor] = useState("#5c5b5b")

  useEffect(() => {

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
         let lat = "43.316872";
         let lon = "21.894501";
        fetchDataFromApi(lat, lon)
    
        return;
      } 

      let location = await Location.getCurrentPositionAsync({});

      setLat(location.coords.latitude)
      setLon(location.coords.longitude)

      fetchDataFromApi(location.coords.latitude, location.coords.longitude);
      getCityName(location.coords.latitude, location.coords.longitude);
    })();
  }, []);

  const fetchDataFromApi = async (lat, lon) => {
    try {    
      
      const { data } = await axios.get(getWeather(lat, lon));
      setData(data)
     
      const pollenData = null;
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      xhr.addEventListener("readystatechange", function () {
	       if (this.readyState === this.DONE) {
           let dataFromAmbeedata = JSON.parse(this.responseText)
		       setPollen(dataFromAmbeedata.data[0].Risk.tree_pollen);
	    }
    });
    
    xhr.open("GET", getPollen(lat, lon));
    xhr.setRequestHeader("x-api-key", "5089924e3cf4aab4143dddcb9d5a9cba4ac9d9a0cd822c18a0808a33113cca0f");
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(pollenData);

      setDaily(data.daily.data)
      setMax(Math.round((data?.daily?.data[0]?.temperatureMax - 32) * (5 / 9)))
      setMin(Math.round((data?.daily?.data[0]?.temperatureMin - 32) * (5 / 9)))
      setFeel(Math.round((data?.currently?.apparentTemperature - 32) * (5 / 9)))
      setCurrentTemp(Math.round((data?.hourly?.data[0]?.temperature - 32) * (5 / 9)))

      getAQI()

      let dawn = new Date(data?.daily?.data[0]?.sunriseTime * 1000).getHours()
      let night = new Date(data?.daily?.data[0]?.sunsetTime * 1000).getHours()
      let now = new Date().getHours()
      
    if (now > dawn && now < night) {  
       setBgColor("#7bb3f3")
       setBlckColor("#8dbbed")
       setBrdrColor("#97c8fc")
       setBlockBorderColor("#97c8fc")
       NavigationBar.setVisibilityAsync("hidden");
    } else  {
       setBgColor("#000")
       setBlckColor("#191919")
       setBrdrColor("#5c5b5b")
       setBlockBorderColor("#000")
       NavigationBar.setVisibilityAsync("hidden");
    }

    } catch (error) {
      console.log(error);
    }
  };

  NavigationBar.addVisibilityListener(({ visibility }) => {
    if (visibility.toLowerCase() === "visible") {
      NavigationBar.setVisibilityAsync("hidden");
    }
  });

  const getAQI = async () => {
    const API_KEY ='49cc8c821cd2aff9af04c9f98c36eb74';
    const { data } = await axios.get(getAirQualityIndex(lat, lon, API_KEY));
    setAQI(data?.list[0]?.main?.aqi)
  }

  const getCityName = async (lat, lon) => {
    let A = new Array([]);
    A["Ё"] = "YO";A["Й"] = "I";A["Ц"] = "TS";A["У"] = "U";A["К"] = "K";A["Е"] = "E";A["Н"] = "N";A["Г"] = "G";A["Ш"] = "Š";A["Щ"] = "SCH";A["З"] = "Z";A["Х"] = "H";A["Ъ"] = "'";A["ё"] = "yo";A["й"] = "i";A["ц"] = "ts";A["у"] = "u";A["к"] = "k";A["е"] = "e"; A["н"] = "n";A["г"] = "g";A["ш"] = "š"; A["щ"] = "sch";A["з"] = "z";A["х"] = "h";A["ъ"] = "'";A["Ф"] = "F";A["Ы"] = "I";A["В"] = "V";A["А"] = "A";A["П"] = "P";A["Р"] = "R";A["О"] = "O";A["Л"] = "L";A["Д"] = "D";A["Ж"] = "ZH";A["Э"] = "E";A["ф"] = "f";A["ы"] = "i";A["в"] = "v";A["а"] = "a";A["п"] = "p";A["р"] = "r";A["о"] = "o";A["л"] = "l";A["д"] = "d";A["ж"] = "zh";A["э"] = "e";A["Я"] = "YA";A["Ч"] = "CH";A["С"] = "S";A["М"] = "M";A["И"] = "I";A["Т"] = "T";A["Ь"] = "'";A["Б"] = "B";A["Ю"] = "YU";A["я"] = "ya";A["ч"] = "ch";A["с"] = "s";A["м"] = "m";A["и"] = "i";A["т"] = "t";A["ь"] = "'";A["б"] = "b";A["ю"] = "yu";A["љ"] = "lj";A["Љ"] = "Lj";

    await fetch(getCityName(lat, lon))
    .then((response) => response.json())
    .then((data) => {
        let word = data.results[0].components.city;
        let countryCyr = data.results[0].components.country;
        let answer = "";
        let countryLat = "";

        for (let i in word) {
          if (A[word[i]] === undefined) {
            answer += word[i];
          } else {
            answer += A[word[i]];
          }
        }

        for (let j in countryCyr) {
          if (A[countryCyr[j]] === undefined) {
            countryLat += countryCyr[j];
          } else {
            countryLat += A[countryCyr[j]];
          }
        }

        setCountry(countryLat);

        if (answer === "" || answer === " ") {
          setCity(region.replace("City of ", ""));
        } 

         setCity(answer.replace("City of ", ""));
      })
      .catch((status) => console.log("error:", status));
  }

  const onRefresh = () => {
    setRefreshing(true);
    fetchDataFromApi(lat, lon)
    setUpdated(`${days[new Date().getDay()].substring(0, 3)}, ${new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours()}:${new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()}`)
    setRefreshing(false)
  }
  //1e7ddf
  //#6ba3e0

  const getAQIdescription = () => {
    switch (AQI) {
      case 1:
        return "Good"
      case 2:
        return "Fair"
      case 3:
        return "Moderate"
      case 4:
        return "Poor"
      case 5:
        return "Very Poor"
      default:
        return "Loading"
    }
  }

  return (
    <>
    <Header bgColor={bgColor} country={country} city={city} updated={updated} />
    <ScrollView
      style={[styles.body, { backgroundColor: bgColor }]}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          tintColor={bgColor}
          colors={[bgColor]}
          onRefresh={onRefresh}
        />
      }
      showsVerticalScrollIndicator={false}
      endFillColor={bgColor}
    >
      <ContextDataAPI.Provider value={{ blockBorderColor, data, blckColor }}>
         <Current currentTemp={currentTemp} max={max} min={min}  feel={feel} />
         <Hourly />
         <Overview />
         <Daily days={days} />
         <SunTime daily={daily} />
         <Primary brdrColor={brdrColor} />
         <Other aqiDesc={getAQIdescription()} AQI={AQI} pollen={pollen} />
         <View style={{height:25, width:1}}></View>
         </ContextDataAPI.Provider>
    </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor:"#000",
    padding: Status.currentHeight,
    width:"100%",
    paddingHorizontal:0,
    paddingVertical:0,
  }
})

export default App