// import { useState, useEffect } from "react";
import { defaultGet } from '../modules/Storage';

export const AccountHooks = {
    useDataKey: "accounts",
    useGetAccounts: async ()=>{
        const result = await defaultGet(AccountHooks.useDataKey);
        return result;
    }
}
export const ExpenseHooks = {
    useDataKey: "expenses",
    useGetExpenses: async ()=>{
        const result = await defaultGet(ExpenseHooks.useDataKey);
        if(result === null || result === ""){
            return [];
        }else{
            return result;
        }
    }
}
export const IncomeHooks = {
    useDataKey: "incomes",
    useGetIncomes: async ()=>{
        const result = await defaultGet(ExpenseHooks.useDataKey);
        if(result === null || result === ""){
            return [];
        }else{
            return result;
        }
    }
}