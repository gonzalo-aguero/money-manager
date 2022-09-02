import React, { useEffect, useState } from 'react';
import {View, ScrollView, Text, FlatList,TouchableOpacity } from 'react-native';
import AddExpenseForm from '../components/Expenses/AddExpenseForm';
import GlobalStyles,{ createTableStyles } from '../modules/GlobalStyles';
import { ExpenseHooks, usePrintAmount, useLang } from '../hooks/hooks';
import { useDisplayLogDetail, useDeleteLog } from '../hooks/LogHooks';

const Expenses = ()=>{
    const tableStyles = createTableStyles(3);
    const [addExpenseForm, displayAddExpenseForm] = useState(false);//True to display create account form.
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
            <Text style={GlobalStyles.title}>{ useLang().expenses.title }</Text>
            
            <FlatList 
                data={expenses}
                style={tableStyles.table}
                
                ListHeaderComponent={()=>(
                    // List header
                    <View style={tableStyles.tableRow}>
                        <Text style={tableStyles.tableHeadCell}>{ useLang().tables.account }</Text>
                        <Text style={tableStyles.tableHeadCell}>{ useLang().tables.amount }</Text>
                        <Text style={tableStyles.tableHeadCell}>{ useLang().tables.date }</Text>
                    </View>
                )}
                
                renderItem={({ item }) => (
                    // List item
                    <TouchableOpacity style={[tableStyles.tableRow, (selectedExpense === item.id ? tableStyles.selectedItem : null )]} onPress={ ()=> selectExpense(item.id) }>
                        <Text style={tableStyles.tableCell}>{item.affectedAccount}</Text>
                        <Text style={[tableStyles.tableCell,GlobalStyles.badText]}>{ usePrintAmount(item.amount) }</Text>
                        <Text style={tableStyles.tableCell}>{item.date}</Text>
                    </TouchableOpacity>
                )}
                
                ListEmptyComponent={() => (
                    // Empty list message
                    <View style={tableStyles.tableRow}>
                        <Text style={tableStyles.tableCell}>{ useLang().tables.noRecords.expenses }</Text>
                    </View>
                )}
            />
            
            {/* Actions buttons */}
            <View style={GlobalStyles.actionBar}>
                {/* Add expense button */}
                <TouchableOpacity onPress={ ()=> !addExpenseForm ? displayAddExpenseForm(true) : displayAddExpenseForm(false) }>
                    <Text style={[GlobalStyles.button, GlobalStyles.goodBG]}>{ !addExpenseForm ? useLang().buttons.addExpense : useLang().buttons.hideForm }</Text>
                </TouchableOpacity>
                
                <TouchableOpacity disabled={!selectedExpense ? true : false} onPress={deleteIncome}>
                    <Text style={[GlobalStyles.button, GlobalStyles.badBG, (!selectedExpense ? GlobalStyles.disableButton : null)]}>{ useLang().buttons.delete }</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={GlobalStyles.mainScrollView}>
                {/* Forms */}
                { addExpenseForm ? <AddExpenseForm getExpenses={getExpenses} displayAddExpenseForm={displayAddExpenseForm} /> : null }

                {/* Log detail */}
                { selectedExpense !== false ? useDisplayLogDetail(selectedExpense, expenses, ()=> selectExpense(false)) : null }
            </ScrollView>
        </View>
    );
}
export default Expenses;