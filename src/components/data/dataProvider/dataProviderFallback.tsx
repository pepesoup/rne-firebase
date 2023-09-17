import { Store } from '@src/stores/store'
import { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'

export type DataProviderFallbackProps = {
    store: Store
}

export const DataProviderFallback = ({ store }: DataProviderFallbackProps) => {
    const [message, setMessage] = useState('')

    useEffect(() => {
        switch (store.state) {
            case 'loading':
                setMessage('Loading Data...')
                return
            case 'hasError':
                setMessage('Sorry, got ERROR:' + JSON.stringify(store.content))
                return
            case 'hasValue':
                setMessage(JSON.stringify(store.content))
                return
        }
    }, [store.state])

    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'column',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 20,
            }}
        >
            {store.state === 'hasError' ? (
                <View
                    style={{
                        backgroundColor: 'red',
                        borderRadius: 10,
                        padding: 20,
                        overflow: 'hidden',
                    }}
                >
                    <Text style={{ color: 'white' }}>{message}</Text>
                </View>
            ) : (
                <Text>{message}</Text>
            )}
        </View>
    )
}
