import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'

export const Loading = () => {
    console.log('+++++ SuspenseFallback ')
    return (
        <View
            style={{
                ...StyleSheet.absoluteFillObject,
                zIndex: 1000,
                backgroundColor: 'purple',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Text>Loading...</Text>
        </View>
    )
}
