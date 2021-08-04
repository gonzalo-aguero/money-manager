import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import { Colors, Fonts } from '../../modules/GlobalStyles';
const MainMenu = (props)=>{
    const dataForChildren = props.dataForChildren;
    const styles = StyleSheet.create({
        menu: {
            backgroundColor: Colors.darkGreyBG2,
            width: '100%',
            height: '7.5%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            position: 'absolute',
            bottom: 0,
        },
        menuButton: {},
        menuButtonText: {
            fontFamily: Fonts.font3,
            color: Colors.lightColor,
            fontSize: 20,
            padding: 7.5,
            paddingHorizontal: 10,
        }
    });
    /**
     * 
     * @param {String} name Name of the view (required).
     * @param {String} text Text to display.
     * @returns {JSX} Default button of the menu.
     */
    const getNavigationButton = (name = null, text = "")=>{
        if(name === null){
            console.error("Name is required in getNavigationButton().");
            return;
        }
        return (
            <TouchableOpacity style={styles.menuButton} onPress={ ()=> dataForChildren.view.setView(name) }>
                <Text style={styles.menuButtonText}>{text}</Text>
            </TouchableOpacity>
        );
    }
    return (
        <View style={styles.menu}>
            {getNavigationButton("logs", "Logs")}
            {getNavigationButton("incomes", "Incomes")}
            {getNavigationButton("home", "Home")}
            {getNavigationButton("expenses", "Expenses")}
            {getNavigationButton("accounts", "Accounts")}
        </View>
    );
}
export default MainMenu;