import React, { useEffect, useState } from 'react';
import {View, ScrollView, Text, FlatList,TouchableOpacity, Alert} from 'react-native';
import AddIncomeForm from '../components/Incomes/AddIncomeForm';
import GlobalStyles,{ createTableStyles } from '../modules/GlobalStyles';
import { IncomeHooks, usePrintAmount } from '../hooks/hooks';
import { useDisplayLogDetail, useDeleteLog } from '../hooks/LogHooks';
const Incomes = ()=>{
    const tableStyles = createTableStyles(3);
    const [addIncomeForm, displayAddIncomeForm] = useState(false);//True to display create income form.
    const [editIncomeForm, displayEditIncomeForm] = useState(false);//True to display edit income form.
    const [incomes, setIncomes] = useState([]);
    const [selectedIncome, selectIncome] = useState(false);
    const getIncomes = async ()=>{
        setIncomes(await IncomeHooks.useGetIncomes());
    }
    const deleteIncome = async ()=>{
        if(selectedIncome === false)
            return;
        await useDeleteLog(selectedIncome, (result)=>{
            if(result === true){
                selectIncome(false);
            }
            getIncomes();
        });
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
                        <Text style={tableStyles.tableCell}>{item.affectedAccount}</Text>
                        <Text style={[tableStyles.tableCell,GlobalStyles.goodText]}>{"+ " + usePrintAmount(item.amount)}</Text>
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
                {/* <TouchableOpacity disabled={!selectedIncome ? true : false} onPress={ ()=> !editIncomeForm ? displayEditIncomeForm(true) : displayEditIncomeForm(false) }>
                    <Text style={[GlobalStyles.button, {backgroundColor: Colors.lightBlue, color: 'white'}, (!selectedIncome ? GlobalStyles.disableButton : null)]}>{ !editIncomeForm ? "Edit income" : "Hide form" }</Text>
                </TouchableOpacity> */}
                {/* Delete account button */}
                <TouchableOpacity disabled={!selectedIncome ? true : false} onPress={deleteIncome}>
                    <Text style={[GlobalStyles.button, GlobalStyles.badBG, (!selectedIncome ? GlobalStyles.disableButton : null)]}>Delete</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={GlobalStyles.mainScrollView}>
                {/* Forms */}
                {/* { editIncomeForm ? <EditIncomeForm selectedAccountId={selectedIncome} displayEditIncomeForm={displayEditIncomeForm} /> : null } */}
                { editIncomeForm ? Alert.alert("I'm sorry :(", "This function continuous in development.") : null }
                { addIncomeForm ? <AddIncomeForm getIncomes={getIncomes} /> : null }
                <View style={{padding: 10}}>
                    <Text style={GlobalStyles.title2}>Total incomes</Text>
                    <Text style={[GlobalStyles.title2, GlobalStyles.amount, GlobalStyles.goodText]}>{"+ " + usePrintAmount(IncomeHooks.useGetTotalIncomes(incomes))}</Text>
                </View>
                {/* Log detail */}
                { selectedIncome !== false ? useDisplayLogDetail(selectedIncome, incomes, ()=> selectIncome(false)) : null }
            </ScrollView>
        </View>
    );
}
export default Incomes;