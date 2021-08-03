import { useState, useEffect } from "react";
import { defaultGet } from '../modules/Storage';

export const AccountHooks = {
    useDataKey: "accounts",
    useGetAccounts: async ()=>{
        const result = await defaultGet(AccountHooks.useDataKey);
        return result;
    }
}