import React, { useState } from 'react';
import {View, ScrollView, Text, FlatList,TouchableOpacity, Alert, Button} from 'react-native';
import MainMenu from '../../components/MainMenu/MainMenu';
import Styles,{ createTableStyles } from '../styles';
import AccountStyles from './styles';
import { printAmount } from '../../modules/Number';
import { defaultSave, defaultGet } from '../../modules/Storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Accounts = (props)=>{
    const dataKey = "accounts";
    const dataForChildren = props.dataForChildren;
    const tableStyles = createTableStyles(3);
    const [accounts, setAccounts] = useState([]);
    const createAccount = async ()=>{
        let newAccountsArray = accounts;
        if(newAccountsArray === null){
            newAccountsArray = [];
        }
        newAccountsArray.push({
            id: accounts !== null ? accounts.length+1 : 1,
            name: "Patagonia Bank",
            description: "Without description",
            reserve: 17500
        })
        await defaultSave(newAccountsArray, dataKey);
        getAccounts();
    }
    const getAccounts = async ()=>{
        setAccounts(await defaultGet(dataKey));
        console.log("--")
    }
    getAccounts();
    return (
        <View style={Styles.mainContainer}>
            <Text style={Styles.title}>Accounts ({accounts !== null ? accounts.length : 0})</Text>
            <FlatList 
                data={accounts}
                style={tableStyles.table}
                ListHeaderComponent={()=>(
                    <View style={tableStyles.tableRow}>
                        <Text style={tableStyles.tableHeadCell}>Name</Text>
                        <Text style={tableStyles.tableHeadCell}>Reserve</Text>
                        <Text style={tableStyles.tableHeadCell}>Description</Text>
                    </View>
                )}
                renderItem={({ item, index}) => (
                    <View style={tableStyles.tableRow}>
                        <Text style={tableStyles.tableCell}>{item.name}</Text>
                        <Text style={[tableStyles.tableCell,Styles.goodText]}>{printAmount(item.reserve)}</Text>
                        <Text style={tableStyles.tableCell}>{item.description}</Text>
                    </View>
                )}
                ListEmptyComponent={({}) => (
                    <View style={tableStyles.tableRow}>
                        <Text style={tableStyles.tableCell}>No accounts created</Text>
                    </View>
                )}
            />
            <View style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly',width:'100%'}}>
                <Button color="green" title="Create account" onPress={async ()=> {
                        createAccount();
                    }}></Button>
                <Button color="red" title="Delete all" onPress={async ()=> {
                    await AsyncStorage.clear();
                    getAccounts();
                    }}></Button>
            </View>
            
            <MainMenu dataForChildren={dataForChildren} ></MainMenu>
        </View>
    );
}
export default Accounts;