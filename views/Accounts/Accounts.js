import React, { useEffect, useState } from 'react';
import {View, ScrollView, Text, FlatList,TouchableOpacity, Alert, Button} from 'react-native';
import MainMenu from '../../components/MainMenu/MainMenu';
import CreateAccountForm from '../../components/Accounts/CreateAccountForm';
import GlobalStyles,{ createTableStyles } from '../../modules/GlobalStyles';
import { printAmount } from '../../modules/Number';
import { defaultSave, defaultGet } from '../../modules/Storage';
const Accounts = (props)=>{
    const dataKey = "accounts";
    const dataForChildren = props.dataForChildren;
    const tableStyles = createTableStyles(3);
    const [createAccountForm, displayCreateAccountForm] = useState(false);//True to display create account form.
    const [accounts, setAccounts] = useState([]);
    const [selectedAccount, selectAccount] = useState(false);
    const getAccounts = async ()=>{
        const result = await defaultGet(dataKey);
        setAccounts(result);
    }
    const deleteAccount = async ()=>{
        console.log(`Cuenta ${selectedAccount} eliminada`);
        getAccounts();
    }
    useEffect(() => {
        getAccounts();
    }, []);
    return (
        <View style={GlobalStyles.mainContainer}>
            <Text style={GlobalStyles.title}>Accounts ({accounts !== null ? accounts.length : 0})</Text>
            <FlatList 
                data={accounts}
                style={tableStyles.table}
                ListHeaderComponent={()=>(
                    // List header
                    <View style={tableStyles.tableRow}>
                        <Text style={tableStyles.tableHeadCell}>Name</Text>
                        <Text style={tableStyles.tableHeadCell}>Reserve</Text>
                        <Text style={tableStyles.tableHeadCell}>Description</Text>
                    </View>
                )}
                renderItem={({ item }) => (
                    // List item
                    <TouchableOpacity style={[tableStyles.tableRow, (selectedAccount === item.id ? tableStyles.selectedItem : null )]} onPress={ ()=> selectAccount(item.id) }>
                        <Text style={tableStyles.tableCell}>{item.name}</Text>
                        <Text style={[tableStyles.tableCell,GlobalStyles.goodText]}>{printAmount(item.reserve)}</Text>
                        <Text style={tableStyles.tableCell}>{item.description}</Text>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={({}) => (
                    // Empty list message
                    <View style={tableStyles.tableRow}>
                        <Text style={tableStyles.tableCell}>No accounts created</Text>
                    </View>
                )}
            />
            <ScrollView style={GlobalStyles.mainScrollView}>
                { createAccountForm ? <CreateAccountForm accounts={accounts} dataKey={dataKey} getAccounts={getAccounts} /> : null }
                <View style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly',width:'100%'}}>
                    { !createAccountForm ? <Button color="green" title="Create account" onPress={ ()=> displayCreateAccountForm(true) }></Button>: null }
                    
                    <TouchableOpacity color="red" title="Delete" style={[]} disabled={!selectedAccount ? true : false} onPress={deleteAccount}>
                        <Text style={[GlobalStyles.button, GlobalStyles.badBG, (!selectedAccount ? GlobalStyles.disableButton : null)]}>DELETE</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <MainMenu dataForChildren={dataForChildren} ></MainMenu>
        </View>
    );
}
export default Accounts;