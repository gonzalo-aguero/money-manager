import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import GlobalStyles, { pickerSelectStyles } from '../../modules/GlobalStyles';
import { AccountHooks } from '../../hooks/hooks';
import { useCreateLog, useLogTypes } from '../../hooks/LogHooks';
import { defaultSave } from '../../modules/Storage';
import RNPickerSelect from 'react-native-picker-select';
const AddTransferForm = (props)=>{
    const getTransfers = props.getTransfers;//Method.
    const [accounts,setAccounts] = useState([]);
    const [issuingAccountId, setIssuingAccountId] = useState("");
    const [receiverAccountId, setReceiverAccountId] = useState("");
    const [amount, setAmount] = useState("");
    const [source, setSource] = useState("");
    const [note, setNote] = useState("");
    const addButtonHandler = async ()=>{
        //Data of the issuing account.
        const issuingAccount = accounts.find( account => account.id === issuingAccountId);       
        //New data of the issuing account.
        const newIssuingAccountData = {
            id: issuingAccount.id,
            name: issuingAccount.name,
            reserve: (Number.parseFloat(issuingAccount.reserve) - Number.parseFloat(amount)),
            description: issuingAccount.description
        };

        //Data of the receiver account.
        const receiverAccount = accounts.find( account => account.id === receiverAccountId); 
        //New data of the receiver account.
        const newReceiverAccountData = {
            id: receiverAccount.id,
            name: receiverAccount.name,
            reserve: (Number.parseFloat(receiverAccount.reserve) + Number.parseFloat(amount)),
            description: receiverAccount.description
        };

        //New array of accounts with the affected account (array to save).
        let newAccountsArray = accounts;
        const issuingAcountIndex = newAccountsArray.findIndex( account => account === issuingAccount);
        const receiverAccountIndex = newAccountsArray.findIndex( account => account === receiverAccount);

        if(issuingAcountIndex !== -1){
            newAccountsArray[issuingAcountIndex] = newIssuingAccountData;
        }else{
            console.error("Issuing account not found.");
            return;
        }
        if(receiverAccountIndex !== -1){
            newAccountsArray[receiverAccountIndex] = newReceiverAccountData;
        }else{
            console.error("Receiver account not found.");
            return;
        }

        await defaultSave(newAccountsArray, AccountHooks.useDataKey);
        await useCreateLog({
            affectedAccount: {
                from: issuingAccount.name,
                to: receiverAccount.name,
            },
            type: useLogTypes.transfer,
            amount: amount,
            source: source,
            note: note
        });
        getTransfers();
        setAmount("");
        setSource("");
        setNote("")
    }
    const getAccounts = async ()=>{
        setAccounts(await AccountHooks.useGetAccounts());
    }
    const issuingAccountSelector = ()=>{
        const accountsForSelect = accounts.map( account => {
            return {label: account.name, value: account.id};
        }); 
        return(
            <View style={[GlobalStyles.formInput, pickerSelectStyles.container]}>
                <RNPickerSelect
                    items={accountsForSelect}
                    style={pickerSelectStyles}
                    onValueChange={ value => {
                        setIssuingAccountId(value);
                    }}
                    placeholder={{
                        label: 'Select the issuing account',
                        value: null
                    }}
                />
            </View>
        );
    }
    const receiverAccountSelector = ()=>{
        const accountsForSelect = accounts.map( account => {
            return {label: account.name, value: account.id};
        }); 
        return(
            <View style={[GlobalStyles.formInput, pickerSelectStyles.container]}>
                <RNPickerSelect
                    items={accountsForSelect}
                    style={pickerSelectStyles}
                    onValueChange={ value => {
                        setReceiverAccountId(value);
                    }}
                    placeholder={{
                        label: 'Select the receiver account',
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
            <Text style={GlobalStyles.title2}>Add a new transfer</Text>
            {/* Issuing account selector */}
            { accounts.length > 0 ? issuingAccountSelector() : <Text style={[GlobalStyles.badText, {textAlign: 'center'}]}>You don't have accounts yet</Text>}
            {/* Issuing account selector */}
            { accounts.length > 0 ? receiverAccountSelector() : <Text style={[GlobalStyles.badText, {textAlign: 'center'}]}>You don't have accounts yet</Text>}
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
            {
                amount <= 0 
                ? <Text style={[GlobalStyles.badText, {textAlign: 'center'}]}>Amount must be greater than 0</Text>
                : null
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
export default AddTransferForm;