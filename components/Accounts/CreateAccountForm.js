import React, { useState } from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import GlobalStyles from '../../modules/GlobalStyles';
import { defaultSave } from '../../modules/Storage';
import { AccountHooks, useCalculateId, useLang} from '../../hooks/hooks';

const CreateAccountForm = (props)=>{
    let currentAccounts = props.accounts;//Array[]
    const getAccounts = props.getAccounts;//Method()
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

        // Calculate the new ID.
        const newId = useCalculateId(currentAccounts);
        if(newId === false){
            Alert.alert("Oh no!","An error has ocurred!");
            return;
        }
        
        currentAccounts.push({
            id: newId,
            name: accountName,
            reserve: accountReserve !== "" ? Number.parseFloat(accountReserve) : 0,
            description: accountDescription
        });
        await defaultSave(currentAccounts, AccountHooks.useDataKey);
        setAccountNameInputText("");
        setaccountReserveInputText("");
        setAccountDescriptionInputText("");
        getAccounts();
    }
    return (
        <View style={GlobalStyles.form}>
            <Text style={GlobalStyles.title2}>{ useLang().accounts.formTitle }</Text>
            <TextInput
                style={GlobalStyles.formInput}
                placeholder={ useLang().forms.accountName }
                value={accountNameInputText}
                placeholderTextColor={GlobalStyles.formInputPlaceHolder.color}
                onChangeText={ value => {
                    setAccountName(value);
                    setAccountNameInputText(value);
                }}
            />
            <TextInput 
                style={GlobalStyles.formInput}
                placeholder={ useLang().forms.accountReserve }
                value={accountReserveInputText}
                placeholderTextColor={GlobalStyles.formInputPlaceHolder.color}
                onChangeText={ value => {
                    if( isNaN(value) === true|| value == "" || value == null ){
                        value = "0";
                    }
                    setAccountReserve(value);
                    setaccountReserveInputText(value);
                }}
            />
            <TextInput 
                style={GlobalStyles.formInput}
                placeholder={ useLang().forms.accountDescription }
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
                onPress={ submitButtonHandler }
                style={[GlobalStyles.goodBG, GlobalStyles.formSubmitButton]}
            >
                <Text style={GlobalStyles.formSubmitButtonText}>{ useLang().buttons.create }</Text>
            </TouchableOpacity>
        </View>
    );
}
export default CreateAccountForm;