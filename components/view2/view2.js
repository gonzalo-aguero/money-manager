import React, { useState } from 'react';
import {Text, View, StyleSheet, Button, TextInput, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import stylesModule from './styles';
const App = ()=> {
  const styles = StyleSheet.create(stylesModule);
  const titleKey = "view2Title";
  const [title, setTitle] = useState("Title not established");
  const [newTitle, setNewTitle] = useState("Title not established");
  const loadTitle = async ()=>{
    const savedTitle = await AsyncStorage.getItem(titleKey);
    setTitle(savedTitle);
  };
  const saveTitle = async ()=>{
    await AsyncStorage.setItem(titleKey, newTitle);
    Alert.alert("¡Perfecto!","Los cambios se guardaron correctamente.");
    loadTitle();
  }
  loadTitle();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TextInput 
        style={styles.input}
        placeholder="Put the new title"
        onChangeText={(value)=>{
          setNewTitle(value);
        }}
      />
      <Button
        title="Submit"
        onPress={ ()=> saveTitle()}
      ></Button>
    </View>
  );
}
export default App;