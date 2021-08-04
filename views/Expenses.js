import React, { useEffect, useState } from 'react';
import {View, ScrollView, Text, FlatList,TouchableOpacity, Alert} from 'react-native';
import AddExpenseForm from '../components/Expenses/AddExpenseForm';
//DEVELOP ---> import EditExpenseForm from '../components/Expenses/EditExpenseForm';
import GlobalStyles,{ createTableStyles, Colors} from '../modules/GlobalStyles';
import { printAmount } from '../modules/Number';
import { ExpenseHooks } from '../hooks/hooks';
const Expenses = ()=>{
    const tableStyles = createTableStyles(3);
    const [addExpenseForm, displayAddExpenseForm] = useState(false);//True to display create account form.
    const [editExpenseForm, displayEditAccountForm] = useState(false);//True to display edit account form.
    const [expenses, setExpenses] = useState([]);
    const [selectedExpense, selectExpense] = useState(false);
    const getExpenses = async ()=>{
        setExpenses(await ExpenseHooks.useGetExpenses());
    }
    useEffect(() => {
        getExpenses();
    }, []);
    return (
        <View style={GlobalStyles.mainContainer}>
            <Text style={GlobalStyles.title}>Expenses</Text>
            <FlatList 
                data={expenses}
                style={tableStyles.table}
                ListHeaderComponent={()=>(
                    // List header
                    <View style={tableStyles.tableRow}>
                        <Text style={tableStyles.tableHeadCell}>Account</Text>
                        <Text style={tableStyles.tableHeadCell}>Amount</Text>
                        <Text style={tableStyles.tableHeadCell}>Date</Text>
                    </View>
                )}
                renderItem={({ item }) => (
                    // List item
                    <TouchableOpacity style={[tableStyles.tableRow, (selectedExpense === item.id ? tableStyles.selectedItem : null )]} onPress={ ()=> selectExpense(item.id) }>
                        <Text style={tableStyles.tableCell}>{item.affectedAccount}</Text>
                        <Text style={[tableStyles.tableCell,GlobalStyles.badText]}>{"- " + printAmount(item.amount)}</Text>
                        <Text style={tableStyles.tableCell}>{item.date}</Text>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={() => (
                    // Empty list message
                    <View style={tableStyles.tableRow}>
                        <Text style={tableStyles.tableCell}>No expenses recorded</Text>
                    </View>
                )}
            />
            {/* Actions buttons */}
            <View style={GlobalStyles.actionBar}>
                {/* Add expense button */}
                <TouchableOpacity onPress={ ()=> !addExpenseForm ? displayAddExpenseForm(true) : displayAddExpenseForm(false) }>
                    <Text style={[GlobalStyles.button, GlobalStyles.goodBG]}>{ !addExpenseForm ? "Add expense" : "Hide form" }</Text>
                </TouchableOpacity>
                {/* Edit expense button */}
                {/* <TouchableOpacity disabled={!selectedExpense ? true : false} onPress={ ()=> !editExpenseForm ? displayEditAccountForm(true) : displayEditAccountForm(false) }>
                    <Text style={[GlobalStyles.button, {backgroundColor: Colors.lightBlue, color: 'white'}, (!selectedExpense ? GlobalStyles.disableButton : null)]}>{ !editExpenseForm ? "Edit expense" : "Hide form" }</Text>
                </TouchableOpacity> */}
            </View>
            <ScrollView style={GlobalStyles.mainScrollView}>
                {/* Forms */}
                {/* { editExpenseForm ? <EditExpenseForm selectedAccountId={selectedExpense} displayEditAccountForm={displayEditAccountForm} /> : null } */}
                { editExpenseForm ? Alert.alert("I'm sorry :(", "This function continuous in development.") : null }
                { addExpenseForm ? <AddExpenseForm getExpenses={getExpenses} /> : null }
                <View style={{padding: 10}}>
                    <Text style={GlobalStyles.title2}>Total expenses</Text>
                    <Text style={[GlobalStyles.title2, GlobalStyles.amount, GlobalStyles.badText]}>{"- " + printAmount(ExpenseHooks.useGetTotalExpenses(expenses))}</Text>
                </View>
            </ScrollView>
        </View>
    );
}
export default Expenses;