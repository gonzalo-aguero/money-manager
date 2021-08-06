import React from 'react';
import { StyleSheet, Alert, View, Text, TouchableOpacity } from "react-native";
import { defaultGet, defaultSave } from '../modules/Storage';
import GlobalStyles, { Colors, Fonts } from '../modules/GlobalStyles';
import { 
    IncomeHooks,
    ExpenseHooks,
    TransferHooks,
    usePrintAmount,
    useCalculateId,
    useDate
} from './hooks';


export const useDataKey = "logs";
export const useLogTypes = {
        income: "income",
        expense: "expense",
        transfer: "transfer"
    };
export async function useGetLogs(){
    const result = await defaultGet(useDataKey);
    console.log("useGetLogs executed")
    if(result === null || result === "" || result === false){
        return [];
    }else{
        return result.sort((a,b)=> b.id -a.id);            ;
    }
}
export async function useGetFilteredLogs(logs = null){
    if(logs === null){
        logs = await useGetLogs();
    }
    return {
        incomes: await IncomeHooks.useGetIncomes(logs),
        transfers: await TransferHooks.useGetTransfers(logs),
        expenses: await ExpenseHooks.useGetExpenses(logs)
    };
}
/**
 * Createa a log.
 * @param {Object} logData Object with the log data.
 * Log data example:
 * {
 *  affectedAccount: "National Bank",
 *  type: "income",
 *  amount: 12500,
 *  source: "Job",
 *  note: "Without notes"
 * }
 */
export async function useCreateLog(logData){
    let logs = [];
    logs = await useGetLogs();
    const newId = useCalculateId(logs, false);
    if(newId === false){
        Alert.alert("Oh no!","An error has ocurred!");
        return false;
    }
    const log = {
        id: newId,
        affectedAccount: logData.affectedAccount,
        type: logData.type,
        amount: logData.amount,
        date: useDate(),
        source: logData.source,
        note: logData.note
    }
    logs.push(log);
    await defaultSave(logs, useDataKey);
}
/**
 * @param {Number} logId 
 * @param {Function} callback (optional) It receives as parameter: True if everything is ok, otherwise it is false. 
 */
export async function useDeleteLog(logId = null, callback = ()=>{}){
    if(logId === null){
        console.error("logId is required in useDeleteLog().");
        callback(false);
        return;
    }
    let logs = [];
    logs = await useGetLogs();
    // Get the log ID. Then remove it from logs array.
    const logIndex = logs.findIndex( log => log.id === logId);
    Alert.alert(
        "Are your sure?",
        "Are you sure you want to remove this log?",
        [
            // The "Yes" button
            {
                text: "Yes",
                onPress: async () => {
                    logs.splice(logIndex,1);
                    await defaultSave(logs, useDataKey);
                    callback(true);
                },
            },
            // The "No" button
            // Does nothing but dismiss the dialog when tapped
            {
                text: "No",
                onPress: async ()=>{
                    callback(false);
                }
            },
        ]
    );
}
export function useGetLogStyle(logType = null){
    if(logType === null){
        console.error("logType is required in useGetLogStyle().");
        return false;
    }
    let style = StyleSheet.create({
        accountName: {},
        amount: {},
        date: {}
    });
    switch (logType) {
        case useLogTypes.income:
            style.amount = {
                color: Colors.goodGreen
            }
            break;
        case useLogTypes.expense:
            style.amount = {
                color: Colors.badOrError
            }
            break;
        case useLogTypes.transfer:
            style.amount = {
                color: Colors.lightBlue2
            }
            break;
    }
    return style;
}
/**
 * Returns a block with the log detail.
 * @param {Number} logId ID of the log.
 * @param {Array} logs Array with the logs.
 * @param {Function} onPressClose Function to execute when the close button is pressed.
 * @returns {Object} JSX element.
 */
export function useDisplayLogDetail(logId = null, logs = null, onPressClose = ()=>{} ){
    if(logId === null){
        console.error("logId is required in useDisplayLogDetail()");
        return;
    }
    if(logs === null){
        console.error("logs is required in useDisplayLogDetail()");
        return;
    }

    const log = logs.find( log => log.id === logId);
    let color = null;
    let sign = "";
    if(log.type === useLogTypes.income){
        color = GlobalStyles.goodText;
        sign = '+ ';
    }else if(log.type === useLogTypes.expense){
        color = GlobalStyles.badText;
        sign = '- ';
    }else if(log.type === useLogTypes.transfer){
        color = { color: Colors.lightBlue2 };
        sign = '<- ';
    }
    return (
        <View style={[GlobalStyles.block, { alignItems:'center', padding: 10}]}>
            <View style={{display:'flex',flexDirection:'row', padding: 10}}>
                <View style={{width: '50%'}}>
                    {/* Affected account */}
                    <Text style={[GlobalStyles.text, {fontFamily: Fonts.font3}]}>Affected account</Text>
                    <Text style={[GlobalStyles.text]}>{log.affectedAccount}</Text>
                    {/* Amount */}
                    <Text style={[GlobalStyles.text, {fontFamily: Fonts.font3}]}>Amount</Text>
                    <Text style={[GlobalStyles.text, color]}>{sign + usePrintAmount(log.amount)}</Text>
                    {/* Date */}
                    <Text style={[GlobalStyles.text, {fontFamily: Fonts.font3}]}>Date</Text>
                    <Text style={[GlobalStyles.text]}>{log.date}</Text>
                </View>
                <View style={{width: '50%'}}>
                    {/* Source */}
                    <Text style={[{textAlign:'right'}, GlobalStyles.text, {fontFamily: Fonts.font3}]}>Source</Text>
                    <Text style={[{textAlign:'right'}, GlobalStyles.text]}>{log.source}</Text>
                    {/* Note */}
                    <Text style={[{textAlign:'right'}, GlobalStyles.text, {fontFamily: Fonts.font3}]}>Note</Text>
                    <Text style={[{textAlign:'right'}, GlobalStyles.text]}>{log.note}</Text>
                </View>
            </View>
            <TouchableOpacity onPress={ onPressClose } style={[GlobalStyles.button,{backgroundColor: Colors.darkGreyBG2, width: 85}]}>
                <Text style={[GlobalStyles.text, {textAlign: 'center'}]}>Close</Text>
            </TouchableOpacity>
        </View>
    );
}