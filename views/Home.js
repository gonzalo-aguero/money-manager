import React from 'react';
import {View, Text, ScrollView, FlatList} from 'react-native';
import GlobalStyles from '../modules/GlobalStyles';
const Home = ()=>{
    return (
        <View style={GlobalStyles.mainContainer}>
            <Text style={GlobalStyles.title}>Home</Text>
            <ScrollView style={GlobalStyles.mainScrollView}>
                <Text style={[GlobalStyles.title3, {
                    margin: 10,
                }]}>Hello dear user,</Text>
                <Text style={[GlobalStyles.text2, {
                    marginHorizontal: 10,
                }]}>This App is under <Text style={GlobalStyles.warningText}>development</Text>, so there will be functionalities that will not work.</Text>
                
                <Text style={[GlobalStyles.title3, {
                    marginHorizontal: 10,
                    marginTop: 50
                }]}>Things you can do:</Text>
                <View style={{
                    marginHorizontal: 10,
                    marginTop: 10
                }}>
                    <Text style={[GlobalStyles.text2, GlobalStyles.goodText]}>- Create account</Text>
                    <Text style={[GlobalStyles.text2, GlobalStyles.goodText]}>- Edit account</Text>
                    <Text style={[GlobalStyles.text2, GlobalStyles.goodText]}>- Delete account</Text>
                    <Text style={[GlobalStyles.text2, GlobalStyles.goodText]}>- Add incomes</Text>
                    <Text style={[GlobalStyles.text2, GlobalStyles.badText]}>- Edit incomes</Text>
                    <Text style={[GlobalStyles.text2, GlobalStyles.badText]}>- Remove incomes</Text>
                    <Text style={[GlobalStyles.text2, GlobalStyles.goodText]}>- Add expenses</Text>
                    <Text style={[GlobalStyles.text2, GlobalStyles.badText]}>- Edit incomes</Text>
                    <Text style={[GlobalStyles.text2, GlobalStyles.badText]}>- Remove incomes</Text>
                    <Text style={[GlobalStyles.text2, GlobalStyles.badText]}>- See logs</Text>
                    <Text style={[GlobalStyles.text2, GlobalStyles.badText]}>- remove logs</Text>
                    <Text style={[GlobalStyles.text2, GlobalStyles.badText]}>- Do transfer</Text>
                </View>
            </ScrollView>
        </View>
    );
}
export default Home;