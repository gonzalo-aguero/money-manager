import React, { useState } from 'react';
import {View} from 'react-native';
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
            viewIndex: view,
            setView: setViewForChildren
        }
    };
    const currentView = ()=>{
        const home = <Home dataForChildren={dataForChildren}></Home>;
        const accounts = <Accounts dataForChildren={dataForChildren}></Accounts>;
        let viewToDisplay = home;
        switch (view) {
            case 0:
                viewToDisplay = home;
                break;
            case 1:
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
            {currentView()}
        </View>
    );
}
export default App;