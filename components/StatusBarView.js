//react
import React from 'react'
import { View, StatusBar } from 'react-native'
import { Constants } from 'expo'

function StatusBarView() {
    return (
        <View style={{ height: Constants.statusBarHeight }}>
            <StatusBar translucent barStyle="light-content" />
        </View>
    )
}

export default StatusBarView