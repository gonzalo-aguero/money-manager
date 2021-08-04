// import { useState, useEffect } from "react";
import { defaultGet, defaultSave } from '../modules/Storage';

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
    useDataKey: "expenses",
    useGetExpenses: async ()=>{
        const result = await defaultGet(ExpenseHooks.useDataKey);
        if(result === null || result === "" || result === false){
            return [];
        }else{
            return result;
        }
    }
}
export const IncomeHooks = {
    useDataKey: "incomes",
    useGetIncomes: async ()=>{
        const result = await defaultGet(IncomeHooks.useDataKey);
        if(result === null || result === "" || result === false){
            return [];
        }else{
            return result;
        }
    }
}
export const LogHooks = {
    useDataKey: "logs",
    logTypes: {
        income: "income",
        expense: "expense",
        transfer: "transfer"
    },
    useGetLogs: async ()=>{
        const result = await defaultGet(LogHooks.useDataKey);
        if(result === null || result === "" || result === false){
            return [];
        }else{
            return result;
        }
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
        const newId = useCalculateId(logs);
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
    useDeleteLog: async ()=>{
        console.log("Deleted!");
    },
    useGetLogStyle: (logType = null)=>{
        if(logType === null){
            console.error("logType is required in useGetLogStyle().");
            return false;
        }
        switch (logType) {
            case LogHooks.logTypes.income:
                
                break;
            case LogHooks.logTypes.expense:
            
                break;
            case LogHooks.logTypes.transfer:
            
                break;
            default:
                break;
        }


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
    dateString += " at "+ (hour < 10 ? "0" + hour : hour) +":"+ (minute < 10 ? "0" + minute : minute);
    return dateString;
}
/**
 * Get a possible ID for a new object in the objectArray.
 * @param {Array} objectArray
 */
export const useCalculateId = (objectArray = false)=>{
    if(objectArray === false){
        console.error("ObjectArray is required in useCalculateId().");
        return false;
    }
    // Calculate the new ID.
    let newId = objectArray !== null ? (objectArray.length + 1) : 1;
    let index = objectArray.findIndex( object => object.id === newId);
    if(index !== -1){
        newId = 0;
        do {
            newId++;
            index = objectArray.findIndex( object => object.id === newId);
        } while (index !== -1); 
    }
    return newId;
}