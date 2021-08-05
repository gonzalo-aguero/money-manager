import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import GlobalStyles, { createTableStyles, Colors } from '../modules/GlobalStyles';
import { printAmount } from '../modules/Number';
import { AccountHooks, LogHooks, ExpenseHooks, IncomeHooks, TransferHooks } from '../hooks/hooks';
const Home = (props)=>{
    const dataForChildren = props.dataForChildren;
    const tableStyles = createTableStyles(2, 125);
    const logsTableStyles = createTableStyles(3, 100);
    const [totalReserve, setTotalReserve] = useState(0);
    const [accounts, setAccounts] = useState([]);
    const [logs, setLogs] = useState([]);
    const [last5Expenses, setLast5Expenses] = useState([]);
    const [last5Incomes, setLast5Incomes] = useState([]);
    const [last5Transfers, setLast5Transfers] = useState([]);
    const getAccounts = async ()=>{
        const result = await AccountHooks.useGetAccounts();
        setAccounts(result);
        setTotalReserve(await AccountHooks.useGetTotalReserve(result));
    }
    const getLogs = async ()=>{
        const result = await LogHooks.useGetLogs();
        setLogs(result);
    }
    const getLast5Expenses = async ()=>{
        let numberOfLogsToDisplay = 5;
        let last5Expenses = []
        const result = await ExpenseHooks.useGetExpenses(logs);
        if(result.length < 5){
            numberOfLogsToDisplay = result.length;
        } 
        result.forEach( (expenseLog,i) => {
            last5Expenses[i] = expenseLog;
        });
        setLast5Expenses(last5Expenses);
    }
    const getLast5Incomes = async ()=>{
        let numberOfLogsToDisplay = 5;
        let last5Incomes = []
        const result = await IncomeHooks.useGetIncomes(logs);
        if(result.length < 5){
            numberOfLogsToDisplay = result.length;
        } 
        result.forEach( (incomeLog,i) => {
            last5Incomes[i] = incomeLog;
        });
        setLast5Incomes(last5Incomes);
    }
    const getLast5Transfers = async ()=>{
        let numberOfLogsToDisplay = 5;
        let last5Transfers = []
        const result = await TransferHooks.useGetTransfers(logs);
        if(result.length < 5){
            numberOfLogsToDisplay = result.length;
        } 
        result.forEach( (transferLog,i) => {
            last5Transfers[i] = transferLog;
        });
        setLast5Transfers(last5Transfers);
    }
    useEffect(()=>{
        getAccounts();
        getLogs();
        getLast5Expenses();
        getLast5Incomes();
        getLast5Transfers();
    },[]);
    return (
        <View style={GlobalStyles.mainContainer}>
            <View style={GlobalStyles.header}>
                <Text style={GlobalStyles.title}>Home</Text>
                <TouchableOpacity onPress={()=> dataForChildren.view.setView("about")} style={{
                    position: 'absolute',
                    right: 15,
                    top: 7.5,
                }}>
                    <Image 
                        source={require('../assets/icons/outline_info_white_24dp.png')} 
                        style={{ 
                            width: 27.5,
                            height: 27.5,
                            resizeMode: 'cover',                            
                        }}
                    />
                </TouchableOpacity>
            </View>
            <View style={[GlobalStyles.block2, {
                borderTopWidth: .5,
                borderBottomWidth: .5,
                borderTopColor: Colors.darkGreyBG2,
                borderBottomColor: Colors.darkGreyBG2
            }]}>
                <Text style={[GlobalStyles.title3, {textAlign:'center'}]}>Total amount</Text>
                <Text style={[GlobalStyles.title2, GlobalStyles.amount, GlobalStyles.goodText]}>{printAmount(totalReserve)}</Text>
                {/* Accounts table */}
                <FlatList 
                    data={accounts}
                    style={[tableStyles.table]}
                    ListHeaderComponent={()=>(
                        // List header
                        <View style={tableStyles.tableRow}>
                            <Text style={tableStyles.tableHeadCell}>Name</Text>
                            <Text style={tableStyles.tableHeadCell}>Reserve</Text>
                        </View>
                    )}
                    renderItem={({ item }) => (
                        // List item
                        <View style={[tableStyles.tableRow]}>
                            <Text style={tableStyles.tableCell}>{item.name}</Text>
                            <Text style={[tableStyles.tableCell,GlobalStyles.goodText]}>{printAmount(item.reserve)}</Text>
                        </View>
                    )}
                    ListEmptyComponent={() => (
                        // Empty list message
                        <View style={tableStyles.tableRow}>
                            <Text style={tableStyles.tableCell}>No accounts created</Text>
                        </View>
                    )}
                />
            </View>
            <View>
                <Text style={[GlobalStyles.title3, {textAlign:'center'}]}>Lastest expenses</Text>
                <FlatList 
                    data={last5Expenses}
                    style={logsTableStyles.table}
                    ListHeaderComponent={()=>(
                        // List header
                        <View style={logsTableStyles.tableRow}>
                            <Text style={logsTableStyles.tableHeadCell}>Account</Text>
                            <Text style={logsTableStyles.tableHeadCell}>Amount</Text>
                            <Text style={logsTableStyles.tableHeadCell}>Date</Text>
                        </View>
                    )}
                    renderItem={({ item }) => (
                        // List item
                        <View style={[logsTableStyles.tableRow]}>
                            <Text style={logsTableStyles.tableCell}>{item.affectedAccount}</Text>
                            <Text style={[logsTableStyles.tableCell,GlobalStyles.badText]}>{"- " + printAmount(item.amount)}</Text>
                            <Text style={logsTableStyles.tableCell}>{item.date}</Text>
                        </View>
                    )}
                    ListEmptyComponent={() => (
                        // Empty list message
                        <View style={logsTableStyles.tableRow}>
                            <Text style={logsTableStyles.tableCell}>No expenses recorded</Text>
                        </View>
                    )}
                />
            </View>
            <View>
                <Text style={[GlobalStyles.title3, {textAlign:'center'}]}>Lastest incomes</Text>
                <FlatList 
                    data={last5Incomes}
                    style={logsTableStyles.table}
                    ListHeaderComponent={()=>(
                        // List header
                        <View style={logsTableStyles.tableRow}>
                            <Text style={logsTableStyles.tableHeadCell}>Account</Text>
                            <Text style={logsTableStyles.tableHeadCell}>Amount</Text>
                            <Text style={logsTableStyles.tableHeadCell}>Date</Text>
                        </View>
                    )}
                    renderItem={({ item }) => (
                        // List item
                        <View style={[logsTableStyles.tableRow]}>
                            <Text style={logsTableStyles.tableCell}>{item.affectedAccount}</Text>
                            <Text style={[logsTableStyles.tableCell,GlobalStyles.goodText]}>{"+ " + printAmount(item.amount)}</Text>
                            <Text style={logsTableStyles.tableCell}>{item.date}</Text>
                        </View>
                    )}
                    ListEmptyComponent={() => (
                        // Empty list message
                        <View style={logsTableStyles.tableRow}>
                            <Text style={logsTableStyles.tableCell}>No incomes recorded</Text>
                        </View>
                    )}
                />
            </View>
            <View>
                <Text style={[GlobalStyles.title3, {textAlign:'center'}]}>Lastest transfers</Text>
                <FlatList 
                    data={last5Transfers}
                    style={logsTableStyles.table}
                    ListHeaderComponent={()=>(
                        // List header
                        <View style={logsTableStyles.tableRow}>
                            <Text style={logsTableStyles.tableHeadCell}>Account</Text>
                            <Text style={logsTableStyles.tableHeadCell}>Amount</Text>
                            <Text style={logsTableStyles.tableHeadCell}>Date</Text>
                        </View>
                    )}
                    renderItem={({ item }) => (
                        // List item
                        <View style={[logsTableStyles.tableRow]}>
                            <Text style={logsTableStyles.tableCell}>{item.affectedAccount}</Text>
                            <Text style={[logsTableStyles.tableCell, {color: Colors.lightBlue2}]}>{"<- " + printAmount(item.amount)}</Text>
                            <Text style={logsTableStyles.tableCell}>{item.date}</Text>
                        </View>
                    )}
                    ListEmptyComponent={() => (
                        // Empty list message
                        <View style={logsTableStyles.tableRow}>
                            <Text style={logsTableStyles.tableCell}>No transfers recorded</Text>
                        </View>
                    )}
                />
            </View>
        </View>
    );
}
export default Home;