import React, { useState, useEffect } from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import GlobalStyles from '../../modules/GlobalStyles';
import { AccountHooks, IncomeHooks } from '../../hooks/hooks';
import { defaultSave } from '../../modules/Storage';
import RNPickerSelect from 'react-native-picker-select';
const AddIncomeForm = ()=>{
    const [accounts,setAccounts] = useState([]);
    const [affectedAccountId, setAffectedAccountId] = useState("");//account id
    const [amount, setAmount] = useState("");
    const [source, setSource] = useState("");
    const [note, setNote] = useState("");
    const addButtonHandler = async ()=>{
        //Data of the account to affect.
        const affectedAccount = accounts.find( account => account.id === affectedAccountId);
        //New data of the account to affect.
        const newAccountData = {
            id: affectedAccount.id,
            name: affectedAccount.name,
            reserve: (Number.parseFloat(affectedAccount.reserve)  + Number.parseFloat(amount)),
            description: affectedAccount.description
        };
        //New array of accounts with the affected account (array to save).
        let newAccountsArray = accounts;
        //Get the index of the account to affect.
        const index = newAccountsArray.findIndex( account => account === affectedAccount);
        if(index !== -1){
            newAccountsArray[index] = newAccountData;
        }
        await defaultSave(newAccountsArray, AccountHooks.useDataKey);
        setAmount("");
        setSource("");
        setNote("")
        IncomeHooks.useGetIncomes();
    }
    const getAccounts = async ()=>{
        setAccounts(await AccountHooks.useGetAccounts());
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
                        setAffectedAccountId(value);
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
            <Text style={GlobalStyles.title2}>Add a new income</Text>
            {/* Account selector */}
            { accounts.length > 0 ? accountSelector() : <Text style={[GlobalStyles.badText, {textAlign: 'center'}]}>You don't have accounts yet</Text>}
            {/* Amount Input */}
            <TextInput 
                style={GlobalStyles.formInput}
                placeholder="Amount (Example: 17489.99)"
                value={""+amount}
                placeholderTextColor={GlobalStyles.formInputPlaceHolder.color}
                onChangeText={ value => {
                    if(isNaN(value)){
                        value = amount;
                    }else{
                        setAmount(value);
                    }
                }}
            />
            {amount <= 0 ?
                <Text style={[GlobalStyles.badText, {textAlign: 'center'}]}>Amount must be greater than 0</Text>
                :
                null
            }
            {/* Expense source input */}
            <TextInput 
                style={GlobalStyles.formInput}
                placeholder="Source (For example: Job)"
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
export default AddIncomeForm;
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