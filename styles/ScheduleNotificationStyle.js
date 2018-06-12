import { StyleSheet } from 'react-native'
import { primary, secondary, tertiary } from "../styles/_sharedStyles";

const ScheduleNotificationView = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:secondary
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: 20,
        marginRight: 20,
    },
    labelContainer: {
        width: 170
    },
    label: {
        fontSize: 24,
        textAlign: 'left'
    },
    slider: {
        flex: 1
    },
    valueLabel: {
        fontSize: 24,
        textAlign: 'center',
        width:30
    },
    save:{
        width:200,
        textAlign:'center',
        textAlignVertical:'center',
        backgroundColor:tertiary,
        borderRadius:7,
        height:50,
    }
})

export default ScheduleNotificationView