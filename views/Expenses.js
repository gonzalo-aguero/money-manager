import React, { useEffect, useState } from 'react';
import {View, ScrollView, Text, FlatList,TouchableOpacity, Alert} from 'react-native';
import AddExpenseForm from '../components/Expenses/AddExpenseForm';
import GlobalStyles,{ createTableStyles } from '../modules/GlobalStyles';
import { ExpenseHooks, usePrintAmount } from '../hooks/hooks';
import { useDisplayLogDetail, useDeleteLog } from '../hooks/LogHooks';

import lang from '../lang/localization';
import * as Localization from 'expo-localization';

const Expenses = ()=>{
    const [locale, setLocale] = useState(Localization.locale.split('-')[0]);
    const tableStyles = createTableStyles(3);
    const [addExpenseForm, displayAddExpenseForm] = useState(false);//True to display create account form.
    const [editExpenseForm, displayEditAccountForm] = useState(false);//True to display edit account form.
    const [expenses, setExpenses] = useState([]);
    const [selectedExpense, selectExpense] = useState(false);
    
    const getExpenses = async ()=>{
        setExpenses(await ExpenseHooks.useGetExpenses());
    }
    
    const deleteIncome = async ()=>{
        if(selectedExpense === false)
            return;

        await useDeleteLog(selectedExpense, (result)=>{
            if(result === true){
                selectExpense(false);
            }
            getExpenses();
        });
    }
    
    useEffect(() => {
        getExpenses();
    }, []);
    
    return (
        <View style={GlobalStyles.mainContainer}>
            <Text style={GlobalStyles.title}>{ lang[locale].expenses.title }</Text>
            
            <FlatList 
                data={expenses}
                style={tableStyles.table}
                
                ListHeaderComponent={()=>(
                    // List header
                    <View style={tableStyles.tableRow}>
                        <Text style={tableStyles.tableHeadCell}>{ lang[locale].tables.account }</Text>
                        <Text style={tableStyles.tableHeadCell}>{ lang[locale].tables.amount }</Text>
                        <Text style={tableStyles.tableHeadCell}>{ lang[locale].tables.date }</Text>
                    </View>
                )}
                
                renderItem={({ item }) => (
                    // List item
                    <TouchableOpacity style={[tableStyles.tableRow, (selectedExpense === item.id ? tableStyles.selectedItem : null )]} onPress={ ()=> selectExpense(item.id) }>
                        <Text style={tableStyles.tableCell}>{item.affectedAccount}</Text>
                        <Text style={[tableStyles.tableCell,GlobalStyles.badText]}>{"- " + usePrintAmount(item.amount)}</Text>
                        <Text style={tableStyles.tableCell}>{item.date}</Text>
                    </TouchableOpacity>
                )}
                
                ListEmptyComponent={() => (
                    // Empty list message
                    <View style={tableStyles.tableRow}>
                        <Text style={tableStyles.tableCell}>{ lang[locale].tables.noRecords.expenses }</Text>
                    </View>
                )}
            />
            
            {/* Actions buttons */}
            <View style={GlobalStyles.actionBar}>
                
                {/* Add expense button */}
                <TouchableOpacity onPress={ ()=> !addExpenseForm ? displayAddExpenseForm(true) : displayAddExpenseForm(false) }>
                    <Text style={[GlobalStyles.button, GlobalStyles.goodBG]}>{ !addExpenseForm ? lang[locale].buttons.addExpense : lang[locale].buttons.hideForm }</Text>
                </TouchableOpacity>
                
                {/* Edit expense button */}
                {/* <TouchableOpacity disabled={!selectedExpense ? true : false} onPress={ ()=> !editExpenseForm ? displayEditAccountForm(true) : displayEditAccountForm(false) }>
                    <Text style={[GlobalStyles.button, {backgroundColor: Colors.lightBlue, color: 'white'}, (!selectedExpense ? GlobalStyles.disableButton : null)]}>{ !editExpenseForm ? "Edit expense" : "Hide form" }</Text>
                </TouchableOpacity> */}
                
                <TouchableOpacity disabled={!selectedExpense ? true : false} onPress={deleteIncome}>
                    <Text style={[GlobalStyles.button, GlobalStyles.badBG, (!selectedExpense ? GlobalStyles.disableButton : null)]}>{ lang[locale].buttons.delete }</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={GlobalStyles.mainScrollView}>
                {/* Forms */}
                {/* { editExpenseForm ? <EditExpenseForm selectedAccountId={selectedExpense} displayEditAccountForm={displayEditAccountForm} /> : null } */}
                { editExpenseForm ? Alert.alert("I'm sorry :(", "This function continuous in development.") : null }
                
                { addExpenseForm ? <AddExpenseForm getExpenses={getExpenses} displayAddExpenseForm={displayAddExpenseForm} /> : null }
                <View style={{padding: 10}}>
                    <Text style={GlobalStyles.title2}>{ lang[locale].expenses.totalExpenses }</Text>
                    <Text style={[GlobalStyles.title2, GlobalStyles.amount, GlobalStyles.badText]}>{"- " + usePrintAmount(ExpenseHooks.useGetTotalExpenses(expenses))}</Text>
                </View>
                
                {/* Log detail */}
                { selectedExpense !== false ? useDisplayLogDetail(selectedExpense, expenses, ()=> selectExpense(false)) : null }
            </ScrollView>
        </View>
    );
}
export default Expenses;