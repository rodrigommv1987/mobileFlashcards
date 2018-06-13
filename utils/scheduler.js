import { initNotifications, setLocalNotification, getNotificationData } from "./api"
import { NOTIFICATION_DEFAULT } from "../config";

export const initScheduler = () => {
    getNotificationData()
        .then(nData => {
            initNotifications(
                ((!nData) || (!nData.config)) ?
                    NOTIFICATION_DEFAULT
                    :
                    nData.config
            )
            .then(setLocalNotification)
        })
}