import React, { useEffect, useState } from 'react';
import {View, ScrollView, Text, FlatList, TouchableOpacity, Alert} from 'react-native';
import CreateAccountForm from '../components/Accounts/CreateAccountForm';
import EditAccountForm from '../components/Accounts/EditAccountForm';
import GlobalStyles,{ createTableStyles, Colors} from '../modules/GlobalStyles';
import { defaultSave } from '../modules/Storage';
import { AccountHooks, usePrintAmount, useLang } from '../hooks/hooks';
import { Icons, getViewIconImage } from '../modules/Global';

const Accounts = (props)=>{
    const dataForChildren = props.dataForChildren;
    const currentViewName = dataForChildren.view.viewName;
    const tableStyles = createTableStyles(3);
    const [createAccountForm, displayCreateAccountForm] = useState(false);//True to display create account form.
    const [editAccountForm, displayEditAccountForm] = useState(false);//True to display edit account form.
    const [accounts, setAccounts] = useState([]);
    const [selectedAccount, selectAccount] = useState(false);
    const getAccounts = async ()=>{
        setAccounts(await AccountHooks.useGetAccounts());
    }
    const deleteAccount = async ()=>{
        let currentAccounts = accounts;
        if(currentAccounts === null || currentAccounts.length < 1){
            return;
        }
        // Get account Object via ID and get its index. Then remove it from account array.
        const accountToDelete = currentAccounts.find( account => account.id === selectedAccount);
        const index = currentAccounts.indexOf(accountToDelete);
        Alert.alert(
            "Are your sure?",
            "Are you sure you want to remove this account?",
            [
                // The "Yes" button
                {
                text: "Yes",
                onPress: async () => {
                    currentAccounts.splice(index,1);
                    await defaultSave(currentAccounts, AccountHooks.useDataKey);
                    displayEditAccountForm(false);
                    selectAccount(false);//restart account selection to false.
                    getAccounts();
                },
                },
                // The "No" button
                // Does nothing but dismiss the dialog when tapped
                {
                text: "No",
                },
            ]
        );
    }
    useEffect(() => {
        getAccounts();
    }, []);
    return (
        <View style={GlobalStyles.mainContainer}>
            <View style={GlobalStyles.header}>
                <Text style={GlobalStyles.title}>{ useLang().accounts.title } ({accounts !== null ? accounts.length : 0})</Text>
                <TouchableOpacity onPress={()=> dataForChildren.view.setView("transfers")} style={{
                    position: 'absolute',
                    right: 15,
                    top: 7.5,
                }}>
                    {getViewIconImage(Icons.transfers, currentViewName === "transfers", GlobalStyles.activeButton)}
                </TouchableOpacity>
            </View>
            <FlatList 
                data={accounts}
                style={tableStyles.table}
                ListHeaderComponent={()=>(
                    // List header
                    <View style={tableStyles.tableRow}>
                        <Text style={tableStyles.tableHeadCell}>{ useLang().tables.account }</Text>
                        <Text style={tableStyles.tableHeadCell}>{ useLang().tables.reserve }</Text>
                        <Text style={tableStyles.tableHeadCell}>{ useLang().tables.description }</Text>
                    </View>
                )}
                renderItem={({ item }) => (
                    // List item
                    <TouchableOpacity style={[tableStyles.tableRow, (selectedAccount === item.id ? tableStyles.selectedItem : null )]} onPress={ ()=> selectAccount(item.id) }>
                        <Text style={tableStyles.tableCell}>{ item.name }</Text>
                        <Text style={[tableStyles.tableCell,GlobalStyles.goodText]}>{usePrintAmount(item.reserve)}</Text>
                        <Text style={tableStyles.tableCell}>{ item.description }</Text>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={() => (
                    // Empty list message
                    <View style={tableStyles.tableRow}>
                        <Text style={tableStyles.tableCell}>{ useLang().tables.noRecords.accounts }</Text>
                    </View>
                )}
            />

            {/* Actions buttons */}
            <View style={GlobalStyles.actionBar}>
                {/* Create account button */}
                <TouchableOpacity onPress={ ()=> !createAccountForm ? displayCreateAccountForm(true) : displayCreateAccountForm(false) }>
                    <Text style={[GlobalStyles.button, GlobalStyles.goodBG]}>{ !createAccountForm ? useLang().buttons.createAccount : useLang().buttons.hideForm }</Text>
                </TouchableOpacity>

                {/* Edit account button */}
                <TouchableOpacity disabled={!selectedAccount ? true : false} onPress={ ()=> !editAccountForm ? displayEditAccountForm(true) : displayEditAccountForm(false) }>
                    <Text style={[GlobalStyles.button, {backgroundColor: Colors.lightBlue, color: 'white'}, (!selectedAccount ? GlobalStyles.disableButton : null)]}>{ !editAccountForm ? useLang().buttons.editAccount : useLang().buttons.hideForm }</Text>
                </TouchableOpacity>
                
                {/* Delete account button */}
                <TouchableOpacity disabled={!selectedAccount ? true : false} onPress={deleteAccount}>
                    <Text style={[GlobalStyles.button, GlobalStyles.badBG, (!selectedAccount ? GlobalStyles.disableButton : null)]}>{ useLang().buttons.delete }</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={GlobalStyles.mainScrollView}>
                {/* Forms */}
                { editAccountForm ? <EditAccountForm accounts={accounts} getAccounts={getAccounts} selectedAccountId={selectedAccount} displayEditAccountForm={displayEditAccountForm} /> : null }
                { createAccountForm ? <CreateAccountForm accounts={accounts} getAccounts={getAccounts} /> : null }
            </ScrollView>
        </View>
    );
}
export default Accounts;