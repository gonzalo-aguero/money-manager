import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
const MainMenu = (props)=>{
    const dataForChildren = props.dataForChildren;
    const styles = StyleSheet.create({
        menu: {
            backgroundColor: '#2B2B2A',
            width: '100%',
            height: 50,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            // marginBottom: 48,
            position: 'absolute',
            bottom: 0,
        },
        menuButton: {
            padding: 3,
            paddingHorizontal: 10
        },
        menuButtonText: {
            color: '#E8E8E8',
            fontSize: 20
        }
    });
    return (
        <View style={styles.menu}>
            <TouchableOpacity style={styles.menuButton} onPress={ ()=> dataForChildren.view.setView('home') }>
                <Text style={styles.menuButtonText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuButton} onPress={ ()=> dataForChildren.view.setView('accounts') }>
                <Text style={styles.menuButtonText}>Accounts</Text>
            </TouchableOpacity>
        </View>
    );
}
export default MainMenu;