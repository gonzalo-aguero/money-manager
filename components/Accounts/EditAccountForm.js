import React, { useState } from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import GlobalStyles from '../../modules/GlobalStyles';
import { defaultSave } from '../../modules/Storage';
const EditAccountForm = (props)=>{
    const dataKey = props.dataKey;//string
    let accounts = props.accounts;//array
    const getAccounts = props.getAccounts;//method
    const displayEditAccountForm = props.displayEditAccountForm;//method
    const selectedAccount =  accounts.find( account => account.id === props.selectedAccountId);//Object
    const [accountNameInputText, setAccountNameInputText] = useState(selectedAccount.name);
    const [accountReserveInputText, setaccountReserveInputText] = useState(selectedAccount.reserve.toString());
    const [accountDescriptionInputText, setAccountDescriptionInputText] = useState(selectedAccount.description);
    // const [accountName, setAccountName] = useState("");
    // const [accountReserve, setAccountReserve] = useState("");
    // const [accountDescription, setAccountDescription] = useState("");
    const saveChangesButtonHandler = async ()=>{
        const index = accounts.indexOf(selectedAccount);
        if(index !== -1){
            accounts[index] = {
                id: selectedAccount.id,
                name: accountNameInputText,
                reserve: parseFloat(accountReserveInputText),
                description: accountDescriptionInputText
            };
        }
        await defaultSave(accounts, dataKey);
        displayEditAccountForm(false);
        getAccounts();
    }
    console.log("hola")
    return (
        <View style={GlobalStyles.form}>
            <Text style={GlobalStyles.title2}>Edit account</Text>
            <TextInput 
                style={GlobalStyles.formInput}
                placeholder="Account name"
                value={accountNameInputText}
                placeholderTextColor={GlobalStyles.formInputPlaceHolder.color}
                onChangeText={ value => {
                    // setAccountName(value);
                    setAccountNameInputText(value);
                }}
            />
            <TextInput 
                style={GlobalStyles.formInput}
                placeholder="Account reserve (Example: 17489.99)"
                value={accountReserveInputText}
                placeholderTextColor={GlobalStyles.formInputPlaceHolder.color}
                onChangeText={ value => {
                    if(isNaN(value)){
                        value = 0;
                    }else{
                        // setAccountReserve(value);
                        setaccountReserveInputText(value);
                    }
                }}
            />
            <TextInput 
                style={GlobalStyles.formInput}
                placeholder="Account description"
                value={accountDescriptionInputText}
                placeholderTextColor={GlobalStyles.formInputPlaceHolder.color}
                multiline={true}
                maxLength={100}
                onChangeText={ value => {
                    // setAccountDescription(value);
                    setAccountDescriptionInputText(value);
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