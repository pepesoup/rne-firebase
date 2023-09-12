import { Store } from '@src/stores/store'
import { NavigatorProps } from 'expo-router/build/views/Navigator'
import { ReactElement } from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'

export type DataProviderFallbackProps = {
    store: Store
    slot?: ReactElement<NavigatorProps>
}

export const DataProviderFallback = ({ store, slot }: DataProviderFallbackProps) => {
    const text = store.state === 'loading' ? 'Loading...' : store.content
    const backgroundColor = store.state === 'hasError' ? 'red' : 'green'
    return (
        <>
            <View
                style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor,
                }}
            >
                <Text style={{ color: 'white' }}>{text}</Text>
            </View>
            {slot ? slot : null}
        </>
    )
}
