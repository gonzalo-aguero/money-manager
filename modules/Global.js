import React from 'react';
import { Image } from 'react-native';
import HomeIcon from '../assets/icons/outline_home_white_24dp.png';
import AccountsIcon from '../assets/icons/outline_account_balance_wallet_white_24dp.png';
import LogsIcon from '../assets/icons/outline_swap_horiz_white_24dp.png';
import ExpensesIcon from '../assets/icons/outline_remove_circle_outline_white_24dp.png';
import IncomesIcon from '../assets/icons/outline_add_circle_outline_white_24dp.png';
import Transfers from '../assets/icons/outline_swap_horizontal_circle_white_24dp.png';

export const Icons = {
    home: HomeIcon,
    accounts: AccountsIcon,
    logs: LogsIcon,
    expenses: ExpensesIcon,
    incomes: IncomesIcon,
    transfers: Transfers
}

export const getViewIconImage = (icon, isCurrentView = false, activeButtonStyle = null)=>{
    return <Image 
        source={icon} 
        style={[{
            width: 27.5,
            height: 27.5,
            resizeMode: 'cover',                            
        }, isCurrentView ? activeButtonStyle : null]}
    />;
}