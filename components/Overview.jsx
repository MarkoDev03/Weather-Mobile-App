import React, { useContext } from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { ContextDataAPI } from '../App';

const Overview = () => {

    const { blockBorderColor, blckColor, data } = useContext(ContextDataAPI)

    return (
      <View  style={styles.wrapper}>
         <View style={[styles.item, { backgroundColor:blckColor, borderColor: blockBorderColor }]}>
           <Text style={styles.title}>Temperature overview</Text>
           <Text style={styles.value}>{data?.hourly?.summary}</Text>
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
    item: {
        width:"100%", 
        borderRadius: 30, 
        paddingVertical: 20, 
        justifyContent:"center", 
        alignItems:"center", 
        borderWidth:1
    },
    title: {
        fontSize:20, 
        color:"#fff", 
        fontWeight: "bold"
    },
    value: {
        fontSize:17, 
        color:"#fff", 
        textAlign:"center"
    }
})

export default Overview;
