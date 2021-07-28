import React, { useState } from 'react';
import {View, Text, Alert, TextInput, TouchableOpacity} from 'react-native';
import GlobalStyles from '../../modules/GlobalStyles';
import { defaultSave, defaultGet } from '../../modules/Storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
const CreateAccountForm = (props)=>{
    const dataKey = props.dataKey;
    const getAccounts = props.getAccounts;
    let currentAccounts = props.accounts;
    const [accountNameInputText, setAccountNameInputText] = useState("");
    const [accountReserveInputText, setaccountReserveInputText] = useState("");
    const [accountDescriptionInputText, setAccountDescriptionInputText] = useState("");
    const [accountName, setAccountName] = useState("");
    const [accountReserve, setAccountReserve] = useState("");
    const [accountDescription, setAccountDescription] = useState("");
    const submitButtonHandler = async ()=>{
        if(currentAccounts === null){
            currentAccounts = [];
        }
        currentAccounts.push({
            id: currentAccounts !== null ? currentAccounts.length + 1 : 1,
            name: accountName,
            reserve: accountReserve,
            description: accountDescription
        });
        await defaultSave(currentAccounts, dataKey);
        setAccountNameInputText("");
        setaccountReserveInputText("");
        setAccountDescriptionInputText("");
        getAccounts();
    }
    return (
        <View style={GlobalStyles.form}>
            <Text style={GlobalStyles.title2}>Create a new account</Text>
            <TextInput 
                style={GlobalStyles.formInput}
                placeholder="Account name"
                value={accountNameInputText}
                placeholderTextColor={GlobalStyles.formInputPlaceHolder.color}
                onChangeText={ value => {
                    setAccountName(value);
                    setAccountNameInputText(value);
                }}
            />
            <TextInput 
                style={GlobalStyles.formInput}
                placeholder="Account reserve (Example: 17489.99)"
                value={accountReserveInputText}
                placeholderTextColor={GlobalStyles.formInputPlaceHolder.color}
                onChangeText={ value => {
                    setAccountReserve(value);
                    setaccountReserveInputText(value);
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
                    setAccountDescription(value);
                    setAccountDescriptionInputText(value);
                }}
            />
            <TouchableOpacity
                title="Submit"
                onPress={ submitButtonHandler }
                color={GlobalStyles.goodBG.backgroundColor}
                style={[GlobalStyles.goodBG, GlobalStyles.formSubmitButton]}
            >
                <Text style={GlobalStyles.formSubmitButtonText}>Create</Text>
            </TouchableOpacity>
        </View>
    );
}
export default CreateAccountForm;