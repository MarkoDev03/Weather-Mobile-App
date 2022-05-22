import React, { useContext } from 'react';
import {View, StyleSheet, Text} from 'react-native';
import getIcon from './Icon';
import { ContextDataAPI } from '../App';

const SunTime = ({ daily }) => {

    const { blockBorderColor, blckColor } = useContext(ContextDataAPI)

    let sunrise = `${new Date(daily[0]?.sunriseTime * 1000).getHours() < 10? "0" + new Date(daily[0]?.sunriseTime * 1000).getHours(): new Date(daily[0]?.sunriseTime * 1000).getHours()} : ${new Date(daily[0]?.sunriseTime * 1000).getMinutes() < 10? "0" + new Date(daily[0]?.sunriseTime * 1000).getMinutes(): new Date(daily[0]?.sunriseTime * 1000).getMinutes()}`
    let sunset = `${new Date(daily[0]?.sunsetTime * 1000).getHours()} : ${new Date(daily[0]?.sunsetTime * 1000).getMinutes() < 10 ? "0" + new Date(daily[0]?.sunsetTime * 1000).getMinutes(): new Date(daily[0]?.sunsetTime * 1000).getMinutes()} ` 

    return (
    <View style={styles.wrapper}>
      <View style={[styles.block, { borderColor: blockBorderColor, backgroundColor:blckColor }]}>
         <View style={styles.suntime}>
            <Text style={styles.text}>Sunrise</Text>
            <Text style={styles.time}>{sunrise}</Text>
            {getIcon("clear-day", 80)}
       </View>
       <View style={styles.suntime}>
           <Text style={styles.text}>Sunset</Text>
           <Text style={styles.time}>{sunset}</Text>
           {getIcon("clear-night", 80)}
       </View>
     </View>
   </View>
    );
}

const styles = StyleSheet.create({
   wrapper: {
    width:"100%", 
    paddingHorizontal: 5, 
    justifyContent:"center", 
    marginTop: 10
   },
   block: {
    width:"100%", 
    borderWidth:1, 
    borderRadius: 30, 
    paddingVertical: 20, 
    paddingBottom: 5, 
    justifyContent:"center", 
    alignItems:"flex-start", 
    flexDirection:"row"
   },
   text: {
    fontSize: 23, 
    color:"white"
   },
   time: {
    fontSize: 18, 
    color:"#fff"  
   },
   suntime: {
    width:"50%", 
    justifyContent:"center", 
    alignItems:"center"
   },

})

export default SunTime;
