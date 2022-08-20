import React, { useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import GlobalStyles from '../modules/GlobalStyles';

const About = (props)=>{
    const dataForChildren = props.dataForChildren;

    useEffect(()=>{

    },[]);

    return (
        <View style={GlobalStyles.mainContainer}>
            <View style={GlobalStyles.header}>
                <Text style={GlobalStyles.title}>About</Text>
                
                <TouchableOpacity onPress={()=> dataForChildren.view.setView("home") } style={{
                    position: 'absolute',
                    right: 15,
                    top: 7.5,
                }}>
                    <Image 
                        source={require('../assets/icons/outline_home_white_24dp.png')} 
                        style={{ 
                            width: 27.5,
                            height: 27.5,
                            resizeMode: 'cover',                            
                        }}
                    />
                </TouchableOpacity>
            </View>
            
            <ScrollView style={GlobalStyles.mainScrollView}>
                <Text style={[GlobalStyles.title3, {
                    margin: 10,
                }]}>Hello dear user :),</Text>
                
                <Text style={[GlobalStyles.text2, {
                    marginHorizontal: 10,
                }]}>This App is under <Text style={GlobalStyles.warningText}>development</Text>, so there will be functionalities that will not work. 
                The current version is 1.2.1</Text>
                
                <Text style={[GlobalStyles.title3, {
                    marginHorizontal: 10,
                    marginTop: 50
                }]}>Functionalities:</Text>
                
                <View style={{ marginHorizontal: 10, marginTop: 10 }}> 
                    <Text style={[GlobalStyles.title3, GlobalStyles.goodText]}>1.0.0</Text>
                    <Text style={[GlobalStyles.text2]}>- Create account</Text>
                    <Text style={[GlobalStyles.text2]}>- Edit account</Text>
                    <Text style={[GlobalStyles.text2]}>- Delete account</Text>
                    <Text style={[GlobalStyles.text2]}>- Add incomes</Text>
                    <Text style={[GlobalStyles.text2]}>- Add expenses</Text>
                </View>
                
                <View style={{ marginHorizontal: 10, marginTop: 10 }}> 
                    <Text style={[GlobalStyles.title3, GlobalStyles.goodText]}>1.1.0</Text>
                    <Text style={[GlobalStyles.text2]}>- See total reserve</Text>
                    <Text style={[GlobalStyles.text2]}>- See total incomes</Text>
                    <Text style={[GlobalStyles.text2]}>- See total expenses</Text>
                    <Text style={[GlobalStyles.text2]}>- See total transfers amount</Text>
                    <Text style={[GlobalStyles.text2]}>- See movements</Text>
                    <Text style={[GlobalStyles.text2]}>- Remove movement log</Text>
                </View>
                
                <View style={{ marginHorizontal: 10, marginTop: 10 }}> 
                    <Text style={[GlobalStyles.title3, GlobalStyles.goodText]}>1.1.1</Text>
                    <Text style={[GlobalStyles.text2]}>- See movements detail</Text>
                    <Text style={[GlobalStyles.text2]}>- Add transfer</Text>
                </View>

                <View style={{ marginHorizontal: 10, marginTop: 10 }}> 
                    <Text style={[GlobalStyles.title3, GlobalStyles.goodText]}>1.2.1</Text>
                    <Text style={[GlobalStyles.text2]}>- Light Theme</Text>
                    <Text style={[GlobalStyles.text2]}>- Spanish Version</Text>
                </View>
                
                <Text style={[GlobalStyles.text2, {textAlign:'center', marginTop: 100}]}>Developed by GMA Software</Text>
            </ScrollView>
        </View>
    );
}

export default About;