import React, { useEffect, useState } from 'react';
import { View, StatusBar, Alert } from 'react-native';
import * as Font from "expo-font";
import MainMenu from './components/MainMenu/MainMenu';
import Home from './views/Home';
import Expenses from './views/Expenses';
import Incomes from './views/Incomes';
import Accounts from './views/Accounts';
import Transfers from './views/Transfers';
import Logs from './views/Logs';
import About from './views/About';
import L from './hooks/LogHooks';

const App = ()=>{
    const [view, setView] = useState("home");
    const [fontsLoaded, setFontsLoaded] = useState(false);
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
        const home = <Home dataForChildren={dataForChildren}></Home>;
        const expenses = <Expenses></Expenses>;
        const incomes = <Incomes></Incomes>;
        const accounts = <Accounts  dataForChildren={dataForChildren}></Accounts>;
        const transfers = <Transfers dataForChildren={dataForChildren}></Transfers>;
        const logs = <Logs></Logs>;
        const about = <About dataForChildren={dataForChildren}></About>
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
            case 'transfers':
                viewToDisplay = transfers;
                break;
            case 'logs':
                viewToDisplay = logs;
                break;
            case 'about':
                viewToDisplay = about;
                break;
            default:
                viewToDisplay = home;
                setView("home");
                Alert.alert("We are sorry :(","The requested view was not found. You will be sent to home view.");
                break;
        }
        return viewToDisplay;
    }
    const loadFonts = async ()=>{
        await Font.loadAsync({
            'Quicksand-Light': require("./assets/fonts/Quicksand/static/Quicksand-Light.ttf"),
            'Quicksand-Medium': require("./assets/fonts/Quicksand/static/Quicksand-Medium.ttf"),
            'Quicksand-Bold': require("./assets/fonts/Quicksand/static/Quicksand-Bold.ttf")
        });
        setFontsLoaded(true);
    }
    useEffect(()=>{
        if(!fontsLoaded){
            loadFonts();
        }
        
    },[]);
    return (
        <View style={{backgroundColor: 'white'}}>
            <StatusBar barStyle="default"></StatusBar>
            {currentView()}
            <MainMenu dataForChildren={dataForChildren} ></MainMenu>
        </View>
    );
}
export default App;