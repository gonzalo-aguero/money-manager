import React, { useState } from 'react';
import { View, StatusBar } from 'react-native';
import MainMenu from './components/MainMenu/MainMenu';
import Home from './views/Home';
import Expenses from './views/Expenses';
import Incomes from './views/Incomes';
import Accounts from './views/Accounts';
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
            default:
                viewToDisplay = home;
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