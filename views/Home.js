import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import GlobalStyles, { createTableStyles, Colors } from '../modules/GlobalStyles';
import { AccountHooks, usePrintAmount, useDate } from '../hooks/hooks';
import { useGetFilteredLogs} from '../hooks/LogHooks';

const Home = (props)=>{
    const dataForChildren = props.dataForChildren;
    const tableStyles = createTableStyles(2, 125);
    const logsTableStyles = createTableStyles(3, 100);
    const [totalReserve, setTotalReserve] = useState(0);
    const [accounts, setAccounts] = useState([]);
    const [last5Expenses, setLast5Expenses] = useState([]);
    const [last5Incomes, setLast5Incomes] = useState([]);
    const [last5Transfers, setLast5Transfers] = useState([]);
    
    const getAccounts = async ()=>{
        const result = await AccountHooks.useGetAccounts();
        setAccounts(result);
        setTotalReserve(await AccountHooks.useGetTotalReserve(result));
    }
    
    const getFilteredLogs = async ()=>{
        const logs = await useGetFilteredLogs();

        getLast5Expenses(logs.expenses);
        getLast5Incomes(logs.incomes);
        getLast5Transfers(logs.transfers);
    }
    
    const getLast5Expenses = (filteredLogs = [])=>{
        let last5Expenses = [];
        
        let numberOfLogsToDisplay = 5;
        if(filteredLogs.length < 5){
            numberOfLogsToDisplay = filteredLogs.length;
        } 

        filteredLogs.forEach( (expenseLog,i) => {
            if((i+1) <= numberOfLogsToDisplay){
                last5Expenses[i] = expenseLog;
            }
        });

        setLast5Expenses(last5Expenses);
    }
    
    const getLast5Incomes = async (filteredLogs = [])=>{
        let last5Incomes = [];

        let numberOfLogsToDisplay = 5;
        if(filteredLogs.length < 5){
            numberOfLogsToDisplay = filteredLogs.length;
        } 
        
        filteredLogs.forEach( (incomeLog,i) => {
            if((i+1) <= numberOfLogsToDisplay){
                last5Incomes[i] = incomeLog;
            }
        });
        
        setLast5Incomes(last5Incomes);
    }
    
    const getLast5Transfers = async (filteredLogs = [])=>{
        let last5Transfers = [];
        
        let numberOfLogsToDisplay = 5;
        if(filteredLogs.length < 5){
            numberOfLogsToDisplay = filteredLogs.length;
        } 

        filteredLogs.forEach( (transferLog,i) => {
            if((i+1) <= numberOfLogsToDisplay){    
                last5Transfers[i] = transferLog;
            }
        });
        
        setLast5Transfers(last5Transfers);
    }
    
    useEffect(()=>{
        getAccounts();
        getFilteredLogs();
    },[]);
    
    return (
        <View style={GlobalStyles.mainContainer}>
            
            {/*** 
             * ======================================
             * =========== HEADER SECTION =========== 
             * ======================================
             ***/}
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
            {/*** 
             * ==========================================
             * =========== END HEADER SECTION =========== 
             * ==========================================
             ***/}


            {/*** 
             * ========================================
             * =========== ACCOUNTS SECTION =========== 
             * ========================================
             ***/}
            <View style={[GlobalStyles.block2, {
                borderTopWidth: .5,
                borderBottomWidth: .5,
                borderTopColor: Colors.darkGreyBG2,
                borderBottomColor: Colors.darkGreyBG2
            }]}>
                <Text style={[GlobalStyles.title3, {textAlign:'center'}]}>Total amount</Text>
                <Text style={[GlobalStyles.title2, GlobalStyles.amount, GlobalStyles.goodText]}>{usePrintAmount(totalReserve)}</Text>
                
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
                            <Text style={[tableStyles.tableCell,GlobalStyles.goodText]}>{usePrintAmount(item.reserve)}</Text>
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
            {/*** 
             * ============================================
             * =========== END ACCOUNTS SECTION =========== 
             * ============================================
             ***/}
            


            {/*** 
             * ========================================
             * =========== EXPENSES SECTION =========== 
             * ========================================
             ***/}
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
                    
                    renderItem={ ({ item }) => (
                        // List item
                        <View style={[logsTableStyles.tableRow]}>
                            <Text style={logsTableStyles.tableCell}>{item.affectedAccount}</Text>
                            <Text style={[logsTableStyles.tableCell,GlobalStyles.badText]}>{"- " + usePrintAmount(item.amount)}</Text>
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
            {/*** 
             * ============================================
             * =========== END EXPENSES SECTION =========== 
             * ============================================
             ***/}


            
            {/*** 
             * =======================================
             * =========== INCOMES SECTION =========== 
             * =======================================
             ***/}
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
                            <Text style={[logsTableStyles.tableCell,GlobalStyles.goodText]}>{"+ " + usePrintAmount(item.amount)}</Text>
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
            {/*** 
             * ===========================================
             * =========== END INCOMES SECTION =========== 
             * ===========================================
             ***/}



            {/*** 
             * =========================================
             * =========== TRANSFERS SECTION =========== 
             * =========================================
             ***/}
            <View>
                <Text style={[GlobalStyles.title3, {textAlign:'center'}]}>Lastest transfers</Text>
                <FlatList 
                    data={last5Transfers}
                    style={logsTableStyles.table}
                    
                    ListHeaderComponent={()=>(
                        // List header
                        <View style={logsTableStyles.tableRow}>
                            <Text style={logsTableStyles.tableHeadCell}>To</Text>
                            <Text style={logsTableStyles.tableHeadCell}>Amount</Text>
                            <Text style={logsTableStyles.tableHeadCell}>Date</Text>
                        </View>
                    )}
                    
                    renderItem={({ item }) => (
                        // List item
                        <View style={[logsTableStyles.tableRow]}>
                            <Text style={logsTableStyles.tableCell}>{item.affectedAccount.to}</Text>
                            <Text style={[logsTableStyles.tableCell, {color: Colors.lightBlue2}]}>{"<- " + usePrintAmount(item.amount)}</Text>
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
            {/*** 
             * =============================================
             * =========== END TRANSFERS SECTION =========== 
             * =============================================
             ***/}
        </View>
    );
}

export default Home;