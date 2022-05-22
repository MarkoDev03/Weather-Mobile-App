import React, { useContext } from 'react';
import {View, StyleSheet, Text} from 'react-native';
import getIcon from './Icon';
import { ContextDataAPI } from '../App';

const Current = ({ currentTemp, max, min, feel }) => {

    const { data } = useContext(ContextDataAPI)
    
    return (
     <View style={styles.wrapper}>
        <View style={styles.item}> 
          <View style={styles.block}>
            <Text style={styles.temp} adjustsFontSizeToFit={true} numberOfLines={1}>{currentTemp}°</Text>
            <Text style={styles.minmax}>{max}° / {min}° Feels like  {feel}°</Text>
            {/* <Text style={{fontSize:17, color:"#fff", marginLeft: -5}}><Entypo name="drop" color="white" size={20} /> {Math.round(data?.hourly?.data[0]?.precipProbability * 100)}%</Text> */}
            <Text style={styles.summary}>{data?.hourly?.data[0]?.summary}</Text>
         </View>
         <View style={styles.icon}>
           {getIcon(data?.hourly?.data[0]?.icon, 140)}
         </View>
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
   wrapper: {
     width:"100%", 
     paddingHorizontal: 15, 
     justifyContent:"center", 
     alignItems:"center", 
     height: 300
   },
   item: {
     justifyContent:"space-between", 
     alignItems:"flex-start", 
     width:"100%", 
     flexDirection:"row"
   },
   block:{
    flexDirection:"column", 
    justifyContent:"flex-start", 
    alignItems:"flex-start"
   },
   temp: {
    color:"#fff", 
    fontSize: 75
   },
   minmax: {
    fontSize:17, 
    color:"#fff"
   },
   icon: {
    justifyContent:"center", 
    alignItems:"center", 
    marginBottom: 0
   },
   summary: {
    color:"#fff", 
    fontSize: 25
   }
})

export default Current;