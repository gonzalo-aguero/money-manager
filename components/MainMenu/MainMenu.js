import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet, ProgressViewIOSComponent} from 'react-native';
const MainMenu = (props)=>{
    const viewData = props.viewData;
    const styles = StyleSheet.create({
        menu: {
            backgroundColor: '#2B2B2A',
            width: '100%',
            height: 50,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginBottom: 49
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
            <TouchableOpacity style={styles.menuButton} onPress={ ()=> viewData.setViewMethod(0)}>
                <Text style={styles.menuButtonText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuButton} onPress={ ()=> viewData.setViewMethod(1)}>
                <Text style={styles.menuButtonText}>Otro</Text>
            </TouchableOpacity>
        </View>
    );
}
export default MainMenu;


// class MainMenu{
//     constructor(props){
//         this.props = props;
//     }
//     render(){
//         // const viewData = this.props.viewData;
//         const styles = StyleSheet.create({
//             menu: {
//                 backgroundColor: '#2B2B2A',
//                 width: '100%',
//                 height: 50,
//                 display: 'flex',
//                 flexDirection: 'row',
//                 justifyContent: 'space-around',
//                 alignItems: 'center',
//                 marginBottom: 49
//             },
//             menuButton: {
//                 padding: 3,
//                 paddingHorizontal: 10
//             },
//             menuButtonText: {
//                 color: '#E8E8E8',
//                 fontSize: 20
//             }
//         });
//         return (
//             <View style={styles.menu}>
//                 <TouchableOpacity style={styles.menuButton} >
//                     <Text style={styles.menuButtonText}>Home</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.menuButton} >
//                     <Text style={styles.menuButtonText}>Otro</Text>
//                 </TouchableOpacity>
//             </View>
//         );
//     }
    
// }
// export default MainMenu;