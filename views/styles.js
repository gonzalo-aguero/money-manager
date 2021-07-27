import {StyleSheet} from 'react-native';
const Styles = StyleSheet.create({
    mainContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#151313',
        marginTop: 24
    },
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
            maxHeight: '50%',
            borderBottomWidth: .25,
            borderColor: 'white',
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
        }
    });
    return tableStyles;
}