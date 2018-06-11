import { setLocalNotification, getNotificationData } from "./api"
import { NOTIFICATION_DEFAULT } from "../config";

export const initScheduler = () => {
    getNotificationData()
        .then(nData => {
            (nData.hour && nData.minute) ?
                setLocalNotification(nData)
                :
                setLocalNotification(NOTIFICATION_DEFAULT)
        })
}