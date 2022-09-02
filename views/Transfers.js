import React, { useEffect, useState } from 'react';
import {View, ScrollView, Text, FlatList,TouchableOpacity } from 'react-native';
import AddTransferForm from '../components/Transfers/AddTransferForm';
import GlobalStyles,{ createTableStyles, Colors } from '../modules/GlobalStyles';
import { TransferHooks, usePrintAmount } from '../hooks/hooks';
import { useDisplayLogDetail, useDeleteLog } from '../hooks/LogHooks';
import { Icons, getViewIconImage } from '../modules/Global';

const Transfers = (props)=>{
    const dataForChildren = props.dataForChildren;
    const currentViewName = dataForChildren.view.viewName;
    const tableStyles = createTableStyles(3);
    const [addTransferForm, displayAddTransferForm] = useState(false);//True to display create transfer form.
    const [transfers, setTransfers] = useState([]);
    const [selectedTransfer, selectTransfer] = useState(false);
    
    const getTransfers = async ()=>{
        setTransfers(await TransferHooks.useGetTransfers());
    }
    
    const deleteTransfer = async ()=>{
        if(selectedTransfer === false)
            return;
            
        await useDeleteLog(selectedTransfer, (result)=>{
            if(result === true){
                selectTransfer(false);
            }
            getTransfers();
        });
    }
    
    useEffect(() => {
        getTransfers();
    }, []);
    
    return (
        <View style={GlobalStyles.mainContainer}>
            <View style={GlobalStyles.header}>
                <Text style={GlobalStyles.title}>Transfers</Text>
                <TouchableOpacity onPress={()=> dataForChildren.view.setView("accounts")} style={{
                    position: 'absolute',
                    right: 15,
                    top: 7.5,
                }}>
                    {getViewIconImage(Icons.accounts, currentViewName === "transfers", GlobalStyles.activeButton)}
                </TouchableOpacity>
            </View>

            <FlatList 
                data={transfers}
                style={tableStyles.table}

                ListHeaderComponent={()=>(
                    // List header
                    <View style={tableStyles.tableRow}>
                        <Text style={tableStyles.tableHeadCell}>To</Text>
                        <Text style={tableStyles.tableHeadCell}>Amount</Text>
                        <Text style={tableStyles.tableHeadCell}>Date</Text>
                    </View>
                )}
            
                renderItem={({ item }) => (
                    // List item
                    <TouchableOpacity style={[tableStyles.tableRow, (selectedTransfer === item.id ? tableStyles.selectedItem : null )]} onPress={ ()=> selectTransfer(item.id) }>
                        <Text style={tableStyles.tableCell}>{item.affectedAccount.to}</Text>
                        <Text style={[tableStyles.tableCell, {color: Colors.lightBlue2}]}>{ usePrintAmount(item.amount) }</Text>
                        <Text style={tableStyles.tableCell}>{item.date}</Text>
                    </TouchableOpacity>
                )}
            
                ListEmptyComponent={() => (
                    // Empty list message
                    <View style={tableStyles.tableRow}>
                        <Text style={tableStyles.tableCell}>No transfers recorded</Text>
                    </View>
                )}
            />
            
            {/* Actions buttons */}
            <View style={GlobalStyles.actionBar}>
                {/* Add expense button */}
                <TouchableOpacity onPress={ ()=> !addTransferForm ? displayAddTransferForm(true) : displayAddTransferForm(false) }>
                    <Text style={[GlobalStyles.button, GlobalStyles.goodBG]}>{ !addTransferForm ? "Add transfer" : "Hide form" }</Text>
                </TouchableOpacity>
            
                {/* Delete account button */}
                <TouchableOpacity disabled={!selectedTransfer ? true : false} onPress={deleteTransfer}>
                    <Text style={[GlobalStyles.button, GlobalStyles.badBG, (!selectedTransfer ? GlobalStyles.disableButton : null)]}>Delete</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={GlobalStyles.mainScrollView}>
                {/* Add Transfer Form */}
                { addTransferForm ? <AddTransferForm getTransfers={getTransfers} displayAddTransferForm={displayAddTransferForm}/> : null }

                {/* Log detail */}
                { selectedTransfer !== false ? useDisplayLogDetail(selectedTransfer, transfers, ()=> selectTransfer(false)) : null }
            </ScrollView>
        </View>
    );
}

export default Transfers;