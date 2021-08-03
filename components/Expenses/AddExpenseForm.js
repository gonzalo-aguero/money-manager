import React, { useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert, StyleSheet} from 'react-native';
import GlobalStyles, { Global } from '../../modules/GlobalStyles';

// import { accountsDataKey, getAccounts } from '../../views/Accounts';
import { AccountHooks } from '../../hooks/hooks';

import { defaultSave } from '../../modules/Storage';
//import DropDown, { Select, Option, OptionList } from 'react-native-selectme';
import RNPickerSelect from 'react-native-picker-select';
const AddExpenseForm = (props)=>{
    const dataKey = props.dataKey;
    const getExpenses = props.getExpenses;

    const [accounts,setAccounts] = useState([]);
    // const [accountsForSelect, setAccountsForSelect] = useState([]);

    // const [affectedAccountInputText, setAffectedAccountInputText] = useState("");
    // const [amountInputText, setAmountInputText] = useState("");
    // const [noteInputText, setNoteInputText] = useState("");

    const [affectedAccount, setAffectedAccount] = useState("");//account id
    const [amount, setAmount] = useState("");
    const [source, setSource] = useState("");
    const [note, setNote] = useState("");
    const addButtonHandler = async ()=>{
        //Data of the account to affect.
        const accountData = accounts.find( account => account.id === affectedAccount);
        //New data of the account to affect.
        const newAccountData = {
            id: accountData.id,
            name: accountData.name,
            reserve: (accountData.reserve - amount),
            description: accountData.description
        };
        //New array of accounts with the affected account.
        let newAccountsArray = accounts;
        newAccountsArray.findIndex( account => account === accountData);
        console.log(newAccountData);
        // await defaultSave(currentAccounts, dataKey);
        Alert.alert("Success!");
        setAmount("");
        setSource("");
        setNote("")
        getExpenses();
    }
    const getAccounts = async ()=>{
        const gettedAccounts = await AccountHooks.useGetAccounts();
        setAccounts(gettedAccounts);
    }
    const accountSelector = ()=>{
        const accountsForSelect = accounts.map( account => {
            return {label: account.name, value: account.id};
        }); 
        return(
            <View style={[GlobalStyles.formInput, pickerSelectStyles.container]}>
                <RNPickerSelect
                    items={accountsForSelect}
                    style={pickerSelectStyles}
                    onValueChange={ value => {
                        setAffectedAccount(value);
                    }}
                    placeholder={{
                        label: 'Select the account to affect',
                        value: null
                    }}
                />
            </View>
        );
    }
    useEffect(()=>{
        getAccounts();
    }, []);
    return (
        <View style={GlobalStyles.form}>
            <Text style={GlobalStyles.title2}>Add a new expense</Text>
            {/* Account selector */}
            { accounts.length > 0 ? accountSelector() : <Text style={[GlobalStyles.badText, {textAlign: 'center'}]}>You don't have accounts yet</Text>}
            {/* Amount Input */}
            <TextInput 
                style={GlobalStyles.formInput}
                placeholder="Amount (Example: 17489.99)"
                value={amount}
                placeholderTextColor={GlobalStyles.formInputPlaceHolder.color}
                onChangeText={ value => {
                    if(isNaN(value)){
                        value = 0;
                    }else{
                        setAmount(value);
                    }
                }}
            />
            {/* Expense source input */}
            <TextInput 
                style={GlobalStyles.formInput}
                placeholder="Source (Example: Shopping, Friends, Food, etc)"
                value={source}
                placeholderTextColor={GlobalStyles.formInputPlaceHolder.color}
                onChangeText={ value => {
                    setSource(value);
                }}
            />
            {/* Note input */}
            <TextInput 
                style={GlobalStyles.formInput}
                placeholder="Note"
                value={note}
                placeholderTextColor={GlobalStyles.formInputPlaceHolder.color}
                multiline={true}
                maxLength={500}
                onChangeText={ value => {
                    setNote(value);
                }}
            />
            {/* Submit button */}
            <TouchableOpacity
                onPress={ addButtonHandler }
                style={[GlobalStyles.goodBG, GlobalStyles.formSubmitButton]}
            >
                <Text style={GlobalStyles.formSubmitButtonText}>Add</Text>
            </TouchableOpacity>
        </View>
    );
}
export default AddExpenseForm;
const pickerSelectStyles = StyleSheet.create({
    container: {
        paddingVertical: 7.5,
        paddingHorizontal: 0,
    },
    inputIOS: {
        backgroundColor: 'red',
        borderWidth: 0.5,
        borderColor: 'white',
        color: 'white',
    },
    inputAndroid: {
        backgroundColor: 'red',
        borderWidth: 0.5,
        borderColor: 'white',
        color: 'white',
    },
});