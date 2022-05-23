import React from 'react';
import { View, StyleSheet, Text} from 'react-native';
import getIcon from './Icon';
import Entypo from "react-native-vector-icons/Entypo"
import { useSelector } from "react-redux"

const Daily = ({ days }) => {

    const { blockBorderColor, blckColor, data } = useSelector(state => state.dataReducer)

    const Day = ({ item, index }) => {

        let dayInWeek = index === 0 ? "TDY" : days[new Date(item.time * 1000).getDay()].substring(0, 3).toUpperCase()
        let precipProbability = `${Math.round(item.precipProbability * 100)}%`
        let minTemp = `${Math.round((item.temperatureLow - 32) * (5 / 9))}°`
        let maxTemp = `${Math.round((item.temperatureHigh - 32) * (5 / 9))}°`
        
        return (    
             <View  style={styles.item}>
                <View style={{width:45}}>
                    <Text style={styles.text} adjustsFontSizeToFit numberOfLines={1}>{dayInWeek}</Text>
                </View>
                <View style={styles.rain}>
                    <Entypo name="drop" color="#fff" size={17} />
                    <View style={styles.rainTxt}>
                        <Text style={styles.text} adjustsFontSizeToFit numberOfLines={1}>{precipProbability}</Text>
                    </View>
                </View>
                {getIcon(item.icon, 45)}
                <View style={styles.data}>
                  <View style={styles.start}>
                      <Text style={styles.text}>{minTemp}</Text>
                    </View>
                  <View style={styles.end}>
                      <Text style={styles.text}>{maxTemp}</Text>
                    </View>
                </View>
             </View>
        )
    }

    return (
        <View style={styles.wrapper}>
        <View style={[styles.block, {backgroundColor:blckColor, borderColor: blockBorderColor}]}>
         <View style={styles.itemWrapper}>
           {data?.daily?.data.map((item, index) => <Day item={item} key={index} index={index} />)}
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
        borderRadius: 30, 
        paddingVertical: 13, 
        paddingBottom: 3, 
        borderWidth:1
    },
    itemWrapper: {
        paddingVertical:10, 
        width:"100%", 
        justifyContent:"center", 
        alignItems:"center", 
        paddingTop: 0
    },
    item: {
        width:"90%",
        paddingVertical: 3, 
        flexDirection:"row", 
        justifyContent:"space-between", 
        alignItems:"center"
    },
    text: {
        color:"white", 
        fontSize: 17
    },
    rain: {
        flexDirection:"row", 
        justifyContent:"center", 
        alignItems:"center", 
        width:45
    },
    rainTxt: {
        width: 40, 
        marginLeft: 3, 
        justifyContent:"flex-start", 
        alignItems:"flex-start"
    },
    data: {
        flexDirection:"row", 
        justifyContent:"space-between", 
        alignItems:"center"
    },
    start: {
        width: 40, 
        justifyContent:"flex-start"
    },
    end: {
        width: 40, 
        justifyContent:"flex-end", 
        alignItems:"flex-end"
    }
})

export default Daily;