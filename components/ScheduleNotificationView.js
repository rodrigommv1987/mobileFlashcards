//react
import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Slider, Switch } from 'react-native'

//style
import ScheduleNotificationStyle from '../styles/ScheduleNotificationStyle'

//config
import { NOTIFICATION_DEFAULT } from "../config"

//utils
import { getNotificationData, setLocalNotification, saveNotificationConfig } from "../utils/api";

class ScheduleNotificationView extends Component {

    state = {
        hour: NOTIFICATION_DEFAULT.hour,
        minute: NOTIFICATION_DEFAULT.minute,
        startTomorrow: NOTIFICATION_DEFAULT.startTomorrow
    }

    componentDidMount() {
        getNotificationData().then(nData => {
            nData.notificationSet ? this.setState({
                hour: nData.nextNotification.hour,
                minute: nData.nextNotification.minute,
                startTomorrow: nData.nextNotification.startTomorrow
            }) : this.setState({ NOTIFICATION_DEFAULT })
        })
    }

    render() {
        const { container, label, labelContainer, row, slider, valueLabel, save } = ScheduleNotificationStyle,
            { hour, minute, startTomorrow } = this.state

        return (
            <View style={container}>
                <View style={row}>
                    <View style={labelContainer}>
                        <Text style={label}>Hour</Text>
                    </View>
                    <Slider
                        style={slider}
                        step={1}
                        value={hour}
                        maximumValue={23}
                        minimumValue={0}
                        onValueChange={hour => this.setState({ hour })}
                    />
                    <Text style={valueLabel}>{hour}</Text>
                </View>
                <View style={row}>
                    <View style={labelContainer}>
                        <Text style={label}>Minute</Text>
                    </View>
                    <Slider
                        style={slider}
                        step={1}
                        value={minute}
                        maximumValue={59}
                        minimumValue={0}
                        onValueChange={minute => this.setState({ minute })}
                    />
                    <Text style={valueLabel}>{minute}</Text>
                </View>
                <View style={row}>
                    <View style={labelContainer}>
                        <Text style={label}>Start Tomorrow</Text>
                    </View>
                    <Switch style={slider}
                        value={startTomorrow}
                        onValueChange={startTomorrow => this.setState({ startTomorrow })}
                    />
                </View>
                <View style={row}>
                    <TouchableOpacity onPress={() => {
                        saveNotificationConfig({
                            hour: this.state.hour,
                            minute: this.state.minute,
                            startTomorrow: this.state.startTomorrow
                        }).then(setLocalNotification)
                    }}>
                        <Text style={save}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default ScheduleNotificationView