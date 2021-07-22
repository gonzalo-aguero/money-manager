import React, { useState } from 'react';
import {Text, View} from 'react-native';
import Home from './views/Home';
const App = ()=>{
    const [view, setView] = useState(0);
    const viewData = {
        view: view,
        setViewMethod: setView
    };
    const showCurrentView = ()=>{
        const home = <Home viewData={viewData}></Home>;
        let viewToDisplay = home;
        switch (view) {
            case 0:
                viewToDisplay = home;
                break;
            case 1:
                viewToDisplay = <Text>View not found</Text>;
                break;
            default:
                viewToDisplay = home;
                break;
        }
        return viewToDisplay;
    }
    return (
        <View style={{backgroundColor: 'white'}}>
            {showCurrentView()}
        </View>
    );
}
export default App;