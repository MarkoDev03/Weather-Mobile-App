import React, { useContext } from 'react'
import {View, StyleSheet, Text} from 'react-native'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { ContextDataAPI } from '../App'

const Other = ({ aqiDesc, AQI, pollen }) => {

    const { blockBorderColor, blckColor, data } = useContext(ContextDataAPI)

    const items = [
        {
           icon: <MaterialCommunityIcons name="speedometer" size={25} color="#15b76c" />,
           title: "AQI",
           value: `${aqiDesc} (${AQI})`,
        },
        {
            icon: <MaterialCommunityIcons name="waves" size={25} color="#7348be" />,
            title: "Pressure",
            value: `${data?.currently?.pressure} hPa`,
         },
         {
            icon: <MaterialIcons name="wb-cloudy" size={25} color="#f28581" />,
            title: "Clouds cover",
            value: `${Math.round(data?.currently?.cloudCover * 100)}%`,
         },
         {
            icon: <MaterialIcons name="remove-red-eye" size={25} color="#ffbe56" />,
            title: "Visibility",
            value: `${Math.round(data?.currently?.visibility)}km`,
         },
         {
            icon: <MaterialCommunityIcons name="tree" size={25} color="#23c9d7" />,
            title: "Pollen",
            value: pollen,
         },
    ]

    const Item = ({ item }) => {
        return (
         <View style={styles.item}>
            <View style={styles.icon}>
                {item.icon}
                <Text style={styles.title}>{item.title}</Text>
            </View>
           <Text style={styles.value}>{item.value}</Text>
         </View>
        )
    }
    
    return (
    <View  style={styles.wrapper}>
       <View style={[styles.list, { backgroundColor:blckColor, borderColor: blockBorderColor }]}>
         {items.map((item, index) => <Item item={item} key={index} />)}
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
  list: {
    width:"100%", 
    borderWidth:1, 
    borderRadius: 30, 
    paddingVertical: 10,
    justifyContent:"center", 
    alignItems:"center", 
    flexDirection:"column"
  },
  item: {
    width:"90%", 
    justifyContent:"space-between", 
    alignItems:"center", 
    flexDirection:"row", 
    paddingVertical: 11
  },
  icon: {
    flexDirection:"row", 
    justifyContent:"flex-start", 
    alignItems:"center"
  },
  title: {
    color:"white", 
    marginLeft: 7, 
    fontSize: 21
  },
  value: {
    color:"white", 
    fontSize: 21
  }
})

export default Other;
