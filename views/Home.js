import React from 'react';
import {View, Text} from 'react-native';
import MainMenu from '../components/MainMenu/MainMenu';
import Styles from '../modules/GlobalStyles';
const Home = (props)=>{
    const dataForChildren = props.dataForChildren;
    return (
        <View style={Styles.mainContainer}>
            <Text style={Styles.title}>Home</Text>
            <MainMenu dataForChildren={dataForChildren} ></MainMenu>
        </View>
    );
}
export default Home;