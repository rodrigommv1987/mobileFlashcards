import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Slider, Switch } from 'react-native'
import ScheduleNotificationStyle from '../styles/ScheduleNotificationStyle'
import { setLocalNotification } from "../utils/api"

class ScheduleNotificationView extends Component {

    static navigationOptions = {
        title: 'Schedule Notification',
    }

    state = {
        hour: 0,
        minute: 0,
        startTomorrow: true
    }

    render() {
        const { center, field, row } = ScheduleNotificationStyle,
            { hour, minute, startTomorrow } = this.state
        //const { decksStyle, deckItemStyle, deckItemTextStyle } = DeckListViewStyles

        return (
            <View style={center}>
                <View style={row}>
                    <View style={field}>
                        <Text style={{ fontSize: 24, textAlign: 'center' }}>Hour</Text>
                    </View>
                    <Slider
                        style={{ flex: 1 }}
                        step={1}
                        value={0}
                        maximumValue={23}
                        minimumValue={0}
                        onValueChange={hour => this.setState({ hour })}
                    />
                    <Text style={{ fontSize: 24, textAlign: 'center' }}>{hour}</Text>
                </View>
                <View style={row}>
                    <View style={field}>
                        <Text style={{ fontSize: 24, textAlign: 'center' }}>Minute</Text>
                    </View>
                    <Slider
                        style={{ flex: 1 }}
                        step={1}
                        value={0}
                        maximumValue={59}
                        minimumValue={0}
                        onValueChange={minute => this.setState({ minute })}
                    />
                    <Text style={{ fontSize: 24, textAlign: 'center' }}>{minute}</Text>
                </View>

                <View style={row}>
                    <View style={field}>
                        <Text style={{ fontSize: 24, textAlign: 'center' }}>Schedule for Tomorrow</Text>
                    </View>
                    <Switch style={{ flex: 1 }}
                        value={startTomorrow}
                        onValueChange={startTomorrow => this.setState({ startTomorrow })}
                    />
                </View>
                <View style={row}>
                    <TouchableOpacity onPress={() => setLocalNotification({
                        hour: this.state.hour,
                        minute: this.state.minute,
                        startTomorrow: this.state.startTomorrow
                    }, true)}>
                        <Text>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default ScheduleNotificationView