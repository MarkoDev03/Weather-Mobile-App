import React, { useContext } from 'react';
import {View, StyleSheet, Text} from 'react-native';
import LottieView from 'lottie-react-native';
import { ContextDataAPI } from '../App';

const Primary = ({ brdrColor }) => {

    const { blockBorderColor, blckColor, data } = useContext(ContextDataAPI)

    const items = [
        { 
            source: require("../assets/icons/uvindex.json"), 
            title: "UV Index", 
            value: data?.currently?.uvIndex <= 2? "Low": data?.currently?.uvIndex > 2 && data?.currently?.uvIndex < 6? "Midium": "High",
            borderColor: brdrColor
        },
        { 
            source: require("../assets/icons/windspeed.json"), 
            title: "Wind", 
            value: `${Math.round(data?.currently?.windSpeed * 1.609344)} Km/h`,
            borderColor: brdrColor
        },
        { 
            source: require("../assets/icons/raindrop.json"), 
            title: "Humidity", 
            value: `${Math.round(data?.currently?.humidity * 100)}%`,
            borderColor: blckColor
        },
    ]

    const Block = ({ item }) => {

      return (
        <View style={[styles.item, { borderRightColor: item.borderColor }]}>
          <LottieView source={item?.source} autoPlay loop style={styles.lottie} />
           <Text style={styles.title}>{item.title}</Text>
           <Text style={styles.value}>{item.value}</Text>
        </View>
        )
    }

    return (
    <View  style={styles.wrapper}>
       <View style={[styles.block, { backgroundColor:blckColor, borderColor: blockBorderColor }]}>
         {items.map((item, index) => <Block item={item} key={index} />)}
       </View>
    </View>
    );
}

const styles = StyleSheet.create({
    item: {
        width:"33%", 
        justifyContent:"center", 
        alignItems:"center", 
        borderRightWidth: 1
    },
    lottie: {
        height: 55, 
        alignSelf: "center"
    },
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
        paddingBottom: 12,
        justifyContent:"center", 
        alignItems:"flex-start", 
        flexDirection:"row"
    },
    title: {
        fontSize: 23, 
        color:"white"
    },
    value: {
        fontSize: 18, 
        color:"#fff"
    }
})

export default Primary;
