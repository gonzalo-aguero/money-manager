// import { useState, useEffect } from "react";
import { StyleSheet, Alert } from "react-native";
import { defaultGet, defaultSave } from '../modules/Storage';
import { Colors } from '../modules/GlobalStyles';


export const AccountHooks = {
    useDataKey: "accounts",
    useGetAccounts: async ()=>{
        const result = await defaultGet(AccountHooks.useDataKey);
        if(result === null || result === "" || result === false){
            return [];
        }else{
            return result;
        }
    }
}
export const ExpenseHooks = {
    useGetExpenses: async (logs = null)=>{
        if(logs === null){
            logs = await LogHooks.useGetLogs();
        }
        const expenseLogs = logs.filter( log => log.type === LogHooks.useLogTypes.expense);
        return expenseLogs;
    },
    /**
     * Returns the total expenses.
     * @param {Array} expenses 
     */
    useGetTotalExpenses: (expenses = [])=>{
        let total = 0;
        expenses.forEach(expense => total += Number.parseFloat(expense.amount));
        return total;
    }
}
export const IncomeHooks = {
    useGetIncomes: async (logs = null)=>{
        if(logs === null){
            logs = await LogHooks.useGetLogs();
        }
        const incomeLogs = logs.filter( log => log.type === LogHooks.useLogTypes.income);
        return incomeLogs;
    },
    /**
     * Returns the total incomes.
     * @param {Array} incomes 
     */
    useGetTotalIncomes: (incomes = [])=>{
        let total = 0;
        incomes.forEach(income => total += Number.parseFloat(income.amount));
        return total;
    }
}
export const TransferHooks = {
    useGetTransfers: async (logs = null)=>{
        if(logs === null){
            logs = await LogHooks.useGetLogs();
        }
        const transferLogs = logs.filter( log => log.type === LogHooks.useLogTypes.transfer);
        return transferLogs;
    },
    /**
     * Returns the total transfers amount.
     * @param {Array} incomes 
     */
    useGetTotalTransfers: (transfers = [])=>{
        let total = 0;
        transfers.forEach(transfer => total += Number.parseFloat(transfer.amount));
        return total;
    }
}
export const LogHooks = {
    useDataKey: "logs",
    useLogTypes: {
        income: "income",
        expense: "expense",
        transfer: "transfer"
    },
    useGetLogs: async ()=>{
        const result = await defaultGet(LogHooks.useDataKey);
        if(result === null || result === "" || result === false){
            return [];
        }else{
            return result.sort((a,b)=> b.id -a.id);            ;
        }
    },
    useGetFilteredLogs: async (logs = null)=>{
        if(logs === null){
            logs = await LogHooks.useGetLogs();
        }
        return {
            incomes: await IncomeHooks.useGetIncomes(logs),
            transfers: await TransferHooks.useGetTransfers(logs),
            expenses: await ExpenseHooks.useGetExpenses(logs)
        };
    },
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
    useCreateLog: async (logData)=>{
        let logs = [];
        logs = await LogHooks.useGetLogs();
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
        await defaultSave(logs, LogHooks.useDataKey);
    },
    /**
     * @param {Number} logId 
     * @param {Function} callback (optional) It receives as parameter: True if everything is ok, otherwise it is false. 
     */
    useDeleteLog: async (logId = null, callback = ()=>{})=>{
        if(logId === null){
            console.error("logId is required in useDeleteLog().");
            callback(false);
            return;
        }
        let logs = [];
        logs = await LogHooks.useGetLogs();
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
                        await defaultSave(logs, LogHooks.useDataKey);
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
    },
    useGetLogStyle: (logType = null)=>{
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
            case LogHooks.useLogTypes.income:
                style.amount = {
                    color: Colors.goodGreen
                }
                break;
            case LogHooks.useLogTypes.expense:
                style.amount = {
                    color: Colors.badOrError
                }
                break;
            case LogHooks.useLogTypes.transfer:
                style.amount = {
                    color: Colors.lightBlue2
                }
                break;
        }
        return style;
    }
}
/**
 * Get the formatted date in the following format: day-month-year at hours:minutes (for example: "03-07-2021 at 09:04")
 * @returns Formatted date.
 */
export const useDate = ()=>{
    const date = new Date();
    const separator = '-';
    const day = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();
    let dateString = (day < 10 ? "0" + day : day) +separator+ (month < 10 ? "0" + month : month) +separator+year;
    dateString += " "+ (hour < 10 ? "0" + hour : hour) +":"+ (minute < 10 ? "0" + minute : minute);
    return dateString;
}
/**
 * Get a possible ID for a new object in the objectArray.
 * @param {Array} objectArray
 * @param {Boolean} resetTo0 Reset the ID to 0 if it matches with any log. By default it is true.
 */
export const useCalculateId = (objectArray = false, resetTo0 = true)=>{
    if(objectArray === false){
        console.error("ObjectArray is required in useCalculateId().");
        return false;
    }
    // Calculate the new ID.
    let newId = objectArray !== null ? (objectArray.length + 1) : 1;
    let index = objectArray.findIndex( object => object.id === newId);
    if(index !== -1){
        resetTo0 ? newId = 0 : newId;
        do {
            newId++;
            index = objectArray.findIndex( object => object.id === newId);
        } while (index !== -1); 
    }
    return newId;
}