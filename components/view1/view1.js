import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
const App = ()=> {
  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      height: '50%',
      backgroundColor: '#252525'
    },
    title: {
      fontSize: 35,
      color: 'white'
    },
  });
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vista 1</Text>
    </View>
  );
}
export default App;