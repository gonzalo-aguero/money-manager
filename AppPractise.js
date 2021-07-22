import React, { useState } from 'react';
import {Text, View, StyleSheet, Image, Button, Alert, TouchableOpacity, TextInput} from 'react-native';
import image from './assets/favicon.png';
import View1 from './components/view1/view1';
import View2 from './components/view2/view2';
const App = ()=> {
  const [bgColor, changeBgColor] = useState('#252525');
  const [currentView, setView] = useState(0);

  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      height: '100%',
      backgroundColor: bgColor
    },
    title: {
      fontSize: 35,
      color: 'green'
    },
    image: {
      width: 100,
      height: 100,
      resizeMode: 'contain'
    },
    TouchableOpacity: {
      backgroundColor: 'white',
      color: 'black',
      borderWidth: 5,
      borderColor: 'black',
      borderStyle: 'dashed'
    }
  });
  const showView = ()=> {
    let newView = <View1 />;
    switch (currentView) {
      case 0:
        newView = <View1 />;
        break;
      case 1:
        newView = <View2 />;
        break;
      default:
        newView = <View1 />;
        break;
    }
    return newView;
  }
  const TouchableOpacityHandle = ()=>{
    bgColor === '#252525' ? changeBgColor('#f2f2f2') : changeBgColor('#252525');
    if(currentView === 0){
      setView(1);
    }else{
      setView(0);
    }
  }
  return (
    <View style={styles.container}>
      { showView() }
      <Image source={image} style={styles.image} />
      <Text style={styles.title}>I'm DoubleM</Text>
      <Button color='green' title='Press me to start' onPress={()=> Alert.alert("hellow")} />
      <TouchableOpacity onPress={TouchableOpacityHandle} style={styles.TouchableOpacity}>
        <Text>TouchableOpacity</Text>
      </TouchableOpacity>
    </View>
  );
}
export default App;
