import React, { useEffect, useState } from 'react';
import {View, ScrollView, Text, FlatList, TouchableOpacity } from 'react-native';
import AddIncomeForm from '../components/Incomes/AddIncomeForm';
import GlobalStyles,{ createTableStyles } from '../modules/GlobalStyles';
import { IncomeHooks, usePrintAmount, useLang} from '../hooks/hooks';
import { useDisplayLogDetail, useDeleteLog } from '../hooks/LogHooks';

const Incomes = ()=>{
    const tableStyles = createTableStyles(3);
    const [addIncomeForm, displayAddIncomeForm] = useState(false);//True to display create income form.
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
            <Text style={GlobalStyles.title}>{ useLang().incomes.title }</Text>
            <FlatList 
                data={incomes}
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
                    <TouchableOpacity style={[tableStyles.tableRow, (selectedIncome === item.id ? tableStyles.selectedItem : null )]} onPress={ ()=> selectIncome(item.id) }>
                        <Text style={tableStyles.tableCell}>{item.affectedAccount}</Text>
                        <Text style={[tableStyles.tableCell,GlobalStyles.goodText]}>{ usePrintAmount(item.amount) }</Text>
                        <Text style={tableStyles.tableCell}>{item.date}</Text>
                    </TouchableOpacity>
                )}
                
                ListEmptyComponent={() => (
                    // Empty list message
                    <View style={tableStyles.tableRow}>
                        <Text style={tableStyles.tableCell}>{ useLang().tables.noRecords.incomes }</Text>
                    </View>
                )}
            />

            {/* Actions buttons */}
            <View style={GlobalStyles.actionBar}>
                {/* Add income button */}
                <TouchableOpacity onPress={ ()=> !addIncomeForm ? displayAddIncomeForm(true) : displayAddIncomeForm(false) }>
                    <Text style={[GlobalStyles.button, GlobalStyles.goodBG]}>{ !addIncomeForm ? useLang().buttons.addIncome : useLang().buttons.hideForm }</Text>
                </TouchableOpacity>

                {/* Delete log button */}
                <TouchableOpacity disabled={!selectedIncome ? true : false} onPress={deleteIncome}>
                    <Text style={[GlobalStyles.button, GlobalStyles.badBG, (!selectedIncome ? GlobalStyles.disableButton : null)]}>{ useLang().buttons.delete }</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={GlobalStyles.mainScrollView}>
                {/* Forms */}
                { addIncomeForm ? <AddIncomeForm getIncomes={getIncomes} displayAddIncomeForm={displayAddIncomeForm} /> : null }
                
                {/* Log detail */}
                { selectedIncome !== false ? useDisplayLogDetail(selectedIncome, incomes, ()=> selectIncome(false)) : null }
            </ScrollView>
        </View>
    );
}
export default Incomes;