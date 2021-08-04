import React, { useState } from 'react';
import { View, StatusBar, Alert } from 'react-native';
import MainMenu from './components/MainMenu/MainMenu';
import Home from './views/Home';
import Expenses from './views/Expenses';
import Incomes from './views/Incomes';
import Accounts from './views/Accounts';
import Logs from './views/Logs';
const App = ()=>{
    const [view, setView] = useState(0);
    const setViewForChildren = (view)=>{
        setView(view);
        console.log(`Current view: [${view}]`);
    }
    const dataForChildren = {
        view: {
            viewName: view,
            setView: setViewForChildren
        }
    };
    const currentView = ()=>{
        const home = <Home></Home>;
        const expenses = <Expenses></Expenses>;
        const incomes = <Incomes></Incomes>;
        const accounts = <Accounts></Accounts>;
        const logs = <Logs></Logs>;
        let viewToDisplay = home;
        switch (view) {
            case 'home':
                viewToDisplay = home;
                break;
            case 'expenses':
                viewToDisplay = expenses;
                break;
            case 'incomes':
                viewToDisplay = incomes;
                break;
            case 'accounts':
                viewToDisplay = accounts;
                break;
            case 'logs':
                viewToDisplay = logs;
                break;
            default:
                viewToDisplay = home;
                Alert.alert("We are sorry :(","The requested view was not found. You will be sent to home view.");
                break;
        }
        return viewToDisplay;
    }
    return (
        <View style={{backgroundColor: 'white'}}>
            <StatusBar barStyle="default"></StatusBar>
            {currentView()}
            <MainMenu dataForChildren={dataForChildren} ></MainMenu>
        </View>
    );
}
export default App;