import { defaultGet } from '../modules/Storage';
import { useGetLogs, useLogTypes } from './LogHooks';
import lang from '../lang/localization';
import { locale } from 'expo-localization';

export const AccountHooks = {
    useDataKey: "accounts",
    useGetAccounts: async ()=>{
        const result = await defaultGet(AccountHooks.useDataKey);
        if(result === null || result === "" || result === false){
            return [];
        }else{
            return result;
        }
    },
    useGetTotalReserve: async (accounts = null)=>{
        if(accounts === null){
            accounts = await AccountHooks.useGetAccounts();
        }
        let totalReserve = 0;
        accounts.forEach( account => totalReserve += account.reserve );
        return totalReserve;
    }
}

export const ExpenseHooks = {
    useGetExpenses: async (logs = null)=>{
        if(logs === null){
            logs = await useGetLogs();
        }
        const expenseLogs = logs.filter( log => log.type === useLogTypes.expense);
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
            logs = await useGetLogs();
        }
        const incomeLogs = logs.filter( log => log.type === useLogTypes.income);
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
            logs = await useGetLogs();
        }
        const transferLogs = logs.filter( log => log.type === useLogTypes.transfer);
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

/**
 * Get the formatted date in the following format: day-month-year at hours:minutes (for example: "03-07-2021 at 09:04")
 * @returns Formatted date.
 */
export const useDate = ()=>{
    const date = new Date();
    const separator = '-';
    const day = date.getDate();
    const month = parseInt(date.getMonth()) + 1;
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();

    let dateString = (day < 10 ? ("0" + day) : day) +separator+ (month < 10 ? ("0" + month) : month) +separator+ year;
    dateString += " "+ (hour < 10 ? ("0" + hour) : hour) +":"+ (minute < 10 ? ("0" + minute) : minute);
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
        if(resetTo0 === true){
            newId = 0;
        }
        do {
            newId++;
            index = objectArray.findIndex( object => object.id === newId);
        } while (index !== -1); 
    }
    return newId;
}

/**
 * This function replaces to printAmount() in ../modules/Number.js
 * Return the amount in default format.
 * @param {Number} amount Amount to display.
 * @returns Amount to display.
 */
export function usePrintAmount(amount = 0){
    amount = Number.parseFloat(amount);
    return '$' + amount.toFixed(2);
}

export function useLocale(){
    return locale.split('-')[0];
}
export function useLang() {
    return lang[useLocale()];
}