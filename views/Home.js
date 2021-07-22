import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import MainMenu from '../components/MainMenu/MainMenu';
import Styles from './styles';
const Home = (props)=>{
    const viewData = props.viewData;
    return (
        <View style={Styles.mainContainer}>
            <TouchableOpacity>
                <Text style={{color:'white'}}>This is the home view</Text>
            </TouchableOpacity>
            <MainMenu viewData={viewData} ></MainMenu>
        </View>
    );
}
export default Home;