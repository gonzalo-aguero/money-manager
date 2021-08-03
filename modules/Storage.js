import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
/**
 * 
 * @param {String} value Value to save (required).
 * @param {String} key Key to get it in the future. By default it is: "DefaultKey-" + Date.now().
 * @returns Message of success if all ok.
 * @returns False if the value is null.
 */
export async function defaultSave(value = null, key = null){
    if(value === null){
        console.error("A value is required");
        return false;
    }
    if(key === null){
        key = "DefaultKey-" + Date.now();
    }
    value = JSON.stringify(value);//Saved as a String
    const result = await AsyncStorage.setItem(key, value, (error)=>{
        if(error !== null){
            console.error(error);
            return false;
        }else{
            const msg = `Data was successfully saved as "${key}"`;
            console.log(msg);
            Alert.alert("Success","The data was saved correctly");
            return true;
        }
    });
    return result;
}
export async function defaultGet(key = null) {
    if(key === null){
        console.error("A key is required");
        return false;
    }
    let result = await AsyncStorage.getItem(key, (error,result)=>{
        if(error !== null){
            console.error(error);
            return false;
        }else{
            return result;
        }
    });
    result = await JSON.parse(result);
    return result;
}