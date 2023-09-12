import { useAuthStoreBase } from '@src/stores/authStore'
import { Store } from '@src/stores/store'
import { Redirect, Slot, useRootNavigation, useRootNavigationState } from 'expo-router'
import { useEffect, PropsWithChildren, Children, useState } from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import { DataProviderFallback } from './dataProviderFallback'

export type Props = PropsWithChildren<{
    stores: Store[]
    fallback?: any
}>

export const DataProvider = (props: Props) => {
    const { children, stores, fallback, ...restProps } = props
    const authData = useAuthStoreBase()
    const navigation = useRootNavigation()

    useEffect(() => {}, [stores.map((s) => s.state)])

    switch (authData.state) {
        case 'hasValue':
            return children
        default:
            return (
                <>
                    {stores.map((s, i) => (
                        <DataProviderFallback store={s} slot={<Slot />} key={`fallback-${i}`} />
                    ))}
                </>
            )
    }
}
