import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import { Colors, Fonts } from '../../modules/GlobalStyles';
import { Icons, getViewIconImage } from '../../modules/Global';
const MainMenu = (props)=>{
    const dataForChildren = props.dataForChildren;
    const currentViewName = props.dataForChildren.view.viewName;
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
        },
        activeButton: {
            opacity: .25,
        }
    });
    /**
     * @param {String} name Name of the view (required).
     * @param display Text to display (String) or image (JSXElement).
     * @returns Button for the menu.
     */
    const getNavigationButton = (name = null, display = "")=>{
        if(name === null){
            console.error("Name is required in getNavigationButton().");
            return;
        }
        let element;
        if(typeof display === 'string'){
            //Display menu option as Text
            element = <Text style={[
                styles.menuButtonText,
                currentViewName === name ? styles.activeButton : null, 
            ]}>{display}</Text>
        }else if(typeof display === 'object'){
            //Display menu option as JSXElement
            element = display;
        }
        //Return option menu button
        return (
            <TouchableOpacity style={[styles.menuButton ]} onPress={ ()=> dataForChildren.view.setView(name) }>
                {element}
            </TouchableOpacity>
        );
    }
    return (
        <View style={styles.menu}>
            {getNavigationButton("logs", getViewIconImage(Icons.logs, currentViewName === "logs", styles.activeButton))}
            {getNavigationButton("incomes", getViewIconImage(Icons.incomes, currentViewName === "incomes", styles.activeButton))}
            {getNavigationButton("home", getViewIconImage(Icons.home, currentViewName === "home", styles.activeButton))}
            {getNavigationButton("expenses", getViewIconImage(Icons.expenses, currentViewName === "expenses", styles.activeButton))}
            {getNavigationButton("accounts", getViewIconImage(Icons.accounts, currentViewName === "accounts", styles.activeButton))}
        </View>
    );
}
export default MainMenu;