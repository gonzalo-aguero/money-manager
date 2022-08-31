import React, { useState, useEffect } from 'react';
import {View, Text, TextInput, TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import GlobalStyles, { pickerSelectStyles, Colors } from '../../modules/GlobalStyles';
import { AccountHooks } from '../../hooks/hooks';
import { useCreateLog, useLogTypes } from '../../hooks/LogHooks';
import { defaultSave } from '../../modules/Storage';
import lang from '../../lang/localization';
import * as Localization from 'expo-localization';
const AddExpenseForm = (props)=>{
    const [locale, setLocale] = useState(Localization.locale.split('-')[0]);
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
        
        props.displayAddExpenseForm(false);
        props.getExpenses();
        setAmount("");
        setSource("");
        setNote("")
    }
    
    const getAccounts = async ()=>{
        setAccounts(await AccountHooks.useGetAccounts());
    }
    
    const accountSelector = ()=>{
        const accountsForSelect = accounts.map( account => {
            return <Picker.Item color={Colors.inputColor} label={account.name} value={account.id}/>;
        }); 
        
        return(
            <View style={[GlobalStyles.formInput, pickerSelectStyles.container]}>
                <Picker
                    selectedValue={affectedAccountId}
                    onValueChange={(value, itemIndex) => setAffectedAccountId(value)}
                >
                    <Picker.Item color={Colors.inputColor} label={ lang[locale].forms.selectAccount } value="null" />
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
            <Text style={GlobalStyles.title2}>{ lang[locale].expenses.formTitle }</Text>
            
            {/* Account selector */}
            { accounts.length > 0 ? accountSelector() : <Text style={[GlobalStyles.badText, {textAlign: 'center'}]}>You don't have accounts yet</Text>}
            
            {/* Amount Input */}
            <TextInput 
                style={GlobalStyles.formInput}
                placeholder={ lang[locale].forms.amount }
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
                <Text style={[GlobalStyles.badText, {textAlign: 'center'}]}>{ lang[locale].forms.greaterThan }0</Text>
                :
                null
            }

            {/* Expense source input */}
            <TextInput 
                style={GlobalStyles.formInput}
                placeholder={ lang[locale].forms.expenseSource }
                value={source}
                placeholderTextColor={GlobalStyles.formInputPlaceHolder.color}
                onChangeText={ value => {
                    setSource(value);
                }}
            />

            {/* Note input */}
            <TextInput 
                style={GlobalStyles.formInput}
                placeholder={ lang[locale].forms.note }
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
                <Text style={GlobalStyles.formSubmitButtonText}>{ lang[locale].buttons.add }</Text>
            </TouchableOpacity>
        </View>
    );
}
export default AddExpenseForm;