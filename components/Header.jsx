import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Entypo from "react-native-vector-icons/Entypo"

const Header = ({ bgColor, country, city, updated }) => {
    return (
       <React.Fragment>
         <StatusBar style="light" backgroundColor={bgColor} />
           <View style={[styles.header, { backgroundColor: bgColor }]}>  
             <Text style={styles.city}><Entypo name="location-pin" size={22} color="#fff" /> {city}, {country}</Text>
             <Text style={styles.time}>{updated}</Text> 
           </View>
       </React.Fragment>
    );
}

const styles = StyleSheet.create({
    header: {
        justifyContent:"center", 
        alignItems:"center", 
        paddingVertical: 10, 
        width:"100%"
    },
    city: {
        color:"#fff", 
        fontSize: 23, 
        marginTop: 25
    },
    time: {
        color:"#e6e6e6", 
        fontSize: 16, 
        marginTop: 0, 
        textAlign:"center"
    }
})

export default Header;
