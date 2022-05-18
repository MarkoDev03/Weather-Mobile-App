import axios from "axios";
import React, { useState, useEffect } from "react";
import { View, Text, LogBox, StatusBar as Status, RefreshControl, ScrollView, StyleSheet } from "react-native";
import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import LottieView from 'lottie-react-native';
import Entypo from "react-native-vector-icons/Entypo"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import * as NavigationBar from 'expo-navigation-bar';

LogBox.ignoreAllLogs(true);
LogBox.ignoreLogs(["Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: object. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."])

export default function App() {

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
      } else {
        //
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
      
      let API = `https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${lon}`;

      const { data } = await axios.get(API);
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
    
    xhr.open("GET", `https://api.ambeedata.com/latest/pollen/by-lat-lng?lat=${lat}&lng=${lon}`);
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
       NavigationBar.setBackgroundColorAsync("#7bb3f3");
    } else  {
       setBgColor("#000")
       setBlckColor("#191919")
       setBrdrColor("#5c5b5b")
       setBlockBorderColor("#000")
       NavigationBar.setBackgroundColorAsync("#000");
    }

    } catch (error) {
      console.log(error);
    }
  };

  const getAQI = async () => {
    const API_KEY ='49cc8c821cd2aff9af04c9f98c36eb74';
    let API_AQI = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    const { data } = await axios.get(API_AQI);
    setAQI(data?.list[0]?.main?.aqi)
  }

  const getCityName = async (lat, lon) => {
    var A = new Array([]);
    A["Ё"] = "YO";A["Й"] = "I";A["Ц"] = "TS";A["У"] = "U";A["К"] = "K";A["Е"] = "E";A["Н"] = "N";A["Г"] = "G";A["Ш"] = "Š";A["Щ"] = "SCH";A["З"] = "Z";A["Х"] = "H";A["Ъ"] = "'";A["ё"] = "yo";A["й"] = "i";A["ц"] = "ts";A["у"] = "u";A["к"] = "k";A["е"] = "e"; A["н"] = "n";A["г"] = "g";A["ш"] = "š"; A["щ"] = "sch";A["з"] = "z";A["х"] = "h";A["ъ"] = "'";A["Ф"] = "F";A["Ы"] = "I";A["В"] = "V";A["А"] = "A";A["П"] = "P";A["Р"] = "R";A["О"] = "O";A["Л"] = "L";A["Д"] = "D";A["Ж"] = "ZH";A["Э"] = "E";A["ф"] = "f";A["ы"] = "i";A["в"] = "v";A["а"] = "a";A["п"] = "p";A["р"] = "r";A["о"] = "o";A["л"] = "l";A["д"] = "d";A["ж"] = "zh";A["э"] = "e";A["Я"] = "YA";A["Ч"] = "CH";A["С"] = "S";A["М"] = "M";A["И"] = "I";A["Т"] = "T";A["Ь"] = "'";A["Б"] = "B";A["Ю"] = "YU";A["я"] = "ya";A["ч"] = "ch";A["с"] = "s";A["м"] = "m";A["и"] = "i";A["т"] = "t";A["ь"] = "'";A["б"] = "b";A["ю"] = "yu";A["љ"] = "lj";A["Љ"] = "Lj";

    await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${lat},${lon}&pretty=1&key=572d4a63d1b040e0b11092b3f924227c`
    )
    .then((response) => response.json())
    .then((data) => {
        var word = data.results[0].components.city;
        var countryCyr = data.results[0].components.country;
        var answer = "";
        var countryLat = "";

        for (var i in word) {
          if (A[word[i]] === undefined) {
            answer += word[i];
          } else {
            answer += A[word[i]];
          }
        }

        for (var j in countryCyr) {
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
  
  const getIcon = (icon, height) => {
     icon = icon?.replace(/-/g, "_").toUpperCase()

     if (icon === "SNOW"){ 
       return (<LottieView source={require("./assets/icons/snow.json")} autoPlay loop style={{ height: height, alignSelf: "center" }} />)}
      else if (icon === "CLEAR_DAY"){
       return (<LottieView source={require("./assets/icons/sunny.json")} autoPlay loop style={{ height: height, alignSelf: "center" }} />)}
      else if (icon === "CLEAR_NIGHT"){
       return (<LottieView source={require("./assets/icons/night.json")} autoPlay loop style={{ height: height, alignSelf: "center" }} />)}
      else if (icon === "PARTLY_CLOUDY_DAY"){
       return (<LottieView source={require("./assets/icons/partly-cloudy-day.json")} autoPlay loop style={{ height: height, alignSelf: "center" }} />)}
      else if (icon === "PARTLY_CLOUDY_NIGHT"){
       return (<LottieView source={require("./assets/icons/partly-cloudy-night.json")} autoPlay loop style={{ height: height, alignSelf: "center" }} />)}
     else if (icon === "CLOUDY"){
       return (<LottieView source={require("./assets/icons/cloudy.json")} autoPlay loop style={{ height: height, alignSelf: "center" }} />)}
     else if (icon === "RAIN"){
       return (<LottieView source={require("./assets/icons/light-rain.json")} autoPlay loop style={{ height: height, alignSelf: "center" }} />)}
     else if (icon === "SLEET"){
       return (<LottieView source={require("./assets/icons/sleet.json")} autoPlay loop style={{ height: height, alignSelf: "center" }} />)}
     else if (icon === "SNOW"){
       return (<LottieView source={require("./assets/icons/snow.json")} autoPlay loop style={{ height: height, alignSelf: "center" }} />)}
     else if (icon === "WIND"){
       return (<LottieView source={require("./assets/icons/windy.json")} autoPlay loop style={{ height: height, alignSelf: "center" }} />)}
     else if (icon === "FOG"){
       return (<LottieView source={require("./assets/icons/fog.json")} autoPlay loop style={{ height: height, alignSelf: "center" }} />)}
     else if (icon === "THUNDER"){
       return (<LottieView source={require("./assets/icons/thunder-only.json")} autoPlay loop style={{ height: height, alignSelf: "center" }} />)}
     else if (icon === "RAIN-SNOW-SHOWERS-NIGHT"){
       return (<LottieView source={require("./assets/icons/night-snow.json")} autoPlay loop style={{ height: height, alignSelf: "center" }} />)}
     else if (icon === "RAIN-SNOW-SHOWERS-DAY"){
       return (<LottieView source={require("./assets/icons/snow-day.json")} autoPlay loop style={{ height: height, alignSelf: "center" }} />)}
     else if (icon === "RAIN-SNOW"){
       return (<LottieView source={require("./assets/icons/snow.json")} autoPlay loop style={{ height: height, alignSelf: "center" }} />)}
     else if (icon === "SHOWERS-DAY"){
       return (<LottieView source={require("./assets/icons/day-rain.json")} autoPlay loop style={{ height: height, alignSelf: "center" }} />)}
     else if (icon === "SHOWERS-NIGHT"){
       return (<LottieView source={require("./assets/icons/night-rain.json")} autoPlay loop style={{ height: height, alignSelf: "center" }} />)}
     else if (icon === "SNOW-SHOWERS-NIGHT"){
       return (<LottieView source={require("./assets/icons/night-snow.json")} autoPlay loop style={{ height: height, alignSelf: "center" }} />)}
     else if (icon === "SNOW-SHOWERS-DAY"){
       return (<LottieView source={require("./assets/icons/snow-day.json")} autoPlay loop style={{ height: height, alignSelf: "center" }} />)}
     else if (icon === "THUNDER-RAIN"){
       return (<LottieView source={require("./assets/icons/thunder.json")} autoPlay loop style={{ height: height, alignSelf: "center" }} />)}
     else if (icon === "THUNDER-SHOWERS-DAY"){
       return (<LottieView source={require("./assets/icons/thunder.json")} autoPlay loop style={{ height: height, alignSelf: "center" }} />)}
     else if (icon === "THUNDER-SHOWERS-NIGHT"){
       return (<LottieView source={require("./assets/icons/thunder.json")} autoPlay loop style={{ height: height, alignSelf: "center" }} />)}
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
    <ScrollView
      style={{
        flex: 1,
        backgroundColor:"#000",
        padding: Status.currentHeight,
        width:"100%",
        paddingHorizontal:0,
        paddingVertical:0,
        backgroundColor: bgColor,
      }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          tintColor={bgColor}
          colors={[bgColor]}
          onRefresh={onRefresh}
        />
      }
      overScrollMode="never"
      showsVerticalScrollIndicator={false}
      stickyHeaderIndices={[1]}
      endFillColor={bgColor}
    >
       <StatusBar style="light" backgroundColor={bgColor} />

       <View style={{justifyContent:"center", alignItems:"center",  backgroundColor: bgColor, paddingVertical: 10, width:"100%"}}>  
          <Text style={{ color:"#fff", fontSize: 23,marginTop: 25 }}><Entypo name="location-pin" size={22} color="#fff" /> {city}, {country}</Text>
          <Text style={{ color:"#e6e6e6", fontSize: 16, marginTop: 0, textAlign:"center" }}>{updated}</Text> 
     </View>

    <View style={{ width:"100%", paddingHorizontal: 15, justifyContent:"center", alignItems:"center", height: 300}}>
    <View style={{ justifyContent:"space-between", alignItems:"flex-start", width:"100%", flexDirection:"row"}}>
   
   <View style={{flexDirection:"column", justifyContent:"flex-start", alignItems:"flex-start", }}>
   <Text style={{color:"#fff", fontSize: 75}} adjustsFontSizeToFit={true} numberOfLines={1}>{currentTemp}°</Text>
    <Text style={{fontSize:17, color:"#fff"}}>{max}° / {min}° Feels like  {feel}°</Text>
    {/* <Text style={{fontSize:17, color:"#fff", marginLeft: -5}}><Entypo name="drop" color="white" size={20} /> {Math.round(data?.hourly?.data[0]?.precipProbability * 100)}%</Text> */}
    <Text style={{color:"#fff", fontSize: 25}}>{data?.hourly?.data[0]?.summary}</Text>
   </View>

   <View style={{justifyContent:"center", alignItems:"center", marginBottom: 0}}>
    {getIcon(data?.hourly?.data[0]?.icon, 140)}
</View>
 </View>
    </View>

    <View style={{width:"100%", paddingHorizontal: 5, justifyContent:"center"}}>
    <View style={{width:"100%",  backgroundColor:blckColor, borderRadius: 30, paddingVertical: 13, borderColor: blockBorderColor, borderWidth:1}}>
      <ScrollView overScrollMode="never" horizontal={true} showsHorizontalScrollIndicator={false} style={{width:"100%", backgroundColor:blckColor, padding: 5, borderRadius: 20, paddingTop:0}}>
         {
           data?.hourly?.data.map((item, index) => (
             <View   key={index} style={{ justifyContent:"space-between", alignItems:"center", width: 85, marginRight: 8, paddingVertical: 10}}>
                 <Text style={{color:"#fff", fontWeight:"400", fontSize: 14}}>{new Date(item.time * 1000).getHours()} : 00</Text>
                 {getIcon(item.icon, 45)}
                 <Text style={{color:"#fff", fontSize: 20, fontWeight:"400"}}>  {Math.round((item.temperature - 32) * (5 / 9))}°</Text>
                 <Text style={{color:"#fff", fontWeight:"400", fontSize: 14}}>{Math.round(item.windSpeed * 1.609344)} Km/h</Text>
                 <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center", marginTop: 5}}>
                   <Entypo name="drop" color="white" size={14} />
                   <Text style={{color:"#fff", marginLeft: 3}}>{Math.round(item.precipProbability * 100)}%</Text>
                 </View>
             </View>
           ))
         }
    </ScrollView>
    </View>
    </View>

   <View  style={{width:"100%", paddingHorizontal: 5, justifyContent:"center", marginTop: 10}}>
   <View style={{width:"100%",  backgroundColor:blckColor, borderRadius: 30, paddingVertical: 20, justifyContent:"center", alignItems:"center", borderColor: blockBorderColor, borderWidth:1}}>
       <Text style={{fontSize:20, color:"#fff", fontWeight: "bold"}}>Temperature overview</Text>
       <Text style={{fontSize:17, color:"#fff", textAlign:"center"}}>{data?.hourly?.summary}</Text>
   </View>
   </View>

    <View style={{width:"100%", paddingHorizontal: 5, justifyContent:"center", marginTop: 10}}>
       <View style={{width:"100%",  backgroundColor:blckColor, borderRadius: 30, paddingVertical: 13, paddingBottom: 3, borderColor: blockBorderColor, borderWidth:1}}>
        <View style={{paddingVertical:10, width:"100%", justifyContent:"center", alignItems:"center", paddingTop: 0}}>
          {data?.daily?.data.map((item, index) => (
            <View key={index} style={{width:"90%", paddingVertical: 3, flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
               <View style={{width:45}}><Text style={{color:"white", fontSize: 17}} adjustsFontSizeToFit numberOfLines={1}>{days[new Date(item.time * 1000).getDay()].substring(0, 3).toUpperCase()}</Text></View>
                <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center", width:45}}>
                   <Entypo name="drop" color="#fff" size={17} />
                   <View style={{width: 40, marginLeft: 3, justifyContent:"flex-start", alignItems:"flex-start"}}><Text style={{color:"#fff", fontSize: 17}} adjustsFontSizeToFit numberOfLines={1}>{Math.round(item.precipProbability * 100)}%</Text></View>
                 </View>
                   {getIcon(item.icon, 45)}
               <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
               <View style={{width: 40, justifyContent:"flex-start"}}><Text style={{color:"white", fontSize: 17}}>{Math.round((item.temperatureLow - 32) * (5 / 9))}°</Text></View>
                 <View style={{width: 40, justifyContent:"flex-end", alignItems:"flex-end"}}><Text style={{color:"white", fontSize: 17}}>{Math.round((item.temperatureHigh - 32) * (5 / 9))}°</Text></View>
               </View>
            </View>
          ))}
        </View>
       </View>
     </View>

     <View  style={{width:"100%", paddingHorizontal: 5, justifyContent:"center", marginTop: 10}}>
   <View style={{width:"100%", borderColor: blockBorderColor, borderWidth:1,  backgroundColor:blckColor, borderRadius: 30, paddingVertical: 20, paddingBottom: 5,justifyContent:"center", alignItems:"flex-start", flexDirection:"row"}}>
       <View style={{width:"50%", justifyContent:"center", alignItems:"center"}}>
           <Text style={{fontSize: 23, color:"white"}}>Sunrise</Text>
           <Text style={{fontSize: 18, color:"#fff"}}>  {new Date(daily[0]?.sunriseTime * 1000).getHours() < 10? "0" + new Date(daily[0]?.sunriseTime * 1000).getHours(): new Date(daily[0]?.sunriseTime * 1000).getHours()}{" "}:{" "}{new Date(daily[0]?.sunriseTime * 1000).getMinutes() < 10? "0" + new Date(daily[0]?.sunriseTime * 1000).getMinutes(): new Date(daily[0]?.sunriseTime * 1000).getMinutes()}</Text>
           {getIcon("clear-day", 80 )}
       </View>
       <View style={{width:"50%", justifyContent:"center", alignItems:"center"}}>
           <Text style={{fontSize: 23, color:"white"}}>Sunset</Text>
           <Text style={{fontSize: 18, color:"#fff"}}> {new Date(daily[0]?.sunsetTime * 1000).getHours()} :{" "} {new Date(daily[0]?.sunsetTime * 1000).getMinutes() < 10? "0" + new Date(daily[0]?.sunsetTime * 1000).getMinutes(): new Date(daily[0]?.sunsetTime * 1000).getMinutes()}{" "}</Text>
           {getIcon("clear-night", 80 )}
       </View>
   </View>
   </View>

   <View  style={{width:"100%", paddingHorizontal: 5, justifyContent:"center", marginTop: 10}}>
   <View style={{width:"100%",  backgroundColor:blckColor, borderColor: blockBorderColor, borderWidth:1, borderRadius: 30, paddingVertical: 20, paddingBottom: 12,justifyContent:"center", alignItems:"flex-start", flexDirection:"row"}}>
    
       <View style={{width:"33%", justifyContent:"center", alignItems:"center", borderRightColor: brdrColor, borderRightWidth: 1}}>
           <LottieView source={require("./assets/icons/uvindex.json")} autoPlay loop style={{ height: 55, alignSelf: "center" }} />
           <Text style={{fontSize: 23, color:"white"}}>UV Index</Text>
           <Text style={{fontSize: 18, color:"#fff"}}>  {data?.currently?.uvIndex <= 2? "Low": data?.currently?.uvIndex > 2 && data?.currently?.uvIndex < 6? "Midium": "High"}</Text>
        </View>

        <View style={{width:"33%", justifyContent:"center", alignItems:"center", borderRightColor:brdrColor, borderRightWidth: 1}}>
           <LottieView source={require("./assets/icons/windspeed.json")} autoPlay loop style={{ height: 55, alignSelf: "center" }} />
           <Text style={{fontSize: 23, color:"white"}}>Wind</Text>
           <Text style={{fontSize: 18, color:"#fff"}}>{Math.round(data?.currently?.windSpeed * 1.609344)} Km/h</Text>
        </View>
      
        <View style={{width:"33%", justifyContent:"center", alignItems:"center"}}>
           <LottieView source={require("./assets/icons/raindrop.json")} autoPlay loop style={{ height: 55, alignSelf: "center" }} />
           <Text style={{fontSize: 23, color:"white"}}>Humidity</Text>
           <Text style={{fontSize: 18, color:"#fff"}}>{Math.round(data?.currently?.humidity * 100)}%</Text>
        </View>

   </View>
   </View>

   <View  style={{width:"100%", paddingHorizontal: 5, justifyContent:"center", marginTop: 10}}>
   <View style={{width:"100%",  backgroundColor:blckColor, borderColor: blockBorderColor, borderWidth:1, borderRadius: 30, paddingVertical: 10,justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
    
      <View style={{width:"90%", justifyContent:"space-between", alignItems:"center", flexDirection:"row", paddingVertical: 10}}>
         <View style={{flexDirection:"row", justifyContent:"flex-start", alignItems:"center"}}>
             <MaterialCommunityIcons name="speedometer" size={25} color="#15b76c" />
             <Text style={{color:"white", marginLeft: 7, fontSize: 21}}>AQI</Text>
         </View>
         <Text style={{color:"white", fontSize: 21}}>{getAQIdescription()} ({AQI})</Text>
      </View>

      <View style={{width:"90%", justifyContent:"space-between", alignItems:"center", flexDirection:"row", paddingVertical: 11}}>
         <View style={{flexDirection:"row", justifyContent:"flex-start", alignItems:"center"}}>
             <MaterialCommunityIcons name="waves" size={25} color="#7348be" />
             <Text style={{color:"white", marginLeft: 7, fontSize: 21}}>Pressure</Text>
         </View>
         <Text style={{color:"white", fontSize: 21}}>{data?.currently?.pressure} hPa</Text>
      </View>

            
      <View style={{width:"90%", justifyContent:"space-between", alignItems:"center", flexDirection:"row", paddingVertical: 11}}>
         <View style={{flexDirection:"row", justifyContent:"flex-start", alignItems:"center"}}>
             <MaterialIcons name="wb-cloudy" size={25} color="#f28581" />
             <Text style={{color:"white", marginLeft: 7, fontSize: 21}}>Clouds cover</Text>
         </View>
         <Text style={{color:"white", fontSize: 21}}>{Math.round(data?.currently?.cloudCover * 100)}%</Text>
      </View>
      
      <View style={{width:"90%", justifyContent:"space-between", alignItems:"center", flexDirection:"row", paddingVertical: 11}}>
         <View style={{flexDirection:"row", justifyContent:"flex-start", alignItems:"center"}}>
             <MaterialIcons name="remove-red-eye" size={25} color="#ffbe56" />
             <Text style={{color:"white", marginLeft: 7, fontSize: 21}}>Visibility</Text>
         </View>
         <Text style={{color:"white", fontSize: 21}}>{Math.round(data?.currently?.visibility)}km</Text>
      </View>

      <View style={{width:"90%", justifyContent:"space-between", alignItems:"center", flexDirection:"row", paddingVertical: 11}}>
         <View style={{flexDirection:"row", justifyContent:"flex-start", alignItems:"center"}}>
             <MaterialCommunityIcons name="tree" size={25} color="#23c9d7" />
             <Text style={{color:"white", marginLeft: 7, fontSize: 21}}>Pollen</Text>
         </View>
         <Text style={{color:"white", fontSize: 21}}>{pollen}</Text>
      </View>

   </View>
   </View>

<View style={{height:25, width:1}}></View>

    </ScrollView>
  );
}
