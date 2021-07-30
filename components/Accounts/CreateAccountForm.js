import React, { useState } from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import GlobalStyles from '../../modules/GlobalStyles';
import { defaultSave } from '../../modules/Storage';
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

        // Calculate the new ID.
        let newId = currentAccounts !== null ? currentAccounts.length + 1 : 1;
        let index = currentAccounts.findIndex( account => account.id === newId);
        console.log("New ID:",newId);
        if(index !== -1){
            newId = 0;
            do {
                newId++;
                index = currentAccounts.findIndex( account => account.id === newId);
                console.log("New ID reiterada:",newId);
            } while (index !== -1); 
        }
        
        currentAccounts.push({
            id: newId,
            name: accountName,
            reserve: parseFloat(accountReserve),
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
                    if(isNaN(value)){
                        value = 0;
                    }else{
                        setAccountReserve(value);
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
                    setAccountDescription(value);
                    setAccountDescriptionInputText(value);
                }}
            />
            <TouchableOpacity
                onPress={ submitButtonHandler }
                style={[GlobalStyles.goodBG, GlobalStyles.formSubmitButton]}
            >
                <Text style={GlobalStyles.formSubmitButtonText}>Create</Text>
            </TouchableOpacity>
        </View>
    );
}
export default CreateAccountForm;