import {StyleSheet} from 'react-native';
const Styles = StyleSheet.create({
    mainContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#151313',
        // marginTop: 24
    },
    mainScrollView: {},
    title: {
        fontSize: 30,
        marginTop: 5,
        marginBottom: 5,
        borderBottomWidth: 1,
        borderColor: 'white',
        width: "50%",
        textAlign: 'center',
        color: 'white'
    },
    title2: {
        fontSize: 26,
        marginBottom: 5,
        textAlign: 'center',
        color: 'white'
    },
    text: {
        color: 'white',
        fontSize: 16
    },
    goodText: {
        color: '#5AC61E'
    },
    warningText: {
        color: '#CDD21B',
    },
    badText: {
        color: '#C61E1E',
    },
    goodBG: {
        backgroundColor: 'green',
    },
    warningBG: {
        backgroundColor: 'yellow',
    },
    badBG: {
        backgroundColor: 'red',
        color: 'white',
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
        backgroundColor: '#5A5A5A',
        color: 'white',
        padding: 4,
        marginVertical: 7,
        borderRadius: 3
    },
    formInputPlaceHolder: {
        color: '#C6C6C6'
    },  
    formSubmitButton: {
        color: 'white',
        marginVertical: 7,
        borderRadius: 3
    },
    formSubmitButtonText: {
        color: 'white',
        padding: 8,
        fontSize: 17,
        textAlign: 'center',
    },
    button: {
        fontSize: 16,
        padding: 5,
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
            borderBottomWidth: .3,
            borderColor: 'white',
            marginBottom: 15,
            maxHeight: '20%',
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
            color: 'white',
            fontSize: 18,
            fontWeight: 'bold',
            width: columnWidth,
            textAlign: 'center',
        },
        tableCell: {
            color: 'white',
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