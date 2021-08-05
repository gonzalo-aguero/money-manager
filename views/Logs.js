import React, { useEffect, useState } from 'react';
import {View, Text, FlatList,TouchableOpacity, ScrollView} from 'react-native';
import GlobalStyles,{ createTableStyles, Colors} from '../modules/GlobalStyles';
import { printAmount } from '../modules/Number';
import { LogHooks, IncomeHooks, TransferHooks, ExpenseHooks } from '../hooks/hooks';
const Logs = ()=>{
    const tableStyles = createTableStyles(3);
    const [logs, setLogs] = useState([]);
    const [selectedLog, selectLog] = useState(false);
    const [totalIncomes, setTotalIncomes] = useState(0);
    const [totalTransfers, setTotalTransfers] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const getLogs = async ()=>{
        const result = await LogHooks.useGetLogs();
        setLogs(result);
        const filteredLogs = await LogHooks.useGetFilteredLogs(result);
        setTotalIncomes(IncomeHooks.useGetTotalIncomes(filteredLogs.incomes));
        setTotalTransfers(TransferHooks.useGetTotalTransfers(filteredLogs.transfers));
        setTotalExpenses(ExpenseHooks.useGetTotalExpenses(filteredLogs.expenses));
    }
    const deleteLog = async ()=>{
        if(selectedLog === false)
            return;
        await LogHooks.useDeleteLog(selectedLog, (result)=>{
            if(result === true){
                selectLog(false);
            }
            getLogs();
        });
    }
    useEffect(() => {
        getLogs();
    }, []);
    return (
        <View style={GlobalStyles.mainContainer}>
            <Text style={GlobalStyles.title}>Movements ({logs.length})</Text>
            <FlatList 
                data={logs}
                style={tableStyles.table}
                ListHeaderComponent={()=>(
                    // List header
                    <View style={tableStyles.tableRow}>
                        <Text style={tableStyles.tableHeadCell}>Account</Text>
                        <Text style={tableStyles.tableHeadCell}>Amount</Text>
                        <Text style={tableStyles.tableHeadCell}>Date</Text>
                    </View>
                )}
                renderItem={({ item }) => {
                    const itemStyle = LogHooks.useGetLogStyle(item.type);
                    let sign = "";
                    switch (item.type) {
                        case LogHooks.useLogTypes.income:
                            sign = '+ ';
                            break;
                        case LogHooks.useLogTypes.expense:
                            sign = '- ';
                            break;
                        case LogHooks.useLogTypes.transfer:
                            sign = '<- ';
                            break;
                    }
                    return (
                        // List item
                        <TouchableOpacity style={[tableStyles.tableRow, (selectedLog === item.id ? tableStyles.selectedItem : null )]} onPress={ ()=> selectLog(item.id) }>
                            <Text style={tableStyles.tableCell}>{item.affectedAccount}</Text>
                            <Text style={[tableStyles.tableCell, itemStyle.amount]}>{sign + printAmount(item.amount)}</Text>
                            <Text style={tableStyles.tableCell}>{item.date}</Text>
                        </TouchableOpacity>
                    )
                }}
                ListEmptyComponent={() => (
                    // Empty list message
                    <View style={tableStyles.tableRow}>
                        <Text style={tableStyles.tableCell}>No logs found</Text>
                    </View>
                )}
            />
            {/* Actions buttons */}
            <View style={GlobalStyles.actionBar}>
                {/* Delete account button */}
                <TouchableOpacity disabled={!selectedLog ? true : false} onPress={deleteLog}>
                    <Text style={[GlobalStyles.button, GlobalStyles.badBG, (!selectedLog ? GlobalStyles.disableButton : null)]}>Delete</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={GlobalStyles.mainScrollView}>
                <View style={[GlobalStyles.block, {padding: 10}]}>
                    <Text style={GlobalStyles.title2}>Total incomes</Text>
                    <Text style={[GlobalStyles.title2, GlobalStyles.amount, GlobalStyles.goodText]}>{"+ " + printAmount(totalIncomes)}</Text>
                </View>
                <View style={[GlobalStyles.block, {padding: 10}]}>
                    <Text style={GlobalStyles.title2}>Total transfers amount</Text>
                    <Text style={[GlobalStyles.title2, GlobalStyles.amount,{color: Colors.lightBlue2}]}>{"<- " + printAmount(totalTransfers)}</Text>
                </View>
                <View style={[GlobalStyles.block, {padding: 10}]}>
                    <Text style={GlobalStyles.title2}>Total expenses</Text>
                    <Text style={[GlobalStyles.title2, GlobalStyles.amount, GlobalStyles.badText]}>{"- " + printAmount(totalExpenses)}</Text>
                </View>
            </ScrollView>
        </View>
    );
}
export default Logs;
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
// Expense structure
// const expenseTemplate = {
//     id: 1,
//     affectedAccount: "National Bank",
//     type: "expense",
//     amount: 12500,
//     date: Date(),
//     source: "Shopping",
//     note: "Without notes"
// }
// Transfer structure
// const transferTemplate = {
//     id: 1,
//     affectedAccount: {
//         from: [
//             {
//                 account: "National Bank",
//                 amount: 12500
//             }
//         ],
//         to: [
//             {
//                 account: "Patagonia Bank",
//                 amount: 12500
//             }
//         ]
//     },
//     type: "transfer",
//     amount: 12500,
//     data: Date(),
//     source: "Payment",
//     note: "Without notes"
// }