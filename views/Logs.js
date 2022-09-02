import React, { useEffect, useState } from 'react';
import {View, Text, FlatList,TouchableOpacity, ScrollView} from 'react-native';
import GlobalStyles,{ createTableStyles, Colors} from '../modules/GlobalStyles';
import { 
    useGetLogs,
    useDeleteLog,
    useGetLogStyle,
    useLogTypes,
    useDisplayLogDetail
} from '../hooks/LogHooks';
import { usePrintAmount, useLang } from '../hooks/hooks';

const Logs = ()=>{
    const tableStyles = createTableStyles(3, 150);
    const [logs, setLogs] = useState([]);
    const [selectedLog, selectLog] = useState(false);
    // const [totalIncomes, setTotalIncomes] = useState(0);
    // const [totalTransfers, setTotalTransfers] = useState(0);
    // const [totalExpenses, setTotalExpenses] = useState(0);

    const getLogs = async ()=>{
        const result = await useGetLogs();
        setLogs(result);
        // const filteredLogs = await useGetFilteredLogs(result);
        // setTotalIncomes(IncomeHooks.useGetTotalIncomes(filteredLogs.incomes));
        // setTotalTransfers(TransferHooks.useGetTotalTransfers(filteredLogs.transfers));
        // setTotalExpenses(ExpenseHooks.useGetTotalExpenses(filteredLogs.expenses));
    }

    const deleteLog = async ()=>{
        if(selectedLog === false)
            return;
        await useDeleteLog(selectedLog, (result)=>{
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
            <Text style={GlobalStyles.title}>{ useLang().logs.title } ({logs.length})</Text>
            <FlatList 
                data={logs}
                style={tableStyles.table}
                
                ListHeaderComponent={()=>(
                    // List header
                    <View style={tableStyles.tableRow}>
                        <Text style={tableStyles.tableHeadCell}>{ useLang().tables.account }</Text>
                        <Text style={tableStyles.tableHeadCell}>{ useLang().tables.amount }</Text>
                        <Text style={tableStyles.tableHeadCell}>{ useLang().tables.date }</Text>
                    </View>
                )}
                
                renderItem={({ item }) => {
                    const itemStyle = useGetLogStyle(item.type);
                    let sign = "";
                    // switch (item.type) {
                    //     case useLogTypes.income:
                    //         sign = '+ ';
                    //         break;
                    //     case useLogTypes.expense:
                    //         sign = '- ';
                    //         break;
                    //     case useLogTypes.transfer:
                    //         sign = '<- ';
                    //         break;
                    // }
                    
                    let accountName = item.affectedAccount;
                    if(item.type === useLogTypes.transfer){
                        accountName = item.affectedAccount.to;
                    }

                    return (
                        // List item
                        <TouchableOpacity style={[tableStyles.tableRow, (selectedLog === item.id ? tableStyles.selectedItem : null )]} onPress={ ()=> selectLog(item.id) }>
                            <Text style={tableStyles.tableCell}>{accountName}</Text>
                            <Text style={[tableStyles.tableCell, itemStyle.amount]}>{sign + usePrintAmount(item.amount)}</Text>
                            <Text style={tableStyles.tableCell}>{item.date}</Text>
                        </TouchableOpacity>
                    )
                }}
                
                ListEmptyComponent={() => (
                    // Empty list message
                    <View style={tableStyles.tableRow}>
                        <Text style={tableStyles.tableCell}>{ useLang().logs.noLogs }</Text>
                    </View>
                )}
            />
            
            {/* Actions buttons */}
            <View style={GlobalStyles.actionBar}>
                {/* Delete account button */}
                <TouchableOpacity disabled={!selectedLog ? true : false} onPress={deleteLog}>
                    <Text style={[GlobalStyles.button, GlobalStyles.badBG, (!selectedLog ? GlobalStyles.disableButton : null)]}>{ useLang().buttons.delete }</Text>
                </TouchableOpacity>
            </View>
            
            <ScrollView style={GlobalStyles.mainScrollView}>
                {/* Log detail */}
                { selectedLog !== false ? useDisplayLogDetail(selectedLog,logs, ()=>selectLog(false) ) : null }

                {/* TOTALS BLOCKS */}
                {/* <View style={[GlobalStyles.block, {padding: 10}]}>
                    <Text style={GlobalStyles.title2}>Total incomes</Text>
                    <Text style={[GlobalStyles.title2, GlobalStyles.amount, GlobalStyles.goodText]}>{ usePrintAmount(totalIncomes) }</Text>
                </View>
                <View style={[GlobalStyles.block, {padding: 10}]}>
                    <Text style={GlobalStyles.title2}>Total transfers amount</Text>
                    <Text style={[GlobalStyles.title2, GlobalStyles.amount,{color: Colors.lightBlue2}]}>{ usePrintAmount(totalTransfers) }</Text>
                </View>
                <View style={[GlobalStyles.block, {padding: 10}]}>
                    <Text style={GlobalStyles.title2}>Total expenses</Text>
                    <Text style={[GlobalStyles.title2, GlobalStyles.amount, GlobalStyles.badText]}>{ usePrintAmount(totalExpenses) }</Text>
                </View> */}
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