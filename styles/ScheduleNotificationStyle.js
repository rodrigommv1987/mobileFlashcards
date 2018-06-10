import { StyleSheet } from 'react-native'
import { black, red } from "../utils/colors";

const ScheduleNotificationView = StyleSheet.create({
    row: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
    },
    field: {
        width: 155,
        justifyContent: 'center',
        alignItems: 'center'
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30,
    }
})

export default ScheduleNotificationView