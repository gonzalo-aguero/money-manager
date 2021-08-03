import React, { useState } from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import GlobalStyles from '../../modules/GlobalStyles';
import { defaultSave } from '../../modules/Storage';
import { AccountHooks } from '../../hooks/hooks';
const EditAccountForm = (props)=>{
    let accounts = props.accounts;//Array[]
    const getAccounts = props.getAccounts;//Method()
    const displayEditAccountForm = props.displayEditAccountForm;//method
    const selectedAccount =  accounts.find( account => account.id === props.selectedAccountId);//Object

    const [accountName, setAccountName] = useState("" + selectedAccount.name);
    const [accountReserve, setaccountReserve] = useState("" + selectedAccount.reserve);
    const [accountDescription, setAccountDescription] = useState("" + selectedAccount.description);

    const saveChangesButtonHandler = async ()=>{
        const index = accounts.indexOf(selectedAccount);
        if(index !== -1){
            accounts[index] = {
                id: selectedAccount.id,
                name: accountName,
                reserve: accountReserve !== "" ? Number.parseFloat(accountReserve) : 0,
                description: accountDescription
            };
        }
        await defaultSave(accounts, AccountHooks.useDataKey);
        displayEditAccountForm(false);
        getAccounts();
    }
    return (
        <View style={GlobalStyles.form}>
            <Text style={GlobalStyles.title2}>Edit account</Text>
            <TextInput 
                style={GlobalStyles.formInput}
                placeholder="Account name"
                value={accountName}
                placeholderTextColor={GlobalStyles.formInputPlaceHolder.color}
                onChangeText={ value => {
                    setAccountName(value);
                }}
            />
            <TextInput 
                style={GlobalStyles.formInput}
                placeholder="Account reserve (Example: 17489.99)"
                value={"" + accountReserve}
                placeholderTextColor={GlobalStyles.formInputPlaceHolder.color}
                onChangeText={ value => {
                    if( isNaN(value) === true|| value == "" || value == null ){
                        value = "0";
                    }
                    setaccountReserve(value);
                }}
            />
            <TextInput 
                style={GlobalStyles.formInput}
                placeholder="Account description"
                value={accountDescription}
                placeholderTextColor={GlobalStyles.formInputPlaceHolder.color}
                multiline={true}
                maxLength={100}
                onChangeText={ value => {
                    setAccountDescription(value);
                }}
            />
            <TouchableOpacity
                onPress={ saveChangesButtonHandler }
                style={[GlobalStyles.goodBG, GlobalStyles.formSubmitButton]}
            >
                <Text style={GlobalStyles.formSubmitButtonText}>Save changes</Text>
            </TouchableOpacity>
        </View>
    );
}
export default EditAccountForm;