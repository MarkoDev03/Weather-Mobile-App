import React from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import getIcon from './Icon';
import Entypo from "react-native-vector-icons/Entypo"
import { useSelector } from "react-redux"

const Hourly = () => {

  const { blockBorderColor, blckColor, data } = useSelector(state => state.dataReducer)
 
   const Hour = ({ item }) => {
      let time = `${new Date(item.time * 1000).getHours()} : 00`
      let temp = `${Math.round((item.temperature - 32) * (5 / 9))}°`
      let wind = `${Math.round(item.windSpeed * 1.609344)} Km/h`
      let precip = `${Math.round(item.precipProbability * 100)}%`

      return (
        <View  style={styles.day}>
           <Text style={styles.text}>{time}</Text>
           {getIcon(item.icon, 45)}
           <Text style={styles.temp}>{temp}</Text>
           <Text style={styles.wind}>{wind}</Text>
         <View style={styles.rain}>
           <Entypo name="drop" color="white" size={14} />
           <Text style={styles.precip}>{precip}</Text>
         </View>
    </View>
      )
   }

    return (
    <View style={styles.wrapper}>
      <View style={[styles.item, { backgroundColor:blckColor,  borderColor: blockBorderColor }]}>
       <ScrollView   horizontal={true} showsHorizontalScrollIndicator={false} style={[styles.scroll, { backgroundColor:blckColor}]}>
          {data?.hourly?.data.map((item, index) => <Hour item={item} key={index} /> )}
       </ScrollView>
      </View>
    </View>
    );
}

const styles = StyleSheet.create({
   scroll: {
    width:"100%",
    padding: 5, 
    borderRadius: 20, 
    paddingTop:0
   },
   item: {
    width:"100%",
    borderRadius: 30, 
    paddingVertical: 13, 
    borderWidth:1
   },
   wrapper: {
    width:"100%", 
    paddingHorizontal: 5, 
    justifyContent:"center"
   },
   day: {
    justifyContent:"space-between", 
    alignItems:"center", 
    width: 85, 
    marginRight: 8, 
    paddingVertical: 10
   },
   text: {
    color:"#fff", 
    fontWeight:"400", 
    fontSize: 14
   },
   temp: {
    color:"#fff", 
    fontSize: 20, 
    fontWeight:"400"
   },
   wind: {
    color:"#fff", 
    fontWeight:"400", 
    fontSize: 14
   },
   rain: {
    flexDirection:"row", 
    justifyContent:"center", 
    alignItems:"center", 
    marginTop: 5
   },
   precip: {
    color:"#fff", 
    marginLeft: 3
   }
})

export default Hourly;
