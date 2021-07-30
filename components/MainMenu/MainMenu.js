import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import { Global } from '../../modules/GlobalStyles';
const MainMenu = (props)=>{
    const dataForChildren = props.dataForChildren;
    const styles = StyleSheet.create({
        menu: {
            backgroundColor: Global.color.darkGreyBG2,
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
            color: Global.color.lightColor,
            fontSize: 20,
            padding: 7.5,
            paddingHorizontal: 10,
        }
    });
    return (
        <View style={styles.menu}>
            <TouchableOpacity style={styles.menuButton} onPress={ ()=> dataForChildren.view.setView('home') }>
                <Text style={styles.menuButtonText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuButton} onPress={ ()=> dataForChildren.view.setView('expenses') }>
                <Text style={styles.menuButtonText}>Expenses</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuButton} onPress={ ()=> dataForChildren.view.setView('accounts') }>
                <Text style={styles.menuButtonText}>Accounts</Text>
            </TouchableOpacity>
        </View>
    );
}
export default MainMenu;