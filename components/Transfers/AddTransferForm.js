import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import GlobalStyles, { pickerSelectStyles, Colors } from '../../modules/GlobalStyles';
import { AccountHooks, useLang } from '../../hooks/hooks';
import { useCreateLog, useLogTypes } from '../../hooks/LogHooks';
import { defaultSave } from '../../modules/Storage';

const AddTransferForm = (props)=>{
    const [accounts,setAccounts] = useState([]);
    const [issuingAccountId, setIssuingAccountId] = useState("");
    const [receiverAccountId, setReceiverAccountId] = useState("");
    const [amount, setAmount] = useState("");
    const [source, setSource] = useState("");
    const [note, setNote] = useState("");

    const addButtonHandler = async ()=>{
        //Data of the issuing account.
        const issuingAccount = accounts.find( account => account.id === issuingAccountId);       
        
        //Form validation
        if(issuingAccount.reserve < amount){
            Alert.alert("Error", 
                useLang().transfers.notEnoughReserve.main 
                +'\n'+ useLang().transfers.notEnoughReserve.theReserveOf 
                + issuingAccount.name + useLang().transfers.notEnoughReserve.is
                + issuingAccount.reserve + useLang().transfers.notEnoughReserve.end
            );
            return;
        }
        if(amount <= 0){
            Alert.alert("Error", useLang().forms.greaterThan + 0 + '.');
            return;
        }

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
        
        props.displayAddTransferForm(false);
        props.getTransfers();
        setAmount("");
        setSource("");
        setNote("")
    }
   
    const getAccounts = async ()=>{
        setAccounts(await AccountHooks.useGetAccounts());
    }
    
    const issuingAccountSelector = ()=>{
        const accountsForSelect = accounts.map( account => {
            return <Picker.Item color={Colors.inputColor} label={account.name} value={account.id}/>;
        }); 
        
        return(
            <View style={[GlobalStyles.formInput, pickerSelectStyles.container]}>
                <Picker
                    selectedValue={issuingAccountId}
                    onValueChange={(value, itemIndex) => setIssuingAccountId(value)}
                >
                    <Picker.Item color={Colors.inputColor} label={ useLang().forms.selectIssuing } value="null" />
                    {accountsForSelect}
                </Picker>
            </View>
        );
    }
    
    const receiverAccountSelector = ()=>{
        const accountsForSelect = accounts.map( account => {
            return <Picker.Item color={Colors.inputColor} label={account.name} value={account.id}/>;
        }); 
        
        return(
            <View style={[GlobalStyles.formInput, pickerSelectStyles.container]}>
                <Picker
                    selectedValue={receiverAccountId}
                    onValueChange={(value, itemIndex) => setReceiverAccountId(value)}
                >
                    <Picker.Item label={ useLang().forms.selectReceiver } value="null" />
                    {accountsForSelect}
                </Picker>
            </View>
        );
    }
    
    useEffect(()=>{
        getAccounts();
    }, []);
    
    return (
        <View style={GlobalStyles.form}>
            <Text style={GlobalStyles.title2}>{ useLang().transfers.formTitle }</Text>
            {/* Issuing account selector */}
            { accounts.length > 0 ? issuingAccountSelector() : <Text style={[GlobalStyles.badText, {textAlign: 'center'}]}>{ useLang().tables.noRecords.accounts }</Text>}
            
            {/* Issuing account selector */}
            { accounts.length > 0 ? receiverAccountSelector() : <Text style={[GlobalStyles.badText, {textAlign: 'center'}]}>{ useLang().tables.noRecords.accounts }</Text>}
            
            {/* Amount Input */}
            <TextInput 
                style={GlobalStyles.formInput}
                placeholder={ useLang().forms.amount }
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
                ? <Text style={[GlobalStyles.badText, {textAlign: 'center'}]}>{useLang().forms.greaterThan }0</Text>
                : null
            }

            {/* Expense source input */}
            <TextInput 
                style={GlobalStyles.formInput}
                placeholder={ useLang().forms.source }
                value={source}
                placeholderTextColor={GlobalStyles.formInputPlaceHolder.color}
                onChangeText={ value => {
                    setSource(value);
                }}
            />

            {/* Note input */}
            <TextInput 
                style={GlobalStyles.formInput}
                placeholder={ useLang().forms.note }
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
                <Text style={GlobalStyles.formSubmitButtonText}>{ useLang().buttons.add }</Text>
            </TouchableOpacity>
        </View>
    );
}

export default AddTransferForm;
