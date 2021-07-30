import React, { useState } from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import GlobalStyles from '../../modules/GlobalStyles';
import { defaultSave } from '../../modules/Storage';
const AddExpenseForm = (props)=>{
    const dataKey = props.dataKey;
    const getExpenses = props.getExpenses;

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
    return (
        <View style={GlobalStyles.form}>
            <Text style={GlobalStyles.title2}>Add a new expense</Text>
            <TextInput 
                style={GlobalStyles.formInput}
                placeholder="Affected acount"
                value={affectedAccountInputText}
                placeholderTextColor={GlobalStyles.formInputPlaceHolder.color}
                onChangeText={ value => {
                    // setAffectedAccount(value);
                    setAffectedAccountInputText(value);
                }}
            />
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