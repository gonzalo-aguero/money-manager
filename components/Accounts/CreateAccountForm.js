import React, { useState } from 'react';
import {View, Text, Alert, TextInput, TouchableOpacity} from 'react-native';
import GlobalStyles from '../../modules/GlobalStyles';
import { defaultSave, defaultGet } from '../../modules/Storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
const CreateAccountForm = ()=>{
    const dataKey = "accounts";
    const [accountName, setAccountName] = useState("");
    const [accountReserve, setAccountReserve] = useState("");
    const [accountDescription, setAccountDescription] = useState("");
    return (
        <View style={GlobalStyles.form}>
            <Text style={GlobalStyles.title2}>Create a new account</Text>
            <TextInput 
                style={GlobalStyles.formInput}
                placeholder="Account name"
                placeholderTextColor="white"
                onBlur={(value)=> Alert.alert("asd",value)}
            />
            <TextInput 
                style={GlobalStyles.formInput}
                placeholder="Account reserve"
                placeholderTextColor="white"
                onBlur={()=> Alert.alert("ok")}
            />
            <TextInput 
                style={GlobalStyles.formInput}
                placeholder="Account description"
                placeholderTextColor="white"
                multiline={true}
                maxLength={100}
                onBlur={()=> Alert.alert("ok")}
            />
            <TouchableOpacity
                title="Submit"
                onPress={ ()=> console.log("Guardado corerctaente") }
                color={GlobalStyles.goodBG.backgroundColor}
                style={[GlobalStyles.goodBG, GlobalStyles.formSubmitButton]}
            >
                <Text style={GlobalStyles.formSubmitButtonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
}
export default CreateAccountForm;