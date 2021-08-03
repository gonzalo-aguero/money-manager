import React, { useEffect, useState } from 'react';
import {View, ScrollView, Text, FlatList,TouchableOpacity, Alert} from 'react-native';
import AddIncomeForm from '../components/Incomes/AddIncomeForm';
import GlobalStyles,{ createTableStyles, Colors} from '../modules/GlobalStyles';
import { printAmount } from '../modules/Number';
import { IncomeHooks } from '../hooks/hooks';
const Incomes = ()=>{
    const tableStyles = createTableStyles(3);
    const [addIncomeForm, displayAddIncomeForm] = useState(false);//True to display create income form.
    const [editIncomeForm, displayEditIncomeForm] = useState(false);//True to display edit income form.
    const [incomes, setIncomes] = useState([]);
    const [selectedIncome, selectIncome] = useState(false);
    const getIncomes = async ()=>{
        setIncomes(await IncomeHooks.useGetIncomes());
    }
    useEffect(() => {
        getIncomes();
    }, []);
    return (
        <View style={GlobalStyles.mainContainer}>
            <Text style={GlobalStyles.title}>Incomes</Text>
            <FlatList 
                data={incomes}
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
                    <TouchableOpacity style={[tableStyles.tableRow, (selectedIncome === item.id ? tableStyles.selectedItem : null )]} onPress={ ()=> selectIncome(item.id) }>
                        <Text style={tableStyles.tableCell}>{item.account}</Text>
                        <Text style={[tableStyles.tableCell,GlobalStyles.goodText]}>{printAmount(item.amount)}</Text>
                        <Text style={tableStyles.tableCell}>{item.date}</Text>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={() => (
                    // Empty list message
                    <View style={tableStyles.tableRow}>
                        <Text style={tableStyles.tableCell}>No incomes recorded</Text>
                    </View>
                )}
            />
            {/* Actions buttons */}
            <View style={GlobalStyles.actionBar}>
                {/* Add expense button */}
                <TouchableOpacity onPress={ ()=> !addIncomeForm ? displayAddIncomeForm(true) : displayAddIncomeForm(false) }>
                    <Text style={[GlobalStyles.button, GlobalStyles.goodBG]}>{ !addIncomeForm ? "Add income" : "Hide form" }</Text>
                </TouchableOpacity>
                {/* Edit expense button */}
                <TouchableOpacity disabled={!selectedIncome ? true : false} onPress={ ()=> !editIncomeForm ? displayEditIncomeForm(true) : displayEditIncomeForm(false) }>
                    <Text style={[GlobalStyles.button, {backgroundColor: Colors.lightBlue, color: 'white'}, (!selectedIncome ? GlobalStyles.disableButton : null)]}>{ !editIncomeForm ? "Edit income" : "Hide form" }</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={GlobalStyles.mainScrollView}>
                {/* Forms */}
                {/* { editIncomeForm ? <EditIncomeForm selectedAccountId={selectedIncome} displayEditIncomeForm={displayEditIncomeForm} /> : null } */}
                { editIncomeForm ? Alert.alert("I'm sorry :(", "This function continuous in development.") : null }
                { addIncomeForm ? <AddIncomeForm /> : null }
            </ScrollView>
        </View>
    );
}
export default Incomes;
// Income structure
// const incomeTemplate = {
//     id: 1,
//     affectedAccount: "National Bank",
//     type: "income",
//     amount: 12500,
//     date: Date(),
//     source: "Job",
//     note: "Without notes"
// }