import React, { useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert, StyleSheet} from 'react-native';
import GlobalStyles, { Global } from '../../modules/GlobalStyles';
import { accountsDataKey, getAccounts } from '../../views/Accounts';
import { defaultSave } from '../../modules/Storage';
//import DropDown, { Select, Option, OptionList } from 'react-native-selectme';
import RNPickerSelect from 'react-native-picker-select';
const AddExpenseForm = (props)=>{
    const dataKey = props.dataKey;
    const getExpenses = props.getExpenses;

    const [accounts,setAccounts] = useState([]);
    const [accountsForSelect, setAccountsForSelect] = useState([]);

    const [affectedAccountInputText, setAffectedAccountInputText] = useState("");
    const [amountInputText, setAmountInputText] = useState("");
    const [sourceInputText, setSourceInputText] = useState("");
    const [noteInputText, setNoteInputText] = useState("");

    const [affectedAccount, setAffectedAccount] = useState("");
    const [amount, setAmount] = useState("");
    const [source, setSource] = useState("");
    const [note, setNote] = useState("");
    const addButtonHandler = async ()=>{
        // await defaultSave(currentAccounts, dataKey);
        Alert.alert("Success!");
        setAffectedAccountInputText("");
        setAmountInputText("");
        setSourceInputText("");
        setNoteInputText("")
        getExpenses();
    }
    useEffect(()=>{
        getAccounts(setAccounts);
        setAccountsForSelect(accounts.map( account => {
            return {label: account.name, value: account.id};
        }));
        console.log(accountsForSelect);
        
    });
    return (
        <View style={GlobalStyles.form}>
            <Text style={GlobalStyles.title2}>Add a new expense</Text>
            {/*<TextInput 
                style={GlobalStyles.formInput}
                placeholder="Affected acount"
                value={affectedAccountInputText}
                placeholderTextColor={GlobalStyles.formInputPlaceHolder.color}
                onChangeText={ value => {
                    // setAffectedAccount(value);
                    setAffectedAccountInputText(value);
                }}
            />*/}
            {/*<Select>
                <Option>Hola</Option>
            </Select>*/}
            <View style={[GlobalStyles.formInput, pickerSelectStyles.container]}>
                { accountsForSelect.length < 1 ? null : 
                    <RNPickerSelect
                        items={accountsForSelect}
                        style={pickerSelectStyles}
                        onValueChange={ value => {
                            console.log("Selected value: \""+value+"\"");
                            setAffectedAccountInputText(value);
                        }}
                        placeholder={{
                            label: 'Select the account to affect',
                            value: null
                        }}
                    />
                }
            </View>
            <TextInput 
                style={GlobalStyles.formInput}
                placeholder="Amount (Example: 17489.99)"
                value={amountInputText}
                placeholderTextColor={GlobalStyles.formInputPlaceHolder.color}
                onChangeText={ value => {
                    if(isNaN(value)){
                        value = 0;
                    }else{
                        // setAmount(value);
                        setAmountInputText(value);
                    }
                }}
            />
            <TextInput 
                style={GlobalStyles.formInput}
                placeholder="Source (Example: Shopping, Friends, Food, etc)"
                value={sourceInputText}
                placeholderTextColor={GlobalStyles.formInputPlaceHolder.color}
                onChangeText={ value => {
                    // setSource(value);
                    setSourceInputText(value);
                }}
            />
            <TextInput 
                style={GlobalStyles.formInput}
                placeholder="Note"
                value={noteInputText}
                placeholderTextColor={GlobalStyles.formInputPlaceHolder.color}
                multiline={true}
                maxLength={500}
                onChangeText={ value => {
                    // setNote(value);
                    setNoteInputText(value);
                }}
            />
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