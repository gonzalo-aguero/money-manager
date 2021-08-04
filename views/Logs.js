import React, { useEffect, useState } from 'react';
import {View, ScrollView, Text, FlatList,TouchableOpacity, Alert, Button} from 'react-native';
import AddIncomeForm from '../components/Incomes/AddIncomeForm';
import GlobalStyles,{ createTableStyles, Colors} from '../modules/GlobalStyles';
import { printAmount } from '../modules/Number';
import { LogHooks, useDate, useCalculateId } from '../hooks/hooks';
const Logs = ()=>{
    const tableStyles = createTableStyles(3);
    const [logs, setLogs] = useState([]);
    const [selectedLog, selectLog] = useState(false);
    const getLogs = async ()=>{
        setLogs(await LogHooks.useGetLogs());
    }
    const deleteLog = async ()=>{
        console.log("Deleted :(");
    }
    const createLog = async ()=>{
        const testLog = {
            affectedAccount: "National Bank",
            type: logType.expense,
            amount: 450,
            source: "Job",
            note: "Without notes"
        }
        await LogHooks.useCreateLog(testLog);
        await getLogs();
    }
    useEffect(() => {
        getLogs();
    }, []);
    return (
        <View style={GlobalStyles.mainContainer}>
            <Text style={GlobalStyles.title}>Logs</Text>
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
                renderItem={({ item }) => (
                    // List item
                    <TouchableOpacity style={[tableStyles.tableRow, (selectedLog === item.id ? tableStyles.selectedItem : null )]} onPress={ ()=> selectLog(item.id) }>
                        <Text style={tableStyles.tableCell}>{item.affectedAccount}</Text>
                        <Text style={[tableStyles.tableCell,GlobalStyles.goodText]}>{printAmount(item.amount)}</Text>
                        <Text style={tableStyles.tableCell}>{item.date}</Text>
                    </TouchableOpacity>
                )}
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
                <Button onPress={createLog} title={"Create log"}></Button>
            </View>
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