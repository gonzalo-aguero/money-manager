import React, { useState, useEffect } from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import GlobalStyles, { pickerSelectStyles } from '../../modules/GlobalStyles';
import { AccountHooks } from '../../hooks/hooks';
import { useCreateLog, useLogTypes } from '../../hooks/LogHooks';
import { defaultSave } from '../../modules/Storage';
import RNPickerSelect from 'react-native-picker-select';

const AddExpenseForm = (props)=>{
    const getExpenses = props.getExpenses;//Method.
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
            reserve: (affectedAccount.reserve - amount),
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
        await useCreateLog({
            affectedAccount: affectedAccount.name,
            type: useLogTypes.expense,
            amount: amount,
            source: source,
            note: note
        });
        getExpenses();
        setAmount("");
        setSource("");
        setNote("")
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
            <Text style={GlobalStyles.title2}>Add a new expense</Text>
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