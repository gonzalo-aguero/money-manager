import {StyleSheet} from 'react-native';
export const Colors = {
    darkGreyBG: "#151313",
    darkGreyBG2: "#2B2B2A",
    greyInputBG: "#5A5A5A",
    lightBlue: "#4DC1A7",
    goodGreen: "#5AC61E",
    goodGreenBG: "#13AA13",
    lightColor: "white",
};
const Styles = StyleSheet.create({
    mainContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: Colors.darkGreyBG,
    },
    mainScrollView: {
        width: '100%',
        marginBottom: '15%',
    },
    title: {
        fontSize: 30,
        marginTop: 5,
        marginBottom: 5,
        borderBottomWidth: 1,
        borderColor: Colors.lightColor,
        width: "50%",
        textAlign: 'center',
        color: Colors.lightColor
    },
    title2: {
        fontSize: 26,
        marginBottom: 5,
        textAlign: 'center',
        color: Colors.lightColor
    },
    title3: {
        fontSize: 24,
        marginBottom: 5,
        color: Colors.lightColor
    },
    text: {
        color: Colors.lightColor,
        fontSize: 16
    },
    text2: {
        color: Colors.lightColor,
        fontSize: 18
    },
    goodText: {
        color: Colors.goodGreen
    },
    warningText: {
        color: '#CDD21B',
    },
    badText: {
        color: '#C61E1E',
    },
    goodBG: {
        backgroundColor: Colors.goodGreenBG,
        color: Colors.lightColor,
    },
    warningBG: {
        backgroundColor: 'yellow',
        color: Colors.lightColor,
    },
    badBG: {
        backgroundColor: 'red',
        color: Colors.lightColor,
    },
    form: {
        padding: 15,
        margin: 10,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderColor: '#C4C4C4',
        borderWidth: .3,
    },
    formInput: {
        backgroundColor: Colors.greyInputBG,
        color: Colors.lightColor,
        padding: 4,
        marginVertical: 7,
        borderRadius: 3
    },
    formInputPlaceHolder: {
        color: '#C6C6C6'
    },  
    formSubmitButton: {
        color: Colors.lightColor,
        marginVertical: 7,
        borderRadius: 3
    },
    formSubmitButtonText: {
        color: Colors.lightColor,
        padding: 8,
        fontSize: 17,
        textAlign: 'center',
    },
    actionBar: {
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-evenly',
        width:'100%',
        backgroundColor: Colors.darkGreyBG2,
        padding: 10,
    },
    button: {
        fontSize: 16,
        padding: 7,
        borderRadius: 3
    },
    disableButton: {
        opacity: 0.5,
    }
});
export default Styles;
export function createTableStyles(columns = null){
    let columnWidth;
    if(columns !== null){
        columnWidth = (100 / columns) + '%';
    }else{
        columnWidth = 'auto';
    }
    const tableStyles = StyleSheet.create({
        table: {
            width: '100%',
            height: '25%',
            maxHeight: '25%',
        },
        tableRow: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            width: '100%',
            padding: 4,
            paddingHorizontal: 15,
        },
        tableHeadCell: {
            color: Colors.lightColor,
            fontSize: 18,
            fontWeight: 'bold',
            width: columnWidth,
            textAlign: 'center',
        },
        tableCell: {
            color: Colors.lightColor,
            fontSize: 16,
            width: columnWidth,
            textAlign: 'center',
        },
        selectedItem: {
            backgroundColor: 'grey',
        }
    });
    return tableStyles;
}