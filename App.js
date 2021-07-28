import React, { useState } from 'react';
import {View, StatusBar} from 'react-native';
import Home from './views/Home';
import Accounts from './views/Accounts/Accounts';
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
        const home = <Home dataForChildren={dataForChildren}></Home>;
        const accounts = <Accounts dataForChildren={dataForChildren}></Accounts>;
        let viewToDisplay = home;
        switch (view) {
            case 'home':
                viewToDisplay = home;
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
        </View>
    );
}
export default App;