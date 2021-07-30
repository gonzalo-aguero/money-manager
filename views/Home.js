import React from 'react';
import {View, Text} from 'react-native';
import Styles from '../modules/GlobalStyles';
const Home = ()=>{
    return (
        <View style={Styles.mainContainer}>
            <Text style={Styles.title}>Home</Text>
        </View>
    );
}
export default Home;